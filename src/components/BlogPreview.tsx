import React, { useState } from 'react';
import { PortableText } from '@portabletext/react';
import { sampleBlogPosts } from '@/data/sampleBlogPost';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateArticleSchema } from '@/utils/schemaGenerator';

/**
 * Componente para previsualizar los artículos de blog de ejemplo
 * sin necesidad de insertarlos en la base de datos
 */
const BlogPreview: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPost = sampleBlogPosts[currentIndex];
  
  // Formatear la fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-CL", options);
  };
  
  // Navegar al artículo anterior
  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? sampleBlogPosts.length - 1 : prev - 1
    );
  };
  
  // Navegar al artículo siguiente
  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev === sampleBlogPosts.length - 1 ? 0 : prev + 1
    );
  };
  
  // Generar el esquema JSON-LD para el artículo actual
  const articleSchema = generateArticleSchema(
    currentPost.title,
    currentPost.excerpt,
    currentPost.author,
    currentPost.published_at,
    currentPost.published_at,
    currentPost.main_image_url,
    `https://www.guiadecorte.cl/blog/${currentPost.slug}`,
    currentPost.category
  );

  return (
    <>
      <SEO 
        title={currentPost.meta_title || currentPost.title}
        description={currentPost.meta_description || currentPost.excerpt}
        keywords={currentPost.tags?.join(', ')}
        image={currentPost.main_image_url}
        url={`https://www.guiadecorte.cl/blog/${currentPost.slug}`}
        type="article"
        schema={articleSchema}
        publishedTime={currentPost.published_at}
        author={currentPost.author}
        tags={currentPost.tags}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Navegación entre artículos */}
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              onClick={goToPrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Artículo anterior
            </Button>
            <span className="text-sm text-gray-500">
              {currentIndex + 1} de {sampleBlogPosts.length}
            </span>
            <Button 
              variant="outline" 
              onClick={goToNext}
              className="flex items-center gap-2"
            >
              Artículo siguiente <ArrowRight size={16} />
            </Button>
          </div>

          {/* Encabezado del artículo */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gris-500 mb-3">
              {currentPost.category && (
                <span className="bg-naranja-100 text-naranja-600 rounded-full px-3 py-1">
                  {currentPost.category}
                </span>
              )}
              <span className="mx-2">•</span>
              <span>{formatDate(currentPost.published_at)}</span>
              <span className="mx-2">•</span>
              <span>Por {currentPost.author}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{currentPost.title}</h1>
            <p className="text-xl text-gray-600">{currentPost.excerpt}</p>
          </div>

          {/* Imagen principal */}
          <div className="mb-8">
            <img
              src={currentPost.main_image_url}
              alt={`Guía de corte aluminio - ${currentPost.title}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-gray-500 mt-2 italic">
              Nota: Esta es una imagen de ejemplo. Reemplázala con una imagen real relacionada con el artículo.
            </p>
          </div>

          {/* Contenido del artículo */}
          <article className="prose prose-lg max-w-none mb-12">
            <PortableText value={currentPost.content} />
          </article>

          {/* Etiquetas */}
          {currentPost.tags && currentPost.tags.length > 0 && (
            <div className="border-t border-b py-6 mb-12">
              <div className="flex flex-wrap gap-2">
                {currentPost.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-gris-100 text-gris-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Nota informativa */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-blue-700">
              <strong>Nota:</strong> Este es un artículo de ejemplo para mostrar la estructura y diseño del blog. 
              Para publicar artículos reales, sigue las instrucciones en el archivo README-BLOG-EJEMPLO.md.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPreview;