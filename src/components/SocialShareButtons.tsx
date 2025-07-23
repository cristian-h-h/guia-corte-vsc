import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Link as LinkIcon, 
  MessageCircle, // Reemplazamos WhatsApp por MessageCircle
  Copy, 
  Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Componente para compartir en redes sociales
 */
const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url,
  title,
  description = '',
  className = '',
  showLabel = false,
  size = 'md'
}) => {
  const [copied, setCopied] = useState(false);
  
  // Asegurarse de que la URL sea absoluta
  const fullUrl = url.startsWith('http') ? url : `https://www.guiadecorte.cl${url}`;
  
  // Tamaño de los iconos según la propiedad size
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  
  // Clase para el tamaño de los botones
  const buttonSizeClass = size === 'sm' ? 'h-8 px-2' : size === 'lg' ? 'h-12 px-4' : 'h-10 px-3';
  
  // Función para copiar la URL al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* Facebook */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`${buttonSizeClass} bg-[#1877F2] hover:bg-[#0d6efd] text-white`}
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(title)}`, '_blank')}
              aria-label="Compartir en Facebook"
            >
              <Facebook size={iconSize} />
              {showLabel && <span className="ml-2">Facebook</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Compartir en Facebook</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Twitter */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`${buttonSizeClass} bg-[#1DA1F2] hover:bg-[#0c85d0] text-white`}
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`, '_blank')}
              aria-label="Compartir en Twitter"
            >
              <Twitter size={iconSize} />
              {showLabel && <span className="ml-2">Twitter</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Compartir en Twitter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* LinkedIn */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`${buttonSizeClass} bg-[#0A66C2] hover:bg-[#084d93] text-white`}
              onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`, '_blank')}
              aria-label="Compartir en LinkedIn"
            >
              <Linkedin size={iconSize} />
              {showLabel && <span className="ml-2">LinkedIn</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Compartir en LinkedIn</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* WhatsApp */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`${buttonSizeClass} bg-[#25D366] hover:bg-[#1da851] text-white`}
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${fullUrl}`)}`, '_blank')}
              aria-label="Compartir en WhatsApp"
            >
              <MessageCircle size={iconSize} />
              {showLabel && <span className="ml-2">WhatsApp</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Compartir en WhatsApp</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Email */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`${buttonSizeClass} bg-[#EA4335] hover:bg-[#d33426] text-white`}
              onClick={() => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${fullUrl}`)}`, '_blank')}
              aria-label="Compartir por correo"
            >
              <Mail size={iconSize} />
              {showLabel && <span className="ml-2">Email</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Compartir por correo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Copiar enlace */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`${buttonSizeClass} bg-gray-700 hover:bg-gray-800 text-white`}
              onClick={copyToClipboard}
              aria-label="Copiar enlace"
            >
              {copied ? <Check size={iconSize} /> : <Copy size={iconSize} />}
              {showLabel && <span className="ml-2">{copied ? 'Copiado' : 'Copiar'}</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? 'Enlace copiado' : 'Copiar enlace'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SocialShareButtons;