
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

// Datos simulados para el blog con palabras clave mejoradas y contenido SEO
const blogPosts = [
  {
    id: 1,
    title: "Guía completa: Cómo hacer cortes perfectos con guía de aluminio",
    excerpt: "Aprende técnicas profesionales para utilizar tu guía de corte de aluminio y lograr resultados precisos en todos tus proyectos de carpintería y bricolaje.",
    image: "/guia-imagenes/guia-corte-ajustable-terciamel.png",
    date: "2024-05-01",
    author: "Roberto Gómez",
    category: "Tutoriales",
    keywords: "guía de corte, cortes precisos, carpintería, aluminio, sierra circular"
  },
  {
    id: 2,
    title: "5 proyectos DIY imprescindibles utilizando tu guía de corte de aluminio",
    excerpt: "Descubre proyectos prácticos y creativos para poner a prueba tu guía de corte aluminio y mejorar tus habilidades de carpintería casera.",
    image: "/guia-imagenes/guia-corte-sierra-circular-terciamel.png",
    date: "2024-04-25",
    author: "Ana Martínez",
    category: "Proyectos DIY",
    keywords: "proyectos DIY, bricolaje, guía aluminio, carpintería casera"
  },
  {
    id: 3,
    title: "Mantenimiento profesional para tu guía de corte de aluminio",
    excerpt: "Guía completa con consejos expertos para mantener tu guía de corte en óptimas condiciones, prolongar su vida útil y garantizar cortes precisos.",
    image: "/guia-imagenes/guia-corte-ajuste-rapido-terciamel.png",
    date: "2024-04-10",
    author: "Carlos Pérez",
    category: "Mantenimiento",
    keywords: "mantenimiento herramientas, guía aluminio, durabilidad, precisión"
  },
  {
    id: 4,
    title: "Sierra circular vs. Caladora: ¿Qué herramienta es mejor con guía de aluminio?",
    excerpt: "Análisis detallado sobre qué herramienta ofrece mejores resultados para diferentes tipos de cortes utilizando la guía de aluminio de ajuste rápido.",
    image: "/guia-imagenes/guia-corte-terciamel.png",
    date: "2024-03-20",
    author: "Miguel Santos",
    category: "Herramientas",
    keywords: "sierra circular, caladora, comparativa, guía de corte aluminio"
  },
  {
    id: 5,
    title: "Ventajas de usar guía de aluminio con router: Resultados profesionales",
    excerpt: "Descubre cómo la guía de corte aluminio transforma tu router en una herramienta de precisión profesional para trabajos avanzados de carpintería.",
    image: "/guia-imagenes/guia-corte-recto-terciamel.png",
    date: "2024-03-05",
    author: "Laura Sánchez",
    category: "Herramientas",
    keywords: "router, fresadora, guía aluminio, precisión, carpintería profesional"
  },
  {
    id: 6,
    title: "Optimización de espacio en talleres pequeños: Guía de corte multifuncional",
    excerpt: "Cómo la guía de corte aluminio ajuste rápido puede transformar cualquier espacio reducido en un taller funcional y profesional para carpintería.",
    image: "/guia-imagenes/guia-corte-router-terciamel.png",
    date: "2024-02-15",
    author: "Javier Méndez",
    category: "Consejos",
    keywords: "taller pequeño, optimización espacio, guía aluminio, bricolaje, multifunción"
  },
  {
    id: 7,
    title: "Cómo construir muebles perfectos usando la guía de corte como prensa",
    excerpt: "Tutorial paso a paso para aprovechar la guía de corte aluminio como sistema de prensado profesional en el armado y ensamblaje de muebles.",
    image: "/guia-imagenes/guia-corte-ajuste-rapido-terciamel.png",
    date: "2024-01-30",
    author: "Martín Torres",
    category: "Tutoriales",
    keywords: "prensa carpintería, ensamblaje muebles, guía aluminio, técnicas encolado"
  }
];

const Blog = () => {
  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('es-CL', options);
  };

  return (
    <>
      <Helmet>
        <title>Blog de Carpintería | Guía de Corte Aluminio | Tutoriales y Consejos</title>
        <meta name="description" content="Encuentra artículos especializados, tutoriales y consejos prácticos para sacar el máximo provecho a tu Guía de Corte Aluminio en proyectos de carpintería y bricolaje." />
        <meta name="keywords" content="blog carpintería, guía de corte aluminio, tutoriales carpintería, sierra circular, router, caladora, proyectos DIY, bricolaje" />
        <link rel="canonical" href="https://www.guiadecorte.cl/blog" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog de Carpintería - Guía de Corte Aluminio</h1>
          <p className="text-gris-600 max-w-2xl mx-auto">
            Descubre artículos especializados, tutoriales detallados y consejos profesionales para 
            aprovechar al máximo tu Guía de Corte Aluminio y mejorar tus proyectos de carpintería y bricolaje.
          </p>
        </div>

        {/* Artículo destacado */}
        <div className="mb-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <img
                src={blogPosts[0].image}
                alt={`Guía de corte aluminio - ${blogPosts[0].title}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center text-sm text-gris-500 mb-3">
                <span className="bg-naranja-100 text-naranja-600 rounded-full px-3 py-1">
                  {blogPosts[0].category}
                </span>
                <span className="mx-2">•</span>
                <span>{formatDate(blogPosts[0].date)}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-gris-600 mb-6">{blogPosts[0].excerpt}</p>
              <div className="mt-auto">
                <Link to={`/blog/${blogPosts[0].id}`} aria-label={`Leer artículo completo sobre ${blogPosts[0].title}`}>
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
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={`Guía de corte aluminio - ${post.title}`}
                  className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gris-500 mb-3">
                  <span className="bg-naranja-50 text-naranja-600 rounded-full px-3 py-1">
                    {post.category}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gris-600 mb-4">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.id}`}
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
              <h2 className="text-2xl font-bold mb-2">Suscríbete a nuestro boletín de carpintería</h2>
              <p className="text-gris-600">
                Recibe las últimas noticias, tutoriales y ofertas exclusivas de guías de corte directamente en tu correo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                aria-label="Tu correo electrónico"
                className="px-4 py-3 rounded-md border border-gris-300 focus:outline-none focus:ring-2 focus:ring-naranja-500"
              />
              <Button className="btn-primary whitespace-nowrap">Suscribirme Ahora</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
