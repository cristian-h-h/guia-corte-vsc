import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
    <Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Guía de Corte ProFix 126",
      "image": "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
      "description": "Guía de corte profesional para carpintería, precisión industrial.",
      "brand": { "@type": "Brand", "name": "ProFix" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "CLP",
        "price": "99990",
        "availability": "https://schema.org/InStock"
      }
    })}
  </script>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Cómo usar la Guía de Corte ProFix 126",
      "step": [
        { "@type": "HowToStep", "text": "Ajusta la guía sobre el material." },
        { "@type": "HowToStep", "text": "Fija la guía con las pinzas integradas." },
        { "@type": "HowToStep", "text": "Corta usando tu herramienta eléctrica." }
      ]
    })}
  </script>
</Helmet>
       {/* Hero Section */}
      <section className="bg-gradient-to-b from-gris-100 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gris-900 leading-tight">
                <span style={{ fontFamily: 'AmbiguityInline' }}>Guía de Corte</span> <span className="text-naranja-600">ProFix 126</span> Ajuste Rápido
              </h1>
              <p className="mt-6 text-gris-600 text-lg md:text-xl">
                La herramienta definitiva para carpinteros profesionales y aficionados. 
                Realiza cortes rectos, precisos, terminaciones profesionales con tu sierra circular, caladora, router y más.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/producto/profix-126">
                    <Button className="btn-primary flex items-center gap-2 text-lg">
                      Ver producto <ArrowRight size={18} />
                    </Button>
                </Link>
                <Link to="/contacto">
                  <Button variant="outline" className="border-naranja-500 text-naranja-600 hover:bg-naranja-50 text-lg">
                    Contactar
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <img 
                  src="/guia-imagenes/guia-corte-profix-126.webp" 
                  alt="Guía Profix 126 Aluminio corte recto" 
                  loading="lazy"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-naranja-600 text-white px-6 py-3 rounded-full font-bold">
                  ¡Cortes perfectos!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            {/* Descripción SEO del producto principal */}
<section className="py-12 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gris-900">
      Guía de Corte <span className="text-naranja-600">ProFix 126</span>:
    </h2>
    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gris-800">
      Precisión Industrial para Carpinteros Profesionales y Hobbistas Exigentes
    </h3>
    <p className="text-gris-700 mb-4">
      Diseñada para superar los desafíos de la carpintería moderna, la <strong>Guía de Corte ProFix 126</strong> es el sistema definitivo para lograr cortes rectos perfectos hasta 1.26 metros de longitud con precisión milimétrica (±0.3 mm certificada). Su innovador sistema <strong>Quick-Change</strong> permite cambiar entre herramientas en solo 15 segundos sin perder calibración, compatible con sierras circulares, routers, fresadoras, esmeriles angulares y sierras caladoras sin importar la marca de tu herramientas sean estas marcas (<strong>DeWalt, Makita, Bosch, Milwaukee, Stanley, Skill, Einhell, Ubermann, Total, Cat, Ingco, Bauker, etc.</strong>).
    </p>
    <h3 className="text-xl font-bold mt-6 mb-2">
      <span className="text-naranja-600">Especificaciones</span>{" "}
      <span className="text-gris-900">Técnicas Clave:</span>
    </h3>
    <ul className="list-disc pl-6 text-gris-700 mb-4">
      <li>Estructura en aluminio aeronáutico 6061-T6 (resistencia a flexiones y vibraciones).</li>
      <li>Sistema de sujeción multidireccional con topes ajustables en acero endurecido.</li>
      <li>Escala métrica e imperial con nonio para ajustes finos (precisión 0.1 mm).</li>
      <li>Peso optimizado: 1.4 kg con diseño para fácil transporte.</li>
      <li>Zonas de sujecion confeccionado en material antideslizante que impide el movimiento.</li>
    </ul>
      <h3 className="text-xl font-bold mt-6 mb-2">
          Beneficios <span className="text-naranja-600">Exclusivos</span> para Profesionales:
      </h3>
    <ul className="list-disc pl-6 text-gris-700 mb-4">
      <li>✔ Ahorro de hasta 40% en tiempo por proyecto al eliminar mediciones manuales</li>
      <li>✔ Reducción de desperdicio de material gracias a cortes precisos en primera pasada</li>
      <li>✔ Compatibilidad probada con más de 50 modelos de herramientas eléctricas</li>
      <li>✔ Estabilidad superior incluso en cortes de materiales densos (maderas duras, MDF, melamina)</li>
    </ul>
      <h3 className="text-xl font-bold mt-6 mb-2">
          Ventajas para <span className="text-naranja-600">Hobbistas</span> Avanzados:
      </h3>
    <ul className="list-disc pl-6 text-gris-700 mb-4">
      <li>✓ Fácil instalación sin modificaciones en tus herramientas</li>
      <li>✓ Resultados profesionales en proyectos domésticos</li>
      <li>✓ Inversión a largo plazo con garantía extendida de 6 meses</li>
    </ul>
    <div className="mb-4">
      <div className="mb-4">
  <strong>
    Utilizar una Guia <span className="text-naranja-600">ProFix 126</span> que la diferencia de la competencia:
  </strong>
  <span className="block text-gris-600 mt-1">
    <li>✓ “guía de corte profesional 1.26 metros” </li>
      <li>✓ “sistema de precisión para carpintería” </li> 
        <li>✓ “accesorio universal para herramientas manuales y electricas como sierra circular y router, sierra caladora, etc” </li> 
          <li>✓ “cortes rectos perfectos en madera” </li> 
            <li>✓ “herramienta esencial para taller de carpintería” </li>
  </span>
</div>
      
    </div>
      <h3 className="text-xl font-bold mt-6 mb-2">
          ¿Por qué Elegir la <span className="text-naranja-600">ProFix 126</span>?
      </h3>
    <ul className="list-disc pl-6 text-gris-700 mb-4">
      <li>Única guía en el mercado chileno con certificación de precisión industrial.</li>
      <li>No necesita de un kit o adaptadores para utilizar con herramientas sin importar la marca de ella.</li>
      <li>No requieres de soporte técnico especializado para utilizarla nuestra Guía Profix 126.</li>
    </ul>
    <p className="text-gris-700 mb-6">
        Optimiza tu flujo de trabajo, eleva tus estándares de calidad y transforma cada proyecto con la <strong>Guía de Corte ProFix 126</strong>
      <br />
        – donde la ingeniería de precisión se encuentra con la artesanía en madera.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-12 my-8">
  <a
    href="https://youtube.com/shorts/shIy8jqR0tE?feature=share"
    className="inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition text-center"
    target="_blank"
    rel="noopener noreferrer"
  >
    Video 1 demostrativo <span className="text-gris-900">Profix 126</span>
  </a>
  <a
    href="https://youtube.com/shorts/UHUVFCgoRSc?feature=share"
    className="inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition text-center"
    target="_blank"
    rel="noopener noreferrer"
  >
    Video 2 demostrativo <span className="text-gris-900">Profix 126</span>
  </a>
  <a
    href="https://youtube.com/shorts/JDyfjvraM2I?feature=share"
    className="inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition text-center"
    target="_blank"
    rel="noopener noreferrer"
  >
    Video 3 demostrativo <span className="text-gris-900">Profix 126</span>
  </a>
</div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Características Principales de Guía ProFix 126</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gris-50 p-6 rounded-lg shadow-md card-hover border border-transparent transition-all duration-300 hover:bg-naranja-600 hover:text-white hover:border-2 hover:border-naranja-600 group">
  <div className="w-16 h-16 bg-naranja-100 rounded-full flex items-center justify-center mb-4 text-naranja-600 mx-auto group-hover:bg-white group-hover:text-naranja-600 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Ajuste Rápido</h3>
              <p className="text-gris-600 text-center group-hover:text-white transition-colors duration-300">
                Sistema de bloqueo instantáneo que permite ajustes precisos en segundos, sin necesidad de herramientas adicionales.
              </p>
            </div>
            
            <div className="bg-gris-50 p-6 rounded-lg shadow-md card-hover border border-transparent transition-all duration-300 hover:bg-naranja-600 hover:text-white hover:border-2 hover:border-naranja-600 group">
  <div className="w-16 h-16 bg-naranja-100 rounded-full flex items-center justify-center mb-4 text-naranja-600 mx-auto group-hover:bg-white group-hover:text-naranja-600 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Versatilidad Máxima</h3>
              <p className="text-gris-600 text-center group-hover:text-white transition-colors duration-300">
                Compatible con múltiples herramientas: sierra circular, caladora, router, tupí y fresadora. Todo en un solo producto.
              </p>
            </div>
            
            <div className="bg-gris-50 p-6 rounded-lg shadow-md card-hover border border-transparent transition-all duration-300 hover:bg-naranja-600 hover:text-white hover:border-2 hover:border-naranja-600 group">
  <div className="w-16 h-16 bg-naranja-100 rounded-full flex items-center justify-center mb-4 text-naranja-600 mx-auto group-hover:bg-white group-hover:text-naranja-600 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Calidad Profesional</h3>
              <p className="text-gris-600 text-center group-hover:text-white transition-colors duration-300">
                Fabricada en aluminio de alta resistencia, garantiza durabilidad y precisión en cada uso.
              </p>
            </div>
            
            <div className="bg-gris-50 p-6 rounded-lg shadow-md card-hover border border-transparent transition-all duration-300 hover:bg-naranja-600 hover:text-white hover:border-2 hover:border-naranja-600 group">
  <div className="w-16 h-16 bg-naranja-100 rounded-full flex items-center justify-center mb-4 text-naranja-600 mx-auto group-hover:bg-white group-hover:text-naranja-600 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Longitud Extendida</h3>
              <p className="text-gris-600 text-center group-hover:text-white transition-colors duration-300">
                Con una capacidad de corte de hasta 1,26 metros, ideal para trabajos en tableros grandes y piezas extensas.
              </p>
            </div>
            
            <div className="bg-gris-50 p-6 rounded-lg shadow-md card-hover border border-transparent transition-all duration-300 hover:bg-naranja-600 hover:text-white hover:border-2 hover:border-naranja-600 group">
  <div className="w-16 h-16 bg-naranja-100 rounded-full flex items-center justify-center mb-4 text-naranja-600 mx-auto group-hover:bg-white group-hover:text-naranja-600 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 100 4m0 4a3 3 0 015.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Doble Función</h3>
              <p className="text-gris-600 text-center group-hover:text-white transition-colors duration-300">
                No solo sirve como guía de corte, sino también como prensa para armado de muebles. Dos herramientas en una.
              </p>
            </div>
            
            <div className="bg-gris-50 p-6 rounded-lg shadow-md card-hover border border-transparent transition-all duration-300 hover:bg-naranja-600 hover:text-white hover:border-2 hover:border-naranja-600 group">
  <div className="w-16 h-16 bg-naranja-100 rounded-full flex items-center justify-center mb-4 text-naranja-600 mx-auto group-hover:bg-white group-hover:text-naranja-600 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Ahorro de Tiempo</h3>
              <p className="text-gris-600 text-center group-hover:text-white transition-colors duration-300">
                Reduce significativamente el tiempo de preparación y ejecución en tus proyectos de carpintería.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gris-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Cómo Funciona</h2>
          <p className="text-center text-gris-600 max-w-2xl mx-auto mb-16">
            Nuestra guía de corte es fácil de usar y se adapta a múltiples herramientas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-naranja-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Ajusta</h3>
              <p className="text-gris-600">
                Coloca la guía sobre tu material y ajústala a la medida deseada con el sistema de bloqueo rápido.
              </p>
              <img 
                src="/guia-imagenes/ajuste-recto-profix-126.webp" 
                alt="Ajuste Guia Profix 126"
                loading="lazy" 
                className="mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover"
              />
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-naranja-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Fija</h3>
              <p className="text-gris-600">
                Asegura la guía al material con las pinzas de sujeción integradas para un agarre firme.
              </p>
              <img 
                src="/guia-imagenes/corte-sierra-circular-profix-126.webp" 
                alt="Fijar Guia Profix 126"
                loading="lazy" 
                className="mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover"
              />
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-naranja-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Corta</h3>
              <p className="text-gris-600">
                Utiliza tu herramienta deslizándola a lo largo de la guía para conseguir un corte perfecto.
              </p>
              <img 
                src="/guia-imagenes/guia-profix-126.webp" 
                alt="Cortar con Guia Profix 126"
                loading="lazy" 
                className="mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Call to Action */}
      <section className="py-16 bg-naranja-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
  ¡Mejora tus Proyectos de Carpintería con nuestra
  <br />
  Guia de corte{" "}
  <span className="text-black font-bold border-2 border-white px-2 rounded">
    ProFix 126
  </span>
  !
</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
  Adquiere tu Guía de Corte en material de Aluminio que posee un Ajuste Rápido{" "}
  <span className="text-gris-900 font-bold">"ProFix 126"</span>
  {" "}y llevaras tus habilidades al siguiente nivel en cada proyecto que realices.
</p>
          <div className="flex flex-wrap justify-center gap-4">
              <Link to="/producto/profix-126">
               <Button
  className="bg-white text-naranja-700 font-bold py-6 px-12 text-2xl rounded-lg shadow-lg flex items-center gap-4 transition-all duration-200 hover:bg-naranja-700 hover:text-white hover:scale-110 hover:shadow-2xl hover:border-2 hover:border-white"
>
  <svg className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L19 13M7 13V6h10v7"></path>
  </svg>
  Comprar ahora
</Button>
              </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Lo que dicen nuestros clientes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gris-50 p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gris-600 italic mb-4">
                "Esta guía ha transformado mi taller. La precisión y facilidad de uso es impresionante. Recomiendo totalmente este producto."
              </p>
              <p className="font-semibold">Carlos Méndez</p>
              <p className="text-sm text-gris-500">Carpintero profesional</p>
            </div>
            
            <div className="bg-gris-50 p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gris-600 italic mb-4">
                "Como aficionado al bricolaje, esta guía ha sido un descubrimiento. Ahora mis cortes son precisos y profesionales. ¡Una inversión que vale la pena!"
              </p>
              <p className="font-semibold">Andrea Soto</p>
              <p className="text-sm text-gris-500">Entusiasta del bricolaje</p>
            </div>
            
            <div className="bg-gris-50 p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-5 w-5 text-naranja-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gris-600 italic mb-4">
                "La versatilidad de esta guía es impresionante. La uso con mi sierra circular y caladora, y los resultados son siempre perfectos."
              </p>
              <p className="font-semibold">Miguel Rojas</p>
              <p className="text-sm text-gris-500">Fabricante de muebles</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
