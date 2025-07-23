import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Edit, Plus, Upload, Image as ImageIcon, Loader2, MoveUp, MoveDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/supabaseClient";
import { uploadFile } from "@/utils/storageUtils";

// Definición de tipos para las imágenes de la galería
interface GalleryImage {
  id?: string;
  src: string;
  alt: string;
  description: string;
  order: number;
  category?: string;
}

// Definición de tipos para los videos de la galería
interface GalleryVideo {
  id?: string;
  youtube_id: string;
  title: string;
  description: string;
  order: number;
}

const GalleryAdmin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  
  // Estado para imágenes
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage>({
    src: "",
    alt: "",
    description: "",
    order: 0,
    category: "producto"
  });
  
  // Estado para videos
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<GalleryVideo>({
    youtube_id: "",
    title: "",
    description: "",
    order: 0
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  // Cargar imágenes y videos desde Supabase
  useEffect(() => {
    if (activeTab === 'images') {
      fetchGalleryImages();
    } else {
      fetchGalleryVideos();
    }
  }, [activeTab]);

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('"order"', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setImages(data || []);
    } catch (error) {
      console.error('Error al cargar imágenes de la galería:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las imágenes de la galería",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchGalleryVideos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_videos')
        .select('*')
        .order('"order"', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setVideos(data || []);
    } catch (error) {
      console.error('Error al cargar videos de la galería:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los videos de la galería",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentImage({
      ...currentImage,
      [name]: value,
    });
  };
  
  const handleVideoInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentVideo({
      ...currentVideo,
      [name]: value,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    
    try {
      // Subir el archivo a Supabase Storage
      const imageUrl = await uploadFile(file, 'gallery-images');
      
      if (imageUrl) {
        setCurrentImage({
          ...currentImage,
          src: imageUrl,
        });
        
        toast({
          title: "Imagen subida",
          description: "La imagen se ha subido correctamente",
        });
      } else {
        throw new Error("No se pudo obtener la URL de la imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      toast({
        title: "Error",
        description: "No se pudo subir la imagen. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddImage = () => {
    setIsEditing(false);
    setCurrentImage({
      src: "",
      alt: "",
      description: "",
      order: images.length > 0 ? Math.max(...images.map(img => img.order || 0)) + 1 : 0,
      category: "producto"
    });
    setDialogOpen(true);
  };
  
  const handleAddVideo = () => {
    setIsEditing(false);
    setCurrentVideo({
      youtube_id: "",
      title: "",
      description: "",
      order: videos.length > 0 ? Math.max(...videos.map(video => video.order || 0)) + 1 : 0
    });
    setVideoDialogOpen(true);
  };

  const handleEditImage = (image: GalleryImage) => {
    setIsEditing(true);
    setCurrentImage({
      ...image,
    });
    setDialogOpen(true);
  };
  
  const handleEditVideo = (video: GalleryVideo) => {
    setIsEditing(true);
    setCurrentVideo({
      ...video,
    });
    setVideoDialogOpen(true);
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setImages(images.filter(img => img.id !== id));
      toast({
        title: "Imagen eliminada",
        description: "La imagen ha sido eliminada correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la imagen. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteVideo = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este video?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('gallery_videos')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setVideos(videos.filter(video => video.id !== id));
      toast({
        title: "Video eliminado",
        description: "El video ha sido eliminado correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar el video:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el video. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleMoveImage = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(img => img.id === id);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= images.length) return;
    
    const currentImage = images[currentIndex];
    const targetImage = images[newIndex];
    
    // Intercambiar órdenes
    const currentOrder = currentImage.order;
    const targetOrder = targetImage.order;
    
    try {
      // Actualizar el orden de la imagen actual
      await supabase
        .from('gallery_images')
        .update({ "order": targetOrder })
        .eq('id', currentImage.id);
      
      // Actualizar el orden de la imagen objetivo
      await supabase
        .from('gallery_images')
        .update({ "order": currentOrder })
        .eq('id', targetImage.id);
      
      // Actualizar el estado local
      const newImages = [...images];
      newImages[currentIndex] = { ...currentImage, order: targetOrder };
      newImages[newIndex] = { ...targetImage, order: currentOrder };
      newImages.sort((a, b) => a.order - b.order);
      setImages(newImages);
    } catch (error) {
      console.error("Error al mover la imagen:", error);
      toast({
        title: "Error",
        description: "No se pudo mover la imagen. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };
  
  const handleMoveVideo = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = videos.findIndex(video => video.id === id);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= videos.length) return;
    
    const currentVideo = videos[currentIndex];
    const targetVideo = videos[newIndex];
    
    // Intercambiar órdenes
    const currentOrder = currentVideo.order;
    const targetOrder = targetVideo.order;
    
    try {
      // Actualizar el orden del video actual
      await supabase
        .from('gallery_videos')
        .update({ "order": targetOrder })
        .eq('id', currentVideo.id);
      
      // Actualizar el orden del video objetivo
      await supabase
        .from('gallery_videos')
        .update({ "order": currentOrder })
        .eq('id', targetVideo.id);
      
      // Actualizar el estado local
      const newVideos = [...videos];
      newVideos[currentIndex] = { ...currentVideo, order: targetOrder };
      newVideos[newIndex] = { ...targetVideo, order: currentOrder };
      newVideos.sort((a, b) => a.order - b.order);
      setVideos(newVideos);
    } catch (error) {
      console.error("Error al mover el video:", error);
      toast({
        title: "Error",
        description: "No se pudo mover el video. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentImage.src) {
      toast({
        title: "Error",
        description: "Por favor, sube una imagen o proporciona una URL",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isEditing && currentImage.id) {
        // Actualizar imagen existente
        const { error } = await supabase
          .from('gallery_images')
          .update({
            src: currentImage.src,
            alt: currentImage.alt,
            description: currentImage.description,
            category: currentImage.category
          })
          .eq('id', currentImage.id);
        
        if (error) {
          throw error;
        }
        
        // Actualizar el estado local
        setImages(images.map(img => 
          img.id === currentImage.id ? { ...currentImage } : img
        ));
        
        toast({
          title: "Imagen actualizada",
          description: "La imagen ha sido actualizada correctamente",
        });
      } else {
        // Crear nueva imagen
        const { data, error } = await supabase
          .from('gallery_images')
          .insert({
            src: currentImage.src,
            alt: currentImage.alt,
            description: currentImage.description,
            "order": currentImage.order,
            category: currentImage.category
          })
          .select();
        
        if (error) {
          throw error;
        }
        
        // Actualizar el estado local
        setImages([...images, data[0]]);
        
        toast({
          title: "Imagen añadida",
          description: "La imagen ha sido añadida correctamente",
        });
      }
      
      setDialogOpen(false);
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la imagen. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  // Función para manejar el envío del formulario de video
  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentVideo.youtube_id) {
      toast({
        title: "Error",
        description: "Por favor, ingresa el ID de YouTube del video",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isEditing && currentVideo.id) {
        // Actualizar video existente
        const { error } = await supabase
          .from('gallery_videos')
          .update({
            youtube_id: currentVideo.youtube_id,
            title: currentVideo.title,
            description: currentVideo.description
          })
          .eq('id', currentVideo.id);
        
        if (error) {
          throw error;
        }
        
        // Actualizar el estado local
        setVideos(videos.map(video => 
          video.id === currentVideo.id ? { ...currentVideo } : video
        ));
        
        toast({
          title: "Video actualizado",
          description: "El video ha sido actualizado correctamente",
        });
      } else {
        // Crear nuevo video
        const { data, error } = await supabase
          .from('gallery_videos')
          .insert({
            youtube_id: currentVideo.youtube_id,
            title: currentVideo.title,
            description: currentVideo.description,
            "order": currentVideo.order
          })
          .select();
        
        if (error) {
          throw error;
        }
        
        // Actualizar el estado local
        setVideos([...videos, data[0]]);
        
        toast({
          title: "Video añadido",
          description: "El video ha sido añadido correctamente",
        });
      }
      
      setVideoDialogOpen(false);
    } catch (error) {
      console.error("Error al guardar el video:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el video. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestión de la Galería</h2>
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'images' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('images')}
          >
            Imágenes
          </Button>
          <Button 
            variant={activeTab === 'videos' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </Button>
          {activeTab === 'images' ? (
            <Button onClick={handleAddImage} className="flex items-center gap-2">
              <Plus size={16} /> Añadir Imagen
            </Button>
          ) : (
            <Button onClick={handleAddVideo} className="flex items-center gap-2">
              <Plus size={16} /> Añadir Video
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-gris-50 rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-herramienta-600" />
          <p className="text-gris-500">Cargando {activeTab === 'images' ? 'imágenes' : 'videos'}...</p>
        </div>
      ) : activeTab === 'images' ? (
        // Tabla de imágenes
        images.length === 0 ? (
          <div className="text-center py-12 bg-gris-50 rounded-lg">
            <p className="text-gris-500">No hay imágenes disponibles</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gris-50">
                <tr>
                  <th className="px-4 py-3 text-left">Imagen</th>
                  <th className="px-4 py-3 text-left">Título</th>
                  <th className="px-4 py-3 text-center">Categoría</th>
                  <th className="px-4 py-3 text-center">Orden</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {images.map((image) => (
                  <tr key={image.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="w-16 h-16 rounded bg-gris-100 overflow-hidden">
                        {image.src ? (
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gris-400">
                            Sin imagen
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{image.alt}</p>
                      <p className="text-sm text-gris-500 truncate max-w-xs">
                        {image.description}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-madera-100 text-madera-800 rounded-full px-3 py-1 text-sm">
                        {image.category || "producto"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">{image.order}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMoveImage(image.id!, 'up')}
                          disabled={images.indexOf(image) === 0}
                        >
                          <MoveUp size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMoveImage(image.id!, 'down')}
                          disabled={images.indexOf(image) === images.length - 1}
                        >
                          <MoveDown size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditImage(image)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteImage(image.id!)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        // Tabla de videos
        videos.length === 0 ? (
          <div className="text-center py-12 bg-gris-50 rounded-lg">
            <p className="text-gris-500">No hay videos disponibles</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gris-50">
                <tr>
                  <th className="px-4 py-3 text-left">Vista previa</th>
                  <th className="px-4 py-3 text-left">Título</th>
                  <th className="px-4 py-3 text-center">ID de YouTube</th>
                  <th className="px-4 py-3 text-center">Orden</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="w-24 h-16 rounded bg-gris-100 overflow-hidden">
                        <img
                          src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/150x100?text=Video";
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{video.title}</p>
                      <p className="text-sm text-gris-500 truncate max-w-xs">
                        {video.description}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a 
                        href={`https://www.youtube.com/watch?v=${video.youtube_id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {video.youtube_id}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-center">{video.order}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMoveVideo(video.id!, 'up')}
                          disabled={videos.indexOf(video) === 0}
                        >
                          <MoveUp size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMoveVideo(video.id!, 'down')}
                          disabled={videos.indexOf(video) === videos.length - 1}
                        >
                          <MoveDown size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditVideo(video)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteVideo(video.id!)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Diálogo para imágenes */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Imagen" : "Añadir Imagen"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="src" className="block text-sm font-medium mb-1">
                Imagen
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="src"
                  name="src"
                  value={currentImage.src}
                  onChange={handleInputChange}
                  placeholder="URL de la imagen o sube un archivo"
                  className="w-full"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="whitespace-nowrap"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Subiendo...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      <span>Subir</span>
                    </>
                  )}
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              {currentImage.src && (
                <div className="mt-2">
                  <img 
                    src={currentImage.src} 
                    alt="Vista previa" 
                    className="h-40 w-auto object-cover rounded-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/150?text=Error+de+imagen";
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="alt" className="block text-sm font-medium mb-1">
                Texto Alternativo (Alt)
              </Label>
              <Input
                id="alt"
                name="alt"
                value={currentImage.alt}
                onChange={handleInputChange}
                placeholder="Descripción breve para accesibilidad y SEO"
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="description" className="block text-sm font-medium mb-1">
                Descripción
              </Label>
              <Textarea
                id="description"
                name="description"
                value={currentImage.description}
                onChange={handleInputChange}
                placeholder="Descripción detallada de la imagen"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="category" className="block text-sm font-medium mb-1">
                Categoría
              </Label>
              <select
                id="category"
                name="category"
                value={currentImage.category}
                onChange={handleInputChange}
                className="w-full border border-gris-300 rounded-md px-3 py-2"
              >
                <option value="producto">Producto</option>
                <option value="uso">Uso</option>
                <option value="detalle">Detalle</option>
                <option value="proyecto">Proyecto</option>
              </select>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo para videos */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Video" : "Añadir Video"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleVideoSubmit} className="space-y-4">
            <div>
              <Label htmlFor="youtube_id" className="block text-sm font-medium mb-1">
                ID de YouTube
              </Label>
              <Input
                id="youtube_id"
                name="youtube_id"
                value={currentVideo.youtube_id}
                onChange={handleVideoInputChange}
                placeholder="Ej: dQw4w9WgXcQ (solo el ID, no la URL completa)"
                className="w-full"
              />
              <p className="text-xs text-gris-500 mt-1">
                El ID es la parte final de la URL de YouTube: https://www.youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>
              </p>
            </div>

            {currentVideo.youtube_id && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Vista previa:</p>
                <div className="aspect-video bg-gris-100 rounded-md overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideo.youtube_id}`}
                    title="Vista previa de YouTube"
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="title" className="block text-sm font-medium mb-1">
                Título
              </Label>
              <Input
                id="title"
                name="title"
                value={currentVideo.title}
                onChange={handleVideoInputChange}
                placeholder="Título del video"
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="video_description" className="block text-sm font-medium mb-1">
                Descripción
              </Label>
              <Textarea
                id="video_description"
                name="description"
                value={currentVideo.description}
                onChange={handleVideoInputChange}
                placeholder="Descripción del video"
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setVideoDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryAdmin;