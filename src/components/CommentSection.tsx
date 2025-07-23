import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ThumbsUp, MessageSquare, Flag, Trash2, Edit, Send, MoreVertical, LogIn } from 'lucide-react';
import SocialAuth from '@/components/SocialAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

interface Comment {
  id: string;
  post_id: string;
  user_name: string;
  user_email: string;
  content: string;
  created_at: string;
  likes: number;
  user_avatar?: string;
  replies?: Comment[];
  is_reply_to?: string;
}

interface CommentSectionProps {
  postId: string;
  className?: string;
}

/**
 * Componente para la sección de comentarios de un artículo
 */
const CommentSection: React.FC<CommentSectionProps> = ({ postId, className = '' }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();

  // Cargar comentarios al montar el componente
  useEffect(() => {
    fetchComments();
  }, [postId]);
  
  // Verificar si hay un usuario autenticado
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setCurrentUser(data.user);
        // Si tenemos el usuario, intentamos obtener su nombre de los metadatos
        if (data.user.user_metadata?.full_name) {
          setUserName(data.user.user_metadata.full_name);
        } else if (data.user.user_metadata?.name) {
          setUserName(data.user.user_metadata.name);
        }
        // Establecer el email
        setUserEmail(data.user.email || '');
      }
    };
    
    checkUser();
    
    // Suscribirse a cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setCurrentUser(session.user);
        // Actualizar nombre y email
        if (session.user.user_metadata?.full_name) {
          setUserName(session.user.user_metadata.full_name);
        } else if (session.user.user_metadata?.name) {
          setUserName(session.user.user_metadata.name);
        }
        setUserEmail(session.user.email || '');
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        setUserName('');
        setUserEmail('');
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Función para cargar los comentarios
  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Organizar comentarios y respuestas
      const mainComments: Comment[] = [];
      const replies: { [key: string]: Comment[] } = {};

      data.forEach((comment: Comment) => {
        if (comment.is_reply_to) {
          if (!replies[comment.is_reply_to]) {
            replies[comment.is_reply_to] = [];
          }
          replies[comment.is_reply_to].push(comment);
        } else {
          mainComments.push(comment);
        }
      });

      // Añadir respuestas a los comentarios principales
      mainComments.forEach(comment => {
        if (replies[comment.id]) {
          comment.replies = replies[comment.id].sort((a, b) => 
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        } else {
          comment.replies = [];
        }
      });

      setComments(mainComments);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    }
  };

  // Función para manejar el inicio de sesión exitoso
  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    
    // Actualizar nombre y email
    if (user.user_metadata?.full_name) {
      setUserName(user.user_metadata.full_name);
    } else if (user.user_metadata?.name) {
      setUserName(user.user_metadata.name);
    }
    setUserEmail(user.email || '');
    
    toast({
      title: 'Inicio de sesión exitoso',
      description: 'Ahora puedes comentar en este artículo'
    });
  };
  
  // Función para cerrar sesión
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setUserName('');
    setUserEmail('');
    toast({
      title: 'Sesión cerrada',
      description: 'Has cerrado sesión correctamente'
    });
  };

  // Función para enviar un nuevo comentario
  const submitComment = async () => {
    if (!newComment.trim()) {
      toast({
        title: 'Error',
        description: 'Por favor escribe un comentario',
        variant: 'destructive',
      });
      return;
    }
    
    if (!currentUser && (!userName.trim() || !userEmail.trim())) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);

    try {
      const commentData = {
        post_id: postId,
        user_name: userName,
        user_email: userEmail,
        content: newComment,
        created_at: new Date().toISOString(),
        likes: 0,
        is_reply_to: replyTo,
      };

      const { data, error } = await supabase
        .from('blog_comments')
        .insert([commentData])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: 'Comentario enviado',
        description: 'Tu comentario ha sido publicado correctamente',
      });

      setNewComment('');
      setReplyTo(null);
      fetchComments();
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      toast({
        title: 'Error',
        description: 'No se pudo enviar el comentario. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para dar like a un comentario
  const likeComment = async (commentId: string) => {
    try {
      // Primero obtenemos el comentario actual
      const { data: commentData, error: fetchError } = await supabase
        .from('blog_comments')
        .select('likes')
        .eq('id', commentId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Incrementamos el contador de likes
      const { error: updateError } = await supabase
        .from('blog_comments')
        .update({ likes: (commentData.likes || 0) + 1 })
        .eq('id', commentId);

      if (updateError) {
        throw updateError;
      }

      // Actualizamos la UI
      fetchComments();
    } catch (error) {
      console.error('Error al dar like:', error);
      toast({
        title: 'Error',
        description: 'No se pudo dar like al comentario',
        variant: 'destructive',
      });
    }
  };

  // Función para eliminar un comentario
  const deleteComment = async (commentId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', commentId);

      if (error) {
        throw error;
      }

      toast({
        title: 'Comentario eliminado',
        description: 'El comentario ha sido eliminado correctamente',
      });

      fetchComments();
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el comentario',
        variant: 'destructive',
      });
    }
  };

  // Función para editar un comentario
  const startEditing = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  // Función para guardar un comentario editado
  const saveEditedComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .update({ content: editContent })
        .eq('id', commentId);

      if (error) {
        throw error;
      }

      toast({
        title: 'Comentario actualizado',
        description: 'El comentario ha sido actualizado correctamente',
      });

      setEditingComment(null);
      fetchComments();
    } catch (error) {
      console.error('Error al actualizar comentario:', error);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el comentario',
        variant: 'destructive',
      });
    }
  };

  // Función para reportar un comentario
  const reportComment = (commentId: string) => {
    toast({
      title: 'Comentario reportado',
      description: 'Gracias por reportar este comentario. Lo revisaremos pronto.',
    });
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Renderizar un comentario individual
  const renderComment = (comment: Comment, isReply = false) => (
    <Card key={comment.id} className={`mb-4 ${isReply ? 'ml-12' : ''}`}>
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={comment.user_avatar} alt={comment.user_name} />
          <AvatarFallback>{comment.user_name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{comment.user_name}</p>
              <p className="text-xs text-gray-500">{formatDate(comment.created_at)}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => startEditing(comment)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteComment(comment.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Eliminar</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => reportComment(comment.id)}>
                  <Flag className="mr-2 h-4 w-4" />
                  <span>Reportar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {editingComment === comment.id ? (
          <div className="space-y-2">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingComment(null)}>
                Cancelar
              </Button>
              <Button onClick={() => saveEditedComment(comment.id)}>
                Guardar
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700">{comment.content}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
            onClick={() => likeComment(comment.id)}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{comment.likes || 0}</span>
          </Button>
          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Responder</span>
            </Button>
          )}
        </div>
      </CardFooter>

      {/* Formulario de respuesta */}
      {replyTo === comment.id && (
        <div className="px-4 pb-4">
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="reply-name" className="block text-sm font-medium mb-1">
                  Nombre
                </label>
                <input
                  id="reply-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="reply-email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="reply-email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Tu email (no se publicará)"
                />
              </div>
            </div>
            <div>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setReplyTo(null)}>
                Cancelar
              </Button>
              <Button onClick={submitComment} disabled={loading}>
                {loading ? 'Enviando...' : 'Responder'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Respuestas al comentario */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="px-4 pb-4 space-y-4">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </Card>
  );

  return (
    <div className={`mt-8 ${className}`}>
      <h3 className="text-2xl font-bold mb-6">Comentarios</h3>

      {/* Formulario para nuevo comentario */}
      <Card className="mb-8">
        <CardHeader>
          <h4 className="text-lg font-semibold">Deja tu comentario</h4>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentUser ? (
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUser.user_metadata?.avatar_url} alt={userName} />
                  <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{userName}</p>
                  <p className="text-sm text-gray-500">{userEmail}</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="comment-name" className="block text-sm font-medium mb-1">
                    Nombre
                  </label>
                  <input
                    id="comment-name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="comment-email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="comment-email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Tu email (no se publicará)"
                  />
                </div>
              </div>
            )}
            <div>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe tu comentario..."
                className="min-h-[150px]"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!currentUser && (
            <Button 
              variant="outline" 
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Iniciar sesión para comentar
            </Button>
          )}
          <Button 
            onClick={submitComment} 
            disabled={loading} 
            className="flex items-center gap-2"
          >
            {loading ? 'Enviando...' : 'Enviar comentario'}
            <Send className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      {/* Modal de autenticación */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Inicia sesión para comentar</h3>
            <p className="text-gray-600 mb-6">
              Inicia sesión con tus redes sociales para dejar un comentario. No publicaremos nada en tu nombre.
            </p>
            
            <SocialAuth onSuccess={handleAuthSuccess} />
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => setShowAuthModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No hay comentarios todavía. ¡Sé el primero en comentar!
          </p>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>
    </div>
  );
};

export default CommentSection;