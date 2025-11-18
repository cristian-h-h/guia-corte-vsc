import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { fetchBlogs } from "@/api/supabaseApi"; // Cambiado a supabaseApi

type BlogPost = {
  _id: string;
  title: string;
  excerpt: string;
  content?: any;
  mainImage?: { asset?: { url: string } };
  publishedAt: string;
  author?: string;
  tags?: string[];
  slug?: { current: string };
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs().then((data) => {
      setBlogPosts(data);
      setLoading(false);
    });
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-CL", options);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Cargando artículos del blog...</p>
      </div>
    );
  }

  if (!blogPosts.length) {
    return (
      <>
        <Helmet>
          <title>Blog - Guía de Corte | GuiaDeCorte.cl</title>
          <meta name="description" content="Explora nuestros artículos sobre guías de corte, herramientas de carpintería y técnicas profesionales." />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog - Guía de Corte</h1>
          <p className="text-gris-600 mb-8">
            Próximamente publicaremos artículos útiles sobre guías de corte, herramientas de carpintería y técnicas profesionales.
          </p>
          <Link to="/">
            <Button className="bg-herramienta-600 hover:bg-herramienta-700 text-white">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Blog de Carpintería | Guía de Corte Aluminio | Tutoriales y Consejos
        </title>
        <meta
          name="description"
          content="Encuentra artículos especializados, tutoriales y consejos prácticos para sacar el máximo provecho a tu Guía de Corte Aluminio en proyectos de carpintería y bricolaje."
        />
        <meta
          name="keywords"
          content="blog carpintería, guía de corte aluminio, tutoriales carpintería, sierra circular, router, caladora, proyectos DIY, bricolaje"
        />
        <link rel="canonical" href="https://www.guiadecorte.cl/blog" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Blog de Carpintería - Guía de Corte Aluminio
          </h1>
          <p className="text-gris-600 max-w-2xl mx-auto">
            Descubre artículos especializados, tutoriales detallados y consejos
            profesionales para aprovechar al máximo tu Guía de Corte Aluminio y
            mejorar tus proyectos de carpintería y bricolaje.
          </p>
        </div>

        {/* Artículo destacado */}
        <div className="mb-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <img
                src={blogPosts[0].mainImage?.asset?.url}
                alt={`Guía de corte ProFix 126 - Guía banco sierra - ${blogPosts[0].title}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center text-sm text-gris-500 mb-3">
                {blogPosts[0].tags && blogPosts[0].tags.length > 0 && (
                  <span className="bg-naranja-100 text-naranja-600 rounded-full px-3 py-1">
                    {blogPosts[0].tags[0]}
                  </span>
                )}
                <span className="mx-2">•</span>
                <span>{formatDate(blogPosts[0].publishedAt)}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-gris-600 mb-6">{blogPosts[0].excerpt}</p>
              <div className="mt-auto">
                <Link
                  to={`/blog/${blogPosts[0].slug?.current || blogPosts[0]._id}`}
                  aria-label={`Leer artículo completo sobre ${blogPosts[0].title}`}
                >
                  <Button className="flex items-center gap-2">
                    Leer artículo completo <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de artículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden card-hover"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.mainImage?.asset?.url}
                  alt={`Guía de corte ProFix 126 - Guía banco sierra - ${post.title}`}
                  className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gris-500 mb-3">
                  {post.tags && post.tags.length > 0 && (
                    <span className="bg-naranja-50 text-naranja-600 rounded-full px-3 py-1">
                      {post.tags[0]}
                    </span>
                  )}
                  <span className="mx-2">•</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gris-600 mb-4">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug?.current || post._id}`}
                  className="text-naranja-600 font-medium hover:text-naranja-700 flex items-center gap-1"
                  aria-label={`Leer más sobre ${post.title}`}
                >
                  Leer artículo completo <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Sección de suscripción */}
        <div className="mt-16 bg-naranja-50 rounded-lg p-8 md:p-12">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:pr-6">
              <h2 className="text-2xl font-bold mb-2">
                Suscríbete a nuestro boletín de carpintería
              </h2>
              <p className="text-gris-600">
                Recibe las últimas noticias, tutoriales y ofertas exclusivas de
                guías de corte directamente en tu correo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                aria-label="Tu correo electrónico"
                className="px-4 py-3 rounded-md border border-gris-300 focus:outline-none focus:ring-2 focus:ring-naranja-500"
              />
              <Button className="btn-primary whitespace-nowrap">
                Suscribirme Ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;