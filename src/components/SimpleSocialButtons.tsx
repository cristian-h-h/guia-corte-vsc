import React from 'react';

interface SimpleSocialButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Componente simplificado para compartir en redes sociales
 */
const SimpleSocialButtons: React.FC<SimpleSocialButtonsProps> = ({
  url,
  title,
  description = '',
  className = ''
}) => {
  // Asegurarse de que la URL sea absoluta
  const fullUrl = url.startsWith('http') ? url : `https://www.guiadecorte.cl${url}`;
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 bg-[#1877F2] text-white rounded-md hover:bg-[#0d6efd] transition-colors"
        aria-label="Compartir en Facebook"
      >
        Facebook
      </a>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 bg-[#1DA1F2] text-white rounded-md hover:bg-[#0c85d0] transition-colors"
        aria-label="Compartir en Twitter"
      >
        Twitter
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 bg-[#0A66C2] text-white rounded-md hover:bg-[#084d93] transition-colors"
        aria-label="Compartir en LinkedIn"
      >
        LinkedIn
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${fullUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#1da851] transition-colors"
        aria-label="Compartir en WhatsApp"
      >
        WhatsApp
      </a>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${fullUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 bg-[#EA4335] text-white rounded-md hover:bg-[#d33426] transition-colors"
        aria-label="Compartir por correo"
      >
        Email
      </a>
    </div>
  );
};

export default SimpleSocialButtons;