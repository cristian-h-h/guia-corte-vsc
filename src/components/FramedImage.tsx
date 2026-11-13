import type { ReactEventHandler } from "react";
import { cn } from "@/lib/utils";

/** Marco navideño (proporción 3:2) que se superpone a las fotos del sitio. */
export const MARCO_NAVIDENO_SRC = "/guia-imagenes/marco-navideno.webp";

interface FramedImageProps {
  src?: string;
  alt: string;
  /** Clases del contenedor. Por defecto mantiene la proporción 3:2 del marco. */
  className?: string;
  /** Clases de la foto (ej. el efecto de zoom al hacer hover). */
  imgClassName?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  onError?: ReactEventHandler<HTMLImageElement>;
}

/**
 * Foto con el marco navideño superpuesto.
 *
 * El contenedor se mantiene en proporción 3:2 (la del marco) para que el borde
 * no se deforme; la foto se recorta con object-cover para llenarlo.
 */
const FramedImage = ({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  loading = "lazy",
  fetchPriority,
  onError,
}: FramedImageProps) => {
  if (!src) {
    return null;
  }

  return (
    <div className={cn("relative aspect-[3/2] overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        onError={onError}
        className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
      />
      <img
        src={MARCO_NAVIDENO_SRC}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
      />
    </div>
  );
};

export default FramedImage;
