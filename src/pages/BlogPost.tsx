import { PortableText } from "@portabletext/react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { fetchBlogBySlug, fetchRelatedBlogs } from "@/api/supabaseApi"; // Cambiado a supabaseApi
import SimpleSocialButtons from "@/components/SimpleSocialButtons";
import CommentSection from "@/components/CommentSection";

// Componente para formatear contenido HTML o texto plano con estilos mejorados
const FormattedContent = ({ content }: { content: string }) => {
  // Verificar si el contenido tiene HTML
  const hasHTML = /<[a-z][\s\S]*>/i.test(content);
  
  // Si no tiene HTML, convertir texto plano a HTML formateado
  const formattedContent = hasHTML 
    ? content 
    : content
        .split(/\n\s*\n/) // Dividir por párrafos (doble salto de línea)
        .map((paragraph) => {
          const trimmed = paragraph.trim();
          if (!trimmed) return '';
          
          // Detectar títulos (líneas cortas sin punto final o con patrones de título)
          if (trimmed.length < 80 && !trimmed.match(/[\.\,\;]$/) && !trimmed.includes('\n')) {
            // Convertir a H2 si parece un título
            return `<h2 class="text-2xl md:text-3xl font-bold text-madera-800 mt-10 mb-6 pb-3 border-b-2 border-naranja-300 font-heading">${trimmed}</h2>`;
          }
          
          // Formatear listas con viñetas o números
          if (trimmed.match(/^[•\-\*]\s/) || trimmed.match(/^\d+[\.\)]\s/)) {
            const items = trimmed.split('\n').filter(item => item.trim());
            const listItems = items.map(item => {
              const text = item.replace(/^[•\-\*\d+\.\)]\s*/, '').trim();
              // Formatear negritas dentro de items
              const formattedText = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-madera-900">$1</strong>');
              return `<li class="mb-3 text-gris-700 leading-relaxed text-base pl-2">${formattedText}</li>`;
            }).join('');
            return `<ul class="list-disc list-outside space-y-2 mb-8 text-gris-700 ml-6 pl-4 border-l-4 border-naranja-200 py-2">${listItems}</ul>`;
          }
          
          // Formatear párrafos normales
          let formatted = trimmed
            // Formatear negritas **texto**
            .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-madera-900">$1</strong>')
            // Formatear cursivas *texto*
            .replace(/\*(.+?)\*/g, '<em class="italic text-gris-600">$1</em>')
            // Convertir saltos de línea simples en <br>
            .replace(/\n/g, '<br>');
          
          return `<p class="mb-6 text-gris-700 leading-relaxed text-lg md:text-xl">${formatted}</p>`;
        })
        .filter(p => p) // Eliminar párrafos vacíos
        .join('');
  
  return (
    <div 
      className="prose prose-lg md:prose-xl max-w-none 
        prose-headings:text-madera-800 prose-headings:font-bold prose-headings:font-heading
        prose-p:text-gris-700 prose-p:leading-relaxed prose-p:mb-6
        prose-strong:text-madera-900 prose-strong:font-bold
        prose-a:text-herramienta-600 prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
        prose-ul:text-gris-700 prose-ul:my-6
        prose-li:mb-3 prose-li:leading-relaxed prose-li:marker:text-naranja-600
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-naranja-300
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-madera-800
        prose-blockquote:border-l-4 prose-blockquote:border-naranja-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gris-600 prose-blockquote:bg-naranja-50 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:rounded-r-lg
        prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto
        prose-code:text-herramienta-600 prose-code:bg-gris-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
        prose-pre:bg-gris-900 prose-pre:text-gris-100 prose-pre:rounded-lg prose-pre:p-4"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
      style={{
        maxWidth: '100%',
      }}
    />
  );
};

const BlogPost = () => {
  // =========================
  // Obtener parámetro slug de la URL
  // =========================
  const { slug } = useParams<{ slug: string }>();

  // =========================
  // Estados para el post y relacionados
  // =========================
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // =========================
  // Función para formatear la fecha
  // =========================
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-CL", options);
  };

  // =========================
  // Cargar datos del blog y relacionados desde Supabase
  // =========================
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        if (!slug) {
          setLoading(false);
          setNotFound(true);
          return;
        }
        
        setLoading(true);
        setNotFound(false);
        
        // Obtén el blog principal por slug
        const blog = await fetchBlogBySlug(slug);
        
        if (!blog) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        
        // Verificar el contenido del artículo (solo en desarrollo)
        if (process.env.NODE_ENV === 'development') {
          console.log('Blog cargado:', {
            title: blog.title,
            hasContent: !!blog.content,
            contentType: typeof blog.content,
            contentIsArray: Array.isArray(blog.content),
            contentLength: Array.isArray(blog.content) ? blog.content.length : typeof blog.content === 'string' ? blog.content.length : 'N/A',
            excerpt: blog.excerpt
          });
        }
        
        // Obtén blogs relacionados (excluyendo el actual)
        const related = await fetchRelatedBlogs(slug, 3);

        setPost(blog);
        setRelatedPosts(related);
        setNotFound(false);
      } catch (error) {
        console.error("Error al cargar los datos del blog:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlogData();
  }, [slug]);

  // =========================
  // Estado de carga
  // =========================
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Cargando... | GuiaDeCorte.cl</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gris-600">Cargando artículo...</p>
          </div>
        </div>
      </>
    );
  }

  // =========================
  // Si no se encuentra el post
  // =========================
  if (notFound || !post) {
    return (
      <>
        <Helmet>
          <title>Artículo no encontrado | GuiaDeCorte.cl</title>
          <meta name="description" content="El artículo que buscas no existe o ha sido eliminado. Explora nuestro blog sobre guías de corte y carpintería." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Artículo no encontrado</h1>
            <p className="mb-8 text-gris-600">
              Lo sentimos, el artículo que buscas no existe o ha sido eliminado de nuestro blog.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/blog">
                <Button className="bg-herramienta-600 hover:bg-herramienta-700 text-white">
                  Volver al blog
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline">Ir al inicio</Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // =========================
  // Construir datos estructurados para SEO
  // =========================
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.mainImage?.asset?.url,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "GuiaDeCorte.cl",
      logo: {
      "@type": "ImageObject",
      url: "https://www.guiadecorte.cl/guia-imagenes/profix-126-logo.webp", // AQUÍ VA
    },
    },
    description: post.metaDescription || post.excerpt || "",
  };

  // =========================
  // Renderizado del artículo
  // =========================
  return (
    <>
      {/* SEO y metadatos */}
      <Helmet>
        <title>{post.metaTitle || post.title}</title>
        <meta
          name="description"
          content={post.metaDescription || post.excerpt || ""}
        />
        <meta name="keywords" content={post.tags?.join(", ") || ""} />
        <link rel="canonical" href={`https://www.guiadecorte.cl/blog/${post.slug?.current}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Volver al blog */}
          <Link to="/blog" className="inline-flex items-center text-naranja-600 hover:text-naranja-700 mb-8">
            <ArrowLeft size={16} className="mr-2" /> Volver al blog de carpintería
          </Link>

          {/* Encabezado del artículo */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gris-500 mb-3">
              {post.category && (
                <span className="bg-naranja-100 text-naranja-600 rounded-full px-3 py-1">
                  {post.category}
                </span>
              )}
              <span className="mx-2">•</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span>Por {post.author}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
          </div>

          {/* Imagen principal */}
          {post.mainImage?.asset?.url && (
            <div className="mb-8">
              <img
                src={post.mainImage.asset.url}
                alt={`Guía de corte ProFix 126 - Guía banco sierra - ${post.title}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Contenido del artículo */}
          <article className="prose prose-lg md:prose-xl max-w-none mb-12 prose-headings:text-madera-800 prose-headings:font-bold prose-headings:font-heading prose-p:text-gris-700 prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-madera-900 prose-strong:font-bold prose-a:text-herramienta-600 prose-a:no-underline hover:prose-a:underline prose-ul:text-gris-700 prose-li:mb-3 prose-li:leading-relaxed prose-li:marker:text-naranja-600 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-naranja-300 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-madera-800 prose-blockquote:border-l-4 prose-blockquote:border-naranja-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gris-600 prose-blockquote:bg-naranja-50 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto">
            {post.content && Array.isArray(post.content) && post.content.length > 0 ? (
              // Contenido en formato PortableText (JSON)
              <PortableText value={post.content} />
            ) : post.content && typeof post.content === 'string' && post.content.trim() ? (
              // Contenido como string (HTML o texto plano) - mejorado con formato
              <FormattedContent content={post.content} />
            ) : (
              // Sin contenido - mostrar excerpt y mensaje
              <div className="space-y-4">
                {post.excerpt && (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gris-600 text-lg leading-relaxed mb-6">{post.excerpt}</p>
                  </div>
                )}
                <div className="bg-naranja-50 border-l-4 border-naranja-600 p-4 rounded">
                  <p className="text-gris-700 mb-2">
                    <strong>Contenido del artículo en desarrollo</strong>
                  </p>
                  <p className="text-gris-600 text-sm">
                    Este artículo está siendo actualizado con contenido completo. Mientras tanto, puedes leer el resumen arriba o explorar otros artículos en nuestro blog.
                  </p>
                  <Link to="/blog">
                    <Button variant="outline" className="mt-4">
                      Ver otros artículos
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </article>

          {/* Botones de compartir */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Compartir este artículo</h3>
            <SimpleSocialButtons 
              url={`https://www.guiadecorte.cl/blog/${post.slug?.current}`}
              title={post.title}
              description={post.excerpt}
            />
          </div>

          {/* Etiquetas */}
          {post.tags && post.tags.length > 0 && (
            <div className="border-t border-b py-6 mb-12">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-gris-100 text-gris-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Sección de comentarios */}
          <CommentSection postId={post._id} />

          {/* Artículos relacionados */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-6">Artículos relacionados sobre guía de corte</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) =>
                related.slug?.current ? (
                  <Link to={`/blog/${related.slug.current}`} key={related._id} className="group block">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
                      <div className="aspect-video overflow-hidden">
                        {related.mainImage?.asset?.url && (
                          <img
                            src={related.mainImage.asset.url}
                            alt={`Guía de corte ProFix 126 - Guía banco sierra - ${related.title}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium">{related.title}</h4>
                        <p className="text-sm text-gris-500 mt-1">{formatDate(related.publishedAt)}</p>
                      </div>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;