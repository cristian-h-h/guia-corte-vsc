import { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  onClick?: () => void;
  caption?: string;
  priority?: boolean;
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
}

/**
 * Componente de imagen optimizada para SEO, rendimiento y accesibilidad
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  onClick,
  caption,
  priority = false,
  decoding = "async",
  fetchPriority = "auto"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { options } = useAccessibility();

  // Si la imagen es prioritaria, cambiar a carga eager
  const effectiveLoading = priority ? "eager" : loading;
  // Si la imagen es prioritaria, cambiar fetchPriority a high
  const effectiveFetchPriority = priority ? "high" : fetchPriority;

  // Manejar errores de carga de imagen
  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  // Manejar carga exitosa de imagen
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Imagen de respaldo en caso de error
  const fallbackSrc = "/guia-imagenes/profix-126-logo.webp";

  // Generar un ID único para la imagen (para asociar con figcaption)
  const imageId = `img-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <figure className={`relative ${className || ""}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-madera-100 animate-pulse flex items-center justify-center"
          aria-hidden="true"
          role="presentation"
        >
          <span className="sr-only">Cargando imagen...</span>
        </div>
      )}
      <div 
        onClick={onClick} 
        className={onClick ? "cursor-pointer" : ""}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={onClick ? `Ver imagen ampliada: ${alt}` : undefined}
        onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      >
        <img
          src={error ? fallbackSrc : src}
          alt={alt}
          width={width}
          height={height}
          loading={effectiveLoading}
          decoding={decoding}
          fetchPriority={effectiveFetchPriority}
          onError={handleError}
          onLoad={handleLoad}
          className={`${className || ""} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ${options.highContrast ? "border border-white" : ""}`}
          id={imageId}
          aria-describedby={caption ? `caption-${imageId}` : undefined}
        />
      </div>
      
      {caption && (
        <figcaption 
          id={`caption-${imageId}`}
          className="mt-2 text-sm text-gray-600 dark:text-gray-400"
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default OptimizedImage;