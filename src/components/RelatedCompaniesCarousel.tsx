import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

interface Company {
  name: string;
  logo: string;
  url: string;
  alt: string;
}

const RelatedCompaniesCarousel = () => {
  const companies: Company[] = [
    {
      name: "terciamel.cl",
      logo: "/logos/Terciamel-Logo.webp",
      url: "https://terciamel.cl",
      alt: "Logo Terciamel - comercializacion planchas de terciado melamina"
    },
    {
      name: "carrosdesmontableschile.cl",
      logo: "/logos/Logo-desmontables-chile.webp",
      url: "https://carrosdesmontableschile.cl",
      alt: "Logo Carros Desmontables Chile - Soluciones de transporte"
    },
    {
      name: "guiadecorte.cl",
      logo: "/guia-imagenes/profix-126-logo.webp",
      url: "https://guiadecorte.cl",
      alt: "Logo Guía de Corte - Guia de precisión para cortes rectos, carpintería, bricolage"
    }
  ];

  // Duplicamos las empresas para crear un efecto de carrusel infinito
  const allCompanies = [...companies, ...companies];
  
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    // Configuración de la animación
    const pixelsPerSecond = 30; // Velocidad de desplazamiento en píxeles por segundo
    const carouselWidth = carousel.scrollWidth / 2; // Ancho de la mitad del carrusel (empresas originales)
    let lastTimestamp: number | null = null;
    let animationId: number;
    
    // Función para animar el carrusel
    const animate = (timestamp: number) => {
      if (!carousel) return;
      
      // Inicializar el timestamp en la primera llamada
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      // Calcular el tiempo transcurrido desde la última animación
      const elapsed = timestamp - lastTimestamp;
      
      // Calcular cuántos píxeles mover basado en el tiempo transcurrido
      const pixelsToMove = (pixelsPerSecond * elapsed) / 1000;
      
      // Si llegamos al final de la primera mitad, reiniciamos la posición sin animación
      if (carousel.scrollLeft >= carouselWidth) {
        carousel.style.scrollBehavior = 'auto';
        carousel.scrollLeft = 0;
      } else {
        carousel.style.scrollBehavior = 'auto';
        carousel.scrollLeft += pixelsToMove;
      }
      
      // Actualizar el timestamp
      lastTimestamp = timestamp;
      
      // Llamamos a la siguiente animación
      animationId = requestAnimationFrame(animate);
    };
    
    // Iniciamos la animación
    animationId = requestAnimationFrame(animate);
    
    // Pausar la animación cuando el usuario interactúa con el carrusel
    const pauseAnimation = () => {
      cancelAnimationFrame(animationId);
    };
    
    const resumeAnimation = () => {
      lastTimestamp = null;
      animationId = requestAnimationFrame(animate);
    };
    
    carousel.addEventListener('mouseenter', pauseAnimation);
    carousel.addEventListener('mouseleave', resumeAnimation);
    carousel.addEventListener('touchstart', pauseAnimation);
    carousel.addEventListener('touchend', resumeAnimation);
    
    // Limpiamos la animación y los event listeners cuando el componente se desmonte
    return () => {
      cancelAnimationFrame(animationId);
      carousel.removeEventListener('mouseenter', pauseAnimation);
      carousel.removeEventListener('mouseleave', resumeAnimation);
      carousel.removeEventListener('touchstart', pauseAnimation);
      carousel.removeEventListener('touchend', resumeAnimation);
    };
  }, []);
  
  return (
    <div className="w-full overflow-hidden">
      <div 
        ref={carouselRef}
        className="flex items-center space-x-8 py-4 overflow-x-hidden"
      >
        {allCompanies.map((company, index) => (
          <a 
            key={`${company.name}-${index}`}
            href={company.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex-shrink-0 flex flex-col items-center"
            style={{ minWidth: '180px' }}
          >
            <div className="bg-white p-3 rounded-lg mb-2 transition-transform group-hover:scale-105">
              <img 
                src={company.logo} 
                alt={company.alt} 
                className="h-16 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/guia-imagenes/profix-126-logo.webp";
                }}
              />
            </div>
            <span className="text-gris-300 text-sm flex items-center group-hover:text-naranja-500">
              {company.name} <ExternalLink className="ml-1 h-3 w-3" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedCompaniesCarousel;