import { Link, useLoaderData } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { fetchBlogs } from "@/api/supabaseApi";
import { blogTopicClusters, internalLinkObjectives, priorityBlogBriefs, recommendedReadingPaths } from "@/data/blogEditorialPlan";
import { supportGuides } from "@/data/supportGuides";

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

export async function blogLoader() {
  return fetchBlogs();
}

const Blog = () => {
  const blogPosts = useLoaderData() as BlogPost[];
  const highIntentQueries = [
    "guia de corte recto",
    "guia de corte para sierra circular",
    "guia recta para sierra circular",
    "guia de aluminio para sierra circular",
    "guia corte madera",
    "guia de corte Ubermann",
  ];

  const commercialAngles = [
    {
      title: "Buscar una guia de corte recto con intención real de compra",
      description:
        "Muchos usuarios no buscan teoria. Buscan una guia de corte recto que les ayude a cortar mejor, perder menos material y decidir rapido si la ProFix 126 les sirve.",
    },
    {
      title: "Resolver dudas de materiales y trabajo diario",
      description:
        "El blog ahora empuja mejor terminos como melamina, MDF, madera, tableros y sierra circular con guia de corte para capturar trafico util y no solo visitas vagas.",
    },
    {
      title: "Conectar contenido con producto y contacto",
      description:
        "Cada bloque editorial deberia acercar al usuario a una accion concreta: ver la ProFix 126, revisar compatibilidad o pedir el link directo de compra.",
    },
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-CL", options);
  };

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
          Blog de Carpinteria | Guia de Corte Recto | Tutoriales y Consejos
        </title>
        <meta
          name="description"
          content="Encuentra articulos especializados sobre guia de corte recto, guia de corte para sierra circular, compatibilidad por marca, melamina, MDF, terciado y uso real de la ProFix 126."
        />
        <meta
          name="keywords"
          content="blog carpinteria, guia de corte recto, guia de corte para sierra circular, guia recta para sierra circular, guia de aluminio para sierra circular, melamina, mdf, profix 126, tutoriales carpinteria"
        />
        <link rel="canonical" href="https://www.guiadecorte.cl/blog" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Blog de Carpinteria y Corte Recto
          </h1>
          <p className="text-gris-600 max-w-3xl mx-auto">
            Contenido pensado para quienes trabajan melamina, MDF, terciado y madera en general con sierra circular,
            router o herramientas de base compatible. La idea del blog es ayudarte a comprar mejor, cortar mejor
            y sacar más provecho real a la <strong>ProFix 126</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {highIntentQueries.map((query) => (
              <span
                key={query}
                className="inline-flex items-center rounded-full bg-gris-100 px-3 py-1 text-sm font-medium text-gris-700"
              >
                {query}
              </span>
            ))}
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {recommendedReadingPaths.map((path) => (
            <article key={path.title} className="bg-gris-50 border border-gris-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-3">{path.title}</h2>
              <p className="text-gris-600 mb-4">{path.description}</p>
              <Link
                to={path.destination}
                className="text-naranja-600 font-medium hover:text-naranja-700 inline-flex items-center gap-1"
              >
                Ir a esta ruta <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </section>

        <section className="mb-16 bg-gris-50 border border-gris-200 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Como este blog ayuda a vender mejor la ProFix 126</h2>
            <p className="text-gris-600 max-w-3xl mx-auto">
              El blog no solo existe para posicionar. Existe para capturar dudas reales, responder objeciones antes de comprar
              y reforzar keywords como guia de corte para sierra circular, guia recta para sierra circular, guia de aluminio
              para sierra circular y usos en melamina, MDF o madera.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {commercialAngles.map((angle) => (
              <article key={angle.title} className="bg-white border border-gris-200 rounded-lg p-5 shadow-sm">
                <h3 className="text-xl font-bold mb-3">{angle.title}</h3>
                <p className="text-gris-700">{angle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">URLs prioritarias para reforzar SEO y comunicacion</h2>
            <p className="text-gris-600 max-w-3xl mx-auto">
              Estas paginas soporte responden dudas concretas sobre compatibilidad, materiales, sierra circular y
              router. Son buenas candidatas para atraer trafico util y empujar al visitante correcto hacia producto,
              galeria o contacto.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportGuides.map((guide) => (
              <article key={guide.slug} className="bg-white border border-gris-200 rounded-lg p-6 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">
                  {guide.primaryKeyword}
                </p>
                <h3 className="text-xl font-bold mb-2">{guide.shortTitle}</h3>
                <p className="text-gris-600 mb-4">{guide.description}</p>
                <div className="space-y-2 text-sm text-gris-700 mb-4">
                  <p>
                    <strong>Publico:</strong> {guide.audience}
                  </p>
                  <p>
                    <strong>Intencion:</strong> {guide.searchIntent}
                  </p>
                </div>
                <p className="text-sm text-gris-500 mb-4">
                  <strong>URL:</strong> {guide.path}
                </p>
                <Link
                  to={guide.path}
                  className="text-naranja-600 font-medium hover:text-naranja-700 inline-flex items-center gap-1"
                >
                  Abrir guia <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Siguientes posts que mas conviene publicar</h2>
            <p className="text-gris-600 max-w-3xl mx-auto">
              Estos temas empujan trafico de etapa media y alta de compra hacia las guias nuevas. Sirven para
              responder objeciones reales y reforzar compatibilidad, comparativas y materiales.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {priorityBlogBriefs.map((brief) => (
              <article key={brief.title} className="bg-white border border-gris-200 rounded-lg p-6 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">
                  {brief.targetKeyword}
                </p>
                <h3 className="text-xl font-bold mb-3">{brief.title}</h3>
                <p className="text-sm text-gris-500 mb-2">
                  <strong>Intencion:</strong> {brief.intent}
                </p>
                <p className="text-gris-600 mb-4">{brief.angle}</p>
                <Link to={brief.destination} className="text-naranja-600 font-medium hover:text-naranja-700 inline-flex items-center gap-1">
                  Ver URL objetivo <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>

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

        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Mapa Editorial SEO del Blog</h2>
            <p className="text-gris-600 max-w-3xl mx-auto">
              Estas son las rutas de contenido que más conviene desarrollar para atraer búsquedas útiles, resolver objeciones
              de compra y conectar el blog con la página de producto.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogTopicClusters.map((cluster) => (
              <article key={cluster.title} className="bg-white border border-gris-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">{cluster.title}</h3>
                <p className="text-sm text-gris-500 mb-2">
                  <strong>Publico:</strong> {cluster.audience}
                </p>
                <p className="text-gris-600 mb-4">
                  <strong>Intencion:</strong> {cluster.searchIntent}
                </p>
                <p className="text-sm text-gris-500 mb-3">
                  <strong>Keywords prioridad:</strong> {cluster.priorityKeywords.join(", ")}
                </p>
                <ul className="list-disc pl-5 text-gris-700 space-y-2">
                  {cluster.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gris-200">
                  <p className="text-sm font-semibold text-gris-700 mb-2">URLs de apoyo</p>
                  <ul className="space-y-2">
                    {cluster.supportingUrls.map((url) => (
                      <li key={url}>
                        <Link to={url} className="text-naranja-600 hover:text-naranja-700 text-sm">
                          {url}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-madera-50 rounded-lg p-8 border border-madera-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-3">Conecta el Blog con la Compra</h2>
              <p className="text-gris-700 mb-4">
                El blog no solo debe atraer visitas. Tambien debe empujar al visitante correcto hacia la ficha de producto,
                la galeria y el contacto tecnico cuando aparezcan dudas de compatibilidad o de uso.
              </p>
              <ul className="list-disc pl-5 text-gris-700 space-y-2">
                <li>Usa los articulos para responder dudas reales antes de comprar.</li>
                <li>Refuerza el uso principal con sierra circular y los usos complementarios bien validados.</li>
                <li>Relaciona cada post con materiales, herramientas y escenarios de trabajo concretos.</li>
                {internalLinkObjectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/producto/profix-126">
                <Button className="w-full">Ver ProFix 126</Button>
              </Link>
              <Link to="/guias">
                <Button variant="outline" className="w-full">Explorar guias</Button>
              </Link>
              <Link to="/galeria">
                <Button variant="outline" className="w-full">Ver galeria</Button>
              </Link>
              <Link to="/contacto">
                <Button variant="outline" className="w-full">Resolver compatibilidad</Button>
              </Link>
            </div>
          </div>
        </section>

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
