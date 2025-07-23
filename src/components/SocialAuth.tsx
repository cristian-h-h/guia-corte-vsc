import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/supabaseClient';
import { Facebook, Twitter, Github, Mail, Loader2 } from 'lucide-react';

interface SocialAuthProps {
  onSuccess?: (user: any) => void;
  redirectTo?: string;
  showEmailOption?: boolean;
  className?: string;
}

/**
 * Componente para autenticación con redes sociales
 */
const SocialAuth: React.FC<SocialAuthProps> = ({
  onSuccess,
  redirectTo,
  showEmailOption = true,
  className = ''
}) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const { toast } = useToast();

  // Función para iniciar sesión con un proveedor social
  const signInWithProvider = async (provider: 'facebook' | 'twitter' | 'github') => {
    try {
      setLoading(provider);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectTo || window.location.origin
        }
      });

      if (error) {
        throw error;
      }

      // Si hay un callback de éxito, lo llamamos
      if (onSuccess && data.user) {
        onSuccess(data.user);
      }
    } catch (error: any) {
      console.error(`Error al iniciar sesión con ${provider}:`, error);
      toast({
        title: 'Error de autenticación',
        description: error.message || `No se pudo iniciar sesión con ${provider}`,
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };

  // Función para enviar un enlace mágico por email
  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: 'Por favor, introduce tu dirección de email',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading('email');
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo || window.location.origin
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Enlace enviado',
        description: 'Hemos enviado un enlace de inicio de sesión a tu email'
      });
      
      setShowEmailInput(false);
    } catch (error: any) {
      console.error('Error al enviar el enlace de inicio de sesión:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo enviar el enlace de inicio de sesión',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col gap-3">
        {/* Botón de Facebook */}
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#0d6efd] text-white"
          onClick={() => signInWithProvider('facebook')}
          disabled={!!loading}
        >
          {loading === 'facebook' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Facebook className="h-4 w-4" />
          )}
          Continuar con Facebook
        </Button>

        {/* Botón de Twitter */}
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#0c85d0] text-white"
          onClick={() => signInWithProvider('twitter')}
          disabled={!!loading}
        >
          {loading === 'twitter' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Twitter className="h-4 w-4" />
          )}
          Continuar con Twitter
        </Button>

        {/* Botón de GitHub */}
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-[#333] hover:bg-[#24292e] text-white"
          onClick={() => signInWithProvider('github')}
          disabled={!!loading}
        >
          {loading === 'github' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Github className="h-4 w-4" />
          )}
          Continuar con GitHub
        </Button>

        {/* Opción de Email */}
        {showEmailOption && (
          <>
            {!showEmailInput ? (
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowEmailInput(true)}
                disabled={!!loading}
              >
                <Mail className="h-4 w-4" />
                Continuar con Email
              </Button>
            ) : (
              <form onSubmit={signInWithEmail} className="space-y-3">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEmailInput(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={loading === 'email'}
                  >
                    {loading === 'email' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar enlace'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SocialAuth;