import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Página no encontrada | GuiaDeCorte.cl</title>
        <meta name="description" content="La página que buscas no existe. Visita nuestra guía de corte ProFix 126 para herramientas profesionales de carpintería." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.guiadecorte.cl/404" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-madera-100 to-madera-200 py-12 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-herramienta-600 mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-madera-800 mb-4">
              Página no encontrada
            </h2>
            <p className="text-xl text-madera-700 mb-8">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-madera-800 mb-4">
              ¿Buscas nuestra Guía de Corte ProFix 126?
            </h3>
            <p className="text-madera-600 mb-6">
              Explora nuestras páginas principales para encontrar la herramienta profesional 
              que necesitas para tus proyectos de carpintería.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-herramienta-600 hover:bg-herramienta-700 text-white flex items-center gap-2">
                  <Home size={18} />
                  Ir al inicio
                </Button>
              </Link>
              <Link to="/producto/profix-126">
                <Button variant="outline" className="border-2 border-taller-600 text-taller-700 hover:bg-taller-100 flex items-center gap-2">
                  <Search size={18} />
                  Ver producto
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" className="border-2 border-naranja-600 text-naranja-700 hover:bg-naranja-100 flex items-center gap-2">
                  Ver blog
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-sm text-madera-600">
            <p>Si crees que esto es un error, por favor contáctanos.</p>
            <Link to="/contacto" className="text-herramienta-600 hover:underline">
              Ir a contacto
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
