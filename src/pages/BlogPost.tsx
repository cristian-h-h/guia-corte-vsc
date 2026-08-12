import { PortableText } from "@portabletext/react";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { fetchBlogBySlug, fetchRelatedBlogs } from "@/api/supabaseApi";
import SimpleSocialButtons from "@/components/SimpleSocialButtons";
import CommentSection from "@/components/CommentSection";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildHowTo,
  type FAQItem,
} from "@/utils/schema";

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

export async function blogPostLoader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;

  if (!slug) {
    return {
      post: null,
      relatedPosts: [],
    };
  }

  const post = await fetchBlogBySlug(slug);
  if (!post) {
    return {
      post: null,
      relatedPosts: [],
    };
  }

  const relatedPosts = await fetchRelatedBlogs(slug, 3);
  return {
    post,
    relatedPosts,
  };
}

const BlogPost = () => {
  const { post, relatedPosts } = useLoaderData() as {
    post: any | null;
    relatedPosts: any[];
  };

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

  if (!post) {
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

  const slug = typeof post.slug === "string" ? post.slug : post.slug?.current;
  const isBlockedSlug = typeof slug === "string" && /^slug-por-defecto/i.test(slug);

  const canonicalUrl = `https://www.guiadecorte.cl/blog/${slug}`;
  const mainImage = post.mainImage?.asset?.url;

  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Inicio", url: "https://www.guiadecorte.cl/" },
    { name: "Blog", url: "https://www.guiadecorte.cl/blog" },
    { name: post.title, url: canonicalUrl },
  ]);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: mainImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "GuiaDeCorte.cl",
      logo: {
        "@type": "ImageObject",
        url: "https://www.guiadecorte.cl/guia-imagenes/profix-126-logo.webp",
      },
    },
    mainEntityOfPage: canonicalUrl,
    description: post.metaDescription || post.excerpt || "",
  };

  const is5ProjectsSlug =
    typeof slug === "string" && /5-proyectos-carpinteria-principiantes/i.test(slug);

  let faqSchema: ReturnType<typeof buildFAQPage> | null = null;
  let howtoSchema: ReturnType<typeof buildHowTo> | null = null;

  if (is5ProjectsSlug) {
    const blogFaq: FAQItem[] = [
      {
        question: "¿Qué proyectos de carpintería puede hacer un principiante?",
        answer: "Un principiante puede empezar con proyectos de carpintería sencillos como repisas flotantes, bancos pequeños, organizadores de herramientas, estantes para libros o mesas de apoyo, usando guías de corte recto y herramientas básicas como sierra circular.",
      },
      {
        question: "¿Qué herramienta básica necesito para empezar en carpintería?",
        answer: "Para empezar en carpintería necesitas, como mínimo, una sierra circular de buena base, una guía de corte recto tipo ProFix 126 para piezas de hasta 1.26m, cinta métrica, escuadra, lijas y abrazaderas. Con eso puedes realizar cortes repetibles en melamina, MDF, terciado y madera.",
      },
      {
        question: "¿Cómo cortar melamina sin astillar siendo principiante?",
        answer: "Para cortar melamina sin astillar cuando eres principiante usa una guía de corte recto, una hoja con muchos dientes para melamina, avanza con velocidad constante y coloca la cara visible hacia abajo cuando cortes con sierra circular por la parte superior.",
      },
      {
        question: "¿Sirve una guía de corte de 1.26m para proyectos pequeños?",
        answer: "Si, una guía de corte de 1.26m como la ProFix 126 sirve tanto para planchas completas como para proyectos pequeños, porque te ayuda a mantener la referencia estable y repetir piezas iguales sin errores de medición.",
      },
    ];
    faqSchema = buildFAQPage(blogFaq);

    howtoSchema = buildHowTo({
      name: "5 proyectos de carpintería para principiantes usando guía de corte recto",
      description:
        "Aprende a ejecutar 5 proyectos sencillos de carpintería para principiantes usando una guía de corte recto de 1.26m y sierra circular sobre melamina, MDF o madera.",
      image: mainImage || "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
      totalTime: "PT120M",
      tool: [{ name: "Sierra circular" }, { name: "Guía de corte ProFix 126" }, { name: "Escuadra y cinta métrica" }],
      supply: [
        { name: "Melamina, MDF o terciado" },
        { name: "Tornillos y pegamento" },
        { name: "Abrazaderas o pinzas" },
      ],
      estimatedCost: { currency: "CLP", value: "60000" },
      steps: [
        {
          name: "1. Repisa flotante simple",
          text: "Corta 1 o 2 tablas de melamina de 20cm de ancho y entre 60cm y 100cm de largo con la ProFix 126. Lija los bordes, fija soportes invisibles a la pared y monta la repisa. Ideal para principiantes por su baja complejidad.",
          image: "https://www.guiadecorte.cl/guia-imagenes/terciado-melamina-blanco.webp",
        },
        {
          name: "2. Organizador de herramientas de pared",
          text: "Corta una base de MDF de 60x40cm y varias tiras que harán de separadores con la guía de corte recto. Ensambla con tornillos, agrega ganchos y cuelga en el taller. Sirve para ordenar herramientas y practicar cortes repetitivos.",
          image: "https://www.guiadecorte.cl/guia-imagenes/carro-premium.webp",
        },
        {
          name: "3. Banco pequeño o mesa de apoyo",
          text: "Corta 2 patas, 2 travesaños y una tapa usando melamina blanca o terciado. Marca las referencias con escuadra, corta con la ProFix 126 para asegurar 90 grados y une con tornillos y pegamento. Refuerza con listones de madera.",
          image: "https://www.guiadecorte.cl/guia-imagenes/corte-sierra-circular-profix-126.webp",
        },
        {
          name: "4. Estante de libros vertical",
          text: "Define la altura del mueble, corta los laterales y los estantes con medidas iguales usando la guía de 1.26m sobre plancha de 1.22m. Perfora para cuerdas o tarugos, ensambla y fija a la pared por seguridad.",
          image: "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
        },
        {
          name: "5. Macetero de madera o caja decorativa",
          text: "Corta 4 caras iguales más base y tapa opcional con sierra circular y guía. Ensambla a 45 grados o a tope, lija bien y barniza o pinta. Sirve tanto de macetero como de caja multiusos para el taller o la casa.",
          image: "https://www.guiadecorte.cl/guia-imagenes/ajuste-recto-profix-126.webp",
        },
      ],
    });
  }

  const structuredData: object[] = [blogPostingSchema, breadcrumbSchema];
  if (faqSchema) structuredData.push(faqSchema);
  if (howtoSchema) structuredData.push(howtoSchema);

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
        <meta
          name="robots"
          content={isBlockedSlug ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}
        />
        <link rel="canonical" href={canonicalUrl} />
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

          {/* Interlinking con guías técnicas */}
          <div className="mt-12 mb-10 bg-gradient-to-br from-madera-50 via-white to-herramienta-50 border border-madera-100 rounded-2xl p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-naranja-700 mb-2">
                  Sigue aprendiendo · Guías prácticas
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gris-900">
                  Guías técnicas que complementan este artículo
                </h2>
              </div>
              <Link
                to="/guias"
                className="inline-flex items-center gap-2 text-naranja-600 hover:text-naranja-700 font-semibold"
              >
                Ver todas las guías <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Link
                to="/guias/como-hacer-cortes-rectos-con-sierra-circular"
                className="group bg-white border border-gris-200 rounded-xl p-5 shadow-sm hover:shadow-xl transition-shadow hover:border-naranja-200"
              >
                <span className="inline-block bg-herramienta-600 text-white rounded-full px-3 py-1 text-xs font-bold mb-3 shadow-sm">
                  Técnica principal
                </span>
                <h3 className="text-lg font-bold text-gris-900 mb-2 group-hover:text-naranja-700 transition-colors">
                  Cómo hacer cortes rectos con sierra circular
                </h3>
                <p className="text-sm text-gris-600 leading-relaxed">
                  Pasos claros para preparar referencia, fijar, apoyar la base y ejecutar el pasaje sin desviaciones.
                </p>
              </Link>
              <Link
                to="/guias/cortes-en-melamina-mdf-terciado"
                className="group bg-white border border-gris-200 rounded-xl p-5 shadow-sm hover:shadow-xl transition-shadow hover:border-naranja-200"
              >
                <span className="inline-block bg-taller-800 text-white rounded-full px-3 py-1 text-xs font-bold mb-3 shadow-sm">
                  Materiales
                </span>
                <h3 className="text-lg font-bold text-gris-900 mb-2 group-hover:text-naranja-700 transition-colors">
                  Cortes en melamina, MDF y terciado sin astillar
                </h3>
                <p className="text-sm text-gris-600 leading-relaxed">
                  Qué hoja usar, cómo orientar la plancha y por qué la ProFix 126 ayuda a terminados más limpios.
                </p>
              </Link>
              <Link
                to="/guias/guia-de-corte-para-router"
                className="group bg-white border border-gris-200 rounded-xl p-5 shadow-sm hover:shadow-xl transition-shadow hover:border-naranja-200"
              >
                <span className="inline-block bg-naranja-600 text-white rounded-full px-3 py-1 text-xs font-bold mb-3 shadow-sm">
                  Uso complementario
                </span>
                <h3 className="text-lg font-bold text-gris-900 mb-2 group-hover:text-naranja-700 transition-colors">
                  Guía de corte para router y fresadora
                </h3>
                <p className="text-sm text-gris-600 leading-relaxed">
                  Ranurados largos, apoyos planos, validación de base y cuándo conviene combinar sierra circular + router.
                </p>
              </Link>
            </div>
          </div>

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
