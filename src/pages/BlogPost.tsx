import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import client from "@/sanityClient"; // Importa el cliente de Sanity

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-CL", options);
  };

  // Cargar datos del blog desde Sanity
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Obtén el blog principal
        const blog = await client.fetch(
          `*[_type == "blog" && _id == $id][0]{
            title,
            content,
            image,
            date,
            author,
            category,
            tags,
            metaTitle,
            metaDescription
          }`,
          { id }
        );

        // Obtén blogs relacionados
        const related = await client.fetch(
          `*[_type == "blog" && _id != $id][0...3]{
            _id,
            title,
            image,
            date
          }`,
          { id }
        );

        setPost(blog);
        setRelatedPosts(related);
      } catch (error) {
        console.error("Error al cargar los datos del blog:", error);
      }
    };

    fetchBlogData();
  }, [id]);

  // Si no se encuentra el post
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
        <p className="mb-8">El artículo de carpintería que estás buscando no existe o ha sido eliminado.</p>
        <Link to="/blog">
          <Button>Volver al blog de carpintería</Button>
        </Link>
      </div>
    );
  }

  // Construir datos estructurados para el artículo
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "GuiaDeCorte.cl",
      logo: {
        "@type": "ImageObject",
        url: "https://www.guiadecorte.cl/logo.png", // URL del logo
      },
    },
    description: post.metaDescription || post.content.substring(0, 200).replace(/<[^>]*>/g, ""),
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle || post.title}</title>
        <meta name="description" content={post.metaDescription || post.content.substring(0, 160).replace(/<[^>]*>/g, "")} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <link rel="canonical" href={`https://www.guiadecorte.cl/blog/${id}`} />
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
              <span className="bg-naranja-100 text-naranja-600 rounded-full px-3 py-1">
                {post.category}
              </span>
              <span className="mx-2">•</span>
              <span>{formatDate(post.date)}</span>
              <span className="mx-2">•</span>
              <span>Por {post.author}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
          </div>

          {/* Imagen principal */}
          <div className="mb-8">
            <img
              src={post.image}
              alt={`Guía de corte aluminio - ${post.title}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Contenido del artículo */}
          <article className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Etiquetas */}
          <div className="border-t border-b py-6 mb-12">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="bg-gris-100 text-gris-700 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Artículos relacionados */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-6">Artículos relacionados sobre guía de corte</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link to={`/blog/${related._id}`} key={related._id} className="group">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={related.image}
                        alt={`Guía de corte aluminio - ${related.title}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium">{related.title}</h4>
                      <p className="text-sm text-gris-500 mt-1">{formatDate(related.date)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;