import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Play, Loader2 } from "lucide-react";
import { supabase } from "@/supabaseClient";

// Definición de tipos para las imágenes y videos
interface GalleryImage {
  src: string;
  alt: string;
  description: string;
}

interface GalleryVideo {
  id: string;
  title: string;
  description: string;
}

const Galeria = () => {
  // Estado para el modal de imagen ampliada
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  // Estado para las imágenes de la galería
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  // Estado para indicar si se están cargando las imágenes
  const [loadingImages, setLoadingImages] = useState(true);

  // Cargar imágenes y videos desde Supabase
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        // Cargar imágenes
        const { data: imageData, error: imageError } = await supabase
          .from('gallery_images')
          .select('*')
          .order('"order"', { ascending: true });
        
        if (imageError) {
          throw imageError;
        }
        
        // Si no hay imágenes en la base de datos, usar imágenes predeterminadas
        if (!imageData || imageData.length === 0) {
          setGalleryImages(defaultGalleryImages);
        } else {
          // Transformar los datos para que coincidan con la interfaz GalleryImage
          const images: GalleryImage[] = imageData.map(img => ({
            src: img.src,
            alt: img.alt,
            description: img.description
          }));
          setGalleryImages(images);
        }
        
        // Cargar videos
        const { data: videoData, error: videoError } = await supabase
          .from('gallery_videos')
          .select('*')
          .order('"order"', { ascending: true });
        
        if (videoError) {
          throw videoError;
        }
        
        // Si hay videos en la base de datos, actualizar el estado
        if (videoData && videoData.length > 0) {
          const videos: GalleryVideo[] = videoData.map(video => ({
            id: video.youtube_id,
            title: video.title,
            description: video.description
          }));
          // Actualizar el estado de videos
          galleryVideos.splice(0, galleryVideos.length, ...videos);
        }
      } catch (error) {
        console.error('Error al cargar datos de la galería:', error);
        // En caso de error, usar imágenes predeterminadas
        setGalleryImages(defaultGalleryImages);
      } finally {
        setLoadingImages(false);
      }
    };
    
    fetchGalleryData();
  }, []);

  // Imágenes predeterminadas en caso de que no haya imágenes en la base de datos
  const defaultGalleryImages: GalleryImage[] = [
    {
      src: "/guia-imagenes/guia-corte-profix-126.webp",
      alt: "Guía de corte ProFix 126 - Guía banco sierra de aluminio - Vista general del producto",
      description: "Vista general de la Guía de Corte ProFix 126, mostrando su diseño en aluminio aeronáutico y sistema de ajuste rápido."
    },
    {
      src: "/guia-imagenes/corte-sierra-circular-profix-126.webp",
      alt: "Guía de corte recto para sierra circular - Guía banco sierra ProFix 126 en uso",
      description: "Demostración de corte recto con sierra circular utilizando la guía ProFix 126 en tablero de melamina."
    },
    {
      src: "/guia-imagenes/ajuste-recto-profix-126.webp",
      alt: "Guía de corte ProFix 126 - Sistema de ajuste rápido de guía banco sierra",
      description: "Detalle del sistema de ajuste rápido Quick-Lock que permite cambios de configuración en segundos."
    },
    {
      src: "/guia-imagenes/guia-profix-126.webp",
      alt: "Guía de corte ProFix 126 - Guía banco sierra con sistema de sujeción multidireccional",
      description: "Vista del sistema de sujeción multidireccional con topes ajustables en acero endurecido."
    },
    {
      src: "/guia-imagenes/profix-126-guia-corte-recto.webp",
      alt: "Guía de corte ProFix 126 - Guía banco sierra para cortes rectos de precisión",
      description: "Guía ProFix 126 preparada para realizar cortes rectos de precisión industrial en diversos materiales."
    },
    {
      src: "/guia-imagenes/guia-corte-logo.png",
      alt: "Logo oficial de Guía de Corte ProFix 126",
      description: "Logo oficial del producto Guía de Corte ProFix 126, símbolo de precisión en carpintería."
    },
    {
      src: "/guia-imagenes/guia-corte-router.webp",
      alt: "Guía ProFix 126 con router para trabajos de precisión",
      description: "Uso de la guía ProFix 126 con router para realizar ranurados y acabados de precisión."
    },
    {
      src: "/guia-imagenes/guia-corte-caladora.webp",
      alt: "Guía ProFix 126 con sierra caladora para cortes rectos",
      description: "Aplicación de la guía ProFix 126 con sierra caladora para lograr cortes rectos perfectos."
    },
    {
      src: "/guia-imagenes/guia-corte-materiales.webp",
      alt: "Guía ProFix 126 con diversos materiales compatibles",
      description: "Demostración de la versatilidad de la guía ProFix 126 con diferentes materiales como madera, melamina y MDF."
    }
  ];

  // Datos de videos para la galería
  const galleryVideos: GalleryVideo[] = [
    {
      id: "shIy8jqR0tE",
      title: "Guía de Corte ProFix 126 - Demostración de uso",
      description: "Video demostrativo del uso de la Guía ProFix 126 para realizar cortes rectos perfectos con sierra circular."
    },
    {
      id: "UHUVFCgoRSc",
      title: "Sistema Quick-Lock de la Guía ProFix 126",
      description: "Explicación detallada del sistema de ajuste rápido Quick-Lock que permite cambiar entre herramientas en 15 segundos."
    },
    {
      id: "JDyfjvraM2I",
      title: "Versatilidad de la Guía ProFix 126",
      description: "Demostración de la versatilidad de la Guía ProFix 126 con diferentes herramientas y materiales."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Galería ProFix 126 | Fotos y Videos de Nuestra Guía de Corte</title>
        <meta 
          name="description" 
          content="Explora nuestra galería de imágenes y videos de la Guía de Corte ProFix 126. Descubre su funcionamiento, versatilidad y precisión en diferentes aplicaciones de carpintería." 
        />
        <meta 
          name="keywords" 
          content="galería guía de corte, videos ProFix 126, imágenes guía carpintería, demostración cortes rectos, fotos herramientas carpintería" 
        />
        <link rel="canonical" href="https://www.guiadecorte.cl/galeria" />
        
        {/* Schema.org para galería de imágenes */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Galería de Imágenes ProFix 126",
            "description": "Colección de imágenes de la Guía de Corte ProFix 126 mostrando sus características y aplicaciones.",
            "image": galleryImages.map(img => img.src)
          })}
        </script>
        
        {/* Schema.org para videos */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGallery",
            "name": "Videos Demostrativos ProFix 126",
            "description": "Colección de videos que muestran el uso y características de la Guía de Corte ProFix 126.",
            "video": galleryVideos.map(video => ({
              "@type": "VideoObject",
              "name": video.title,
              "description": video.description,
              "thumbnailUrl": `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
              "contentUrl": `https://www.youtube.com/watch?v=${video.id}`,
              "embedUrl": `https://www.youtube.com/embed/${video.id}`,
              "uploadDate": "2023-01-01T08:00:00+08:00"
            }))
          })}
        </script>
      </Helmet>

      {/* Sección de encabezado llamativo */}
      <section className="relative bg-gradient-to-b from-madera-800 to-madera-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-pattern-grid"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-herramienta-600/30 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Galería <span className="text-herramienta-400">ProFix 126</span>
            </h1>
            <p className="text-xl md:text-2xl text-madera-200 mb-8">
              Explora nuestra colección de imágenes y videos que muestran la precisión, 
              versatilidad y calidad de nuestra guía de corte profesional.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#imagenes" className="bg-herramienta-600 hover:bg-herramienta-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl border-2 border-white">
                Ver Imágenes
              </a>
              <a href="#videos" className="bg-madera-200 hover:bg-madera-300 text-madera-800 font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl">
                Ver Videos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de galería de imágenes */}
      <section id="imagenes" className="py-16 bg-gradient-to-b from-madera-100 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-madera-800">Galería de Imágenes</h2>
          <div className="w-24 h-2 bg-herramienta-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-madera-700 text-center max-w-2xl mx-auto mb-10 text-lg">
            Descubre todos los detalles de nuestra Guía de Corte ProFix 126 a través de estas imágenes 
            que muestran su diseño, funcionalidad y aplicaciones en diferentes proyectos.
          </p>
          
          {loadingImages ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-herramienta-600 mb-4" />
              <p className="text-madera-700 text-lg">Cargando imágenes...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105 bg-white border-2 border-madera-200 hover:border-herramienta-600"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/guia-imagenes/profix-126-logo.webp";
                      }}
                    />
                  </div>
                  <div className="p-4 bg-madera-100">
                    <p className="text-sm text-madera-800 line-clamp-2 font-medium">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center">
            <p className="text-madera-800 max-w-3xl mx-auto bg-madera-100 p-6 rounded-lg shadow-inner border-l-4 border-herramienta-600 text-lg">
              Nuestra Guía de Corte ProFix 126 está diseñada para ofrecer la máxima precisión en tus proyectos 
              de carpintería. Fabricada con materiales de alta calidad, esta guía te permite realizar cortes 
              rectos perfectos hasta 1.26 metros de longitud con una precisión milimétrica certificada de ±0.3 mm.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de videos */}
      <section id="videos" className="py-16 bg-gradient-to-b from-madera-200 to-madera-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-madera-800">Videos Demostrativos</h2>
          <div className="w-24 h-2 bg-herramienta-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-madera-700 text-center max-w-2xl mx-auto mb-10 text-lg">
            Mira nuestra Guía de Corte ProFix 126 en acción. Estos videos te mostrarán cómo utilizarla 
            correctamente y todas las posibilidades que ofrece para tus proyectos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryVideos.map((video, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md transform transition-transform hover:scale-105 border-2 border-madera-300 hover:border-herramienta-600">
                <div className="aspect-video relative">
                  <iframe 
                    src={`https://www.youtube.com/embed/${video.id}`} 
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg mb-2 text-herramienta-700">{video.title}</h3>
                  <p className="text-sm text-madera-700">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal para imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl border-4 border-herramienta-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/guia-imagenes/profix-126-logo.webp";
                }}
              />
              <button 
                className="absolute top-4 right-4 bg-herramienta-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-herramienta-700 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
            <div className="p-6 bg-madera-100">
              <h3 className="font-bold text-xl mb-2 text-madera-800">{selectedImage.alt}</h3>
              <p className="text-madera-700">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Galeria;