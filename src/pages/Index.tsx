import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import OptimizedImage from "@/components/OptimizedImage";
import { organizationSchema, websiteSchema, productSchema } from "@/data/organizationSchema";

const Index = () => {
  return (
    <>
      <SEO
        title="Guía de Corte ProFix 126 | Precisión Profesional para Carpintería"
        description="Guía de corte recto ProFix 126, para sierra circular profesional y todo tipo de herramientas eléctricas. Realiza cortes rectos perfectos hasta 1,26 metros en madera, melamina y más."
        keywords="guía de corte, sierra circular, router, carpintería, bricolaje, herramientas precisión, cortes madera, profix 126, guía aluminio, corte recto preciso"
        image="https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp"
        url="https://www.guiadecorte.cl/"
        schema={[organizationSchema, websiteSchema, productSchema, {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Cómo usar la Guía de Corte ProFix 126",
          "description": "Guía paso a paso para utilizar correctamente la Guía de Corte ProFix 126",
          "image": "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
          "totalTime": "PT5M",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "CLP",
            "value": "35000"
          },
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Guía de Corte ProFix 126"
            },
            {
              "@type": "HowToSupply",
              "name": "Sierra circular, router o caladora"
            },
            {
              "@type": "HowToSupply",
              "name": "Material a cortar (madera, melamina, etc.)"
            }
          ],
          "tool": [
            {
              "@type": "HowToTool",
              "name": "Sierra circular"
            },
            {
              "@type": "HowToTool",
              "name": "Router"
            },
            {
              "@type": "HowToTool",
              "name": "Caladora"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Ajustar la guía",
              "text": "Coloca la guía sobre tu material y ajústala a la medida deseada con el sistema de bloqueo rápido.",
              "image": "https://www.guiadecorte.cl/guia-imagenes/ajuste-recto-profix-126.webp",
              "url": "https://www.guiadecorte.cl/galeria#ajuste"
            },
            {
              "@type": "HowToStep",
              "name": "Fijar la guía",
              "text": "Asegura la guía al material con las pinzas de sujeción integradas para un agarre firme.",
              "image": "https://www.guiadecorte.cl/guia-imagenes/corte-sierra-circular-profix-126.webp",
              "url": "https://www.guiadecorte.cl/galeria#fijacion"
            },
            {
              "@type": "HowToStep",
              "name": "Realizar el corte",
              "text": "Utiliza tu herramienta deslizándola a lo largo de la guía para conseguir un corte perfecto.",
              "image": "https://www.guiadecorte.cl/guia-imagenes/guia-profix-126.webp",
              "url": "https://www.guiadecorte.cl/galeria#corte"
            }
          ]
        }]}
      />
      {/* Hero Section - Mejorado con nuevos colores */}
      <section className="relative overflow-hidden bg-gradient-to-b from-madera-200 to-madera-100 py-16 md:py-24 border-b-4 border-herramienta-300">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-herramienta-600 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-taller-600 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-madera-500 blur-3xl opacity-30"></div>
        </div>

        {/* Patrón de herramientas en el fondo */}
        <div className="absolute inset-0 z-0 opacity-10 pattern-tools"></div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 md:pr-8">
              <div className="inline-block bg-herramienta-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse shadow-lg">
                Precisión Profesional para Carpinteros
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-madera-800 leading-tight">
                <span style={{ fontFamily: 'AmbiguityInline' }}>Guía de Corte</span> <br />
                <span className="text-herramienta-600 drop-shadow-md">ProFix 126</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-taller-700 to-taller-600"> Ajuste Rápido</span>
              </h1>

              <div className="mt-6 space-y-4">
                <p className="text-madera-700 text-lg md:text-xl font-medium">
                  La herramienta definitiva para carpinteros profesionales y aficionados.
                  Realiza cortes rectos, precisos y terminaciones profesionales con cualquier herramienta.
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <li className="flex items-center text-madera-800 bg-madera-100 p-2 rounded-lg shadow-sm">
                    <span className="bg-herramienta-600 p-1 rounded-full mr-2 shadow-md">
                      <Check size={16} className="text-white" />
                    </span>
                    Precisión milimétrica certificada
                  </li>
                  <li className="flex items-center text-madera-800 bg-madera-100 p-2 rounded-lg shadow-sm">
                    <span className="bg-herramienta-600 p-1 rounded-full mr-2 shadow-md">
                      <Check size={16} className="text-white" />
                    </span>
                    Compatible con todas las marcas
                  </li>
                  <li className="flex items-center text-madera-800 bg-madera-100 p-2 rounded-lg shadow-sm">
                    <span className="bg-herramienta-600 p-1 rounded-full mr-2 shadow-md">
                      <Check size={16} className="text-white" />
                    </span>
                    Aluminio aeronáutico 6061-T6
                  </li>
                  <li className="flex items-center text-madera-800 bg-madera-100 p-2 rounded-lg shadow-sm">
                    <span className="bg-herramienta-600 p-1 rounded-full mr-2 shadow-md">
                      <Check size={16} className="text-white" />
                    </span>
                    Hasta 1.26 metros de longitud
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/producto/profix-126">
                  <Button className="bg-herramienta-600 hover:bg-herramienta-700 text-white flex items-center gap-2 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white">
                    Ver producto <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/contacto">
                  <Button variant="outline" className="border-2 border-taller-600 text-taller-700 hover:bg-taller-100 text-lg px-8 py-6 rounded-xl shadow-md hover:shadow-lg">
                    Contactar
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex items-center bg-madera-100 p-3 rounded-lg shadow-inner">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-taller-800 flex items-center justify-center text-taller-100 text-xs shadow-md">★</div>
                  <div className="w-8 h-8 rounded-full bg-taller-800 flex items-center justify-center text-taller-100 text-xs shadow-md">★</div>
                  <div className="w-8 h-8 rounded-full bg-taller-800 flex items-center justify-center text-taller-100 text-xs shadow-md">★</div>
                  <div className="w-8 h-8 rounded-full bg-taller-800 flex items-center justify-center text-taller-100 text-xs shadow-md">★</div>
                  <div className="w-8 h-8 rounded-full bg-taller-800 flex items-center justify-center text-taller-100 text-xs shadow-md">★</div>
                </div>
                <span className="ml-3 text-madera-800 font-medium">
                  <span className="font-bold">4.9/5</span> basado en más de 100 reseñas de carpinteros
                </span>
              </div>
            </div>

            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                {/* Imagen principal del producto */}
                <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                  <img
                    src="/guia-imagenes/guia-corte-profix-126.webp"
                    alt="Guía Profix 126 Aluminio corte recto"
                    loading="lazy"
                    className="w-full h-auto rounded-lg"
                  />

                  {/* Etiqueta de precio */}
                  <div className="absolute top-4 right-4 bg-taller-800 text-white px-4 py-2 rounded-full font-bold shadow-lg transform rotate-12 border-2 border-white">
                    $35.000 efectivo
                  </div>
                </div>

                {/* Etiqueta de beneficio principal */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-herramienta-600 text-white px-8 py-3 rounded-full font-bold shadow-lg z-20 text-lg border-2 border-white">
                  ¡Cortes perfectos garantizados!
                </div>

                {/* Imágenes pequeñas de uso del producto */}
                <div className="absolute -right-4 top-1/4 w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg z-20 transform rotate-6">
                  <img
                    src="/guia-imagenes/corte-sierra-circular-profix-126.webp"
                    alt="Uso con sierra circular"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -left-4 bottom-1/4 w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg z-20 transform -rotate-6">
                  <img
                    src="/guia-imagenes/ajuste-recto-profix-126.webp"
                    alt="Ajuste de la guía"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-30 animate-shine"></div>
              </div>
            </div>
          </div>

          {/* Marcas compatibles */}
          <div className="mt-12 pt-8 border-t border-gris-200">
            <p className="text-center text-gris-500 mb-4">Compatible con todas las marcas líderes:</p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
              <span className="text-gris-700 font-bold">DeWalt</span>
              <span className="text-gris-700 font-bold">Makita</span>
              <span className="text-gris-700 font-bold">Bosch</span>
              <span className="text-gris-700 font-bold">Milwaukee</span>
              <span className="text-gris-700 font-bold">Stanley</span>
              <span className="text-gris-700 font-bold">Skill</span>
              <span className="text-gris-700 font-bold">Einhell</span>
              <span className="text-gris-700 font-bold">Ubermann</span>
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
      <section className="py-16 bg-gradient-to-r from-madera-100 to-madera-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-madera-800">Características Principales de Guía ProFix 126</h2>
          <div className="w-24 h-2 bg-herramienta-600 mx-auto mb-16 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card group">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="feature-title">Ajuste Rápido</h3>
              <p className="feature-text">
                Sistema de bloqueo instantáneo que permite ajustes precisos en segundos, sin necesidad de herramientas adicionales.
              </p>
            </div>

            <div className="feature-card group">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="feature-title">Versatilidad Máxima</h3>
              <p className="feature-text">
                Compatible con múltiples herramientas: sierra circular, caladora, router, tupí y fresadora. Todo en un solo producto.
              </p>
            </div>

            <div className="feature-card group">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="feature-title">Calidad Profesional</h3>
              <p className="feature-text">
                Fabricada en aluminio de alta resistencia, garantiza durabilidad y precisión en cada uso.
              </p>
            </div>

            <div className="feature-card group">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="feature-title">Longitud Extendida</h3>
              <p className="feature-text">
                Con una capacidad de corte de hasta 1,26 metros, ideal para trabajos en tableros grandes y piezas extensas.
              </p>
            </div>

            <div className="feature-card group">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 100 4m0 4a3 3 0 015.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Doble Función</h3>
              <p className="feature-text">
                No solo sirve como guía de corte, sino también como prensa para armado de muebles. Dos herramientas en una.
              </p>
            </div>

            <div className="feature-card group">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Ahorro de Tiempo</h3>
              <p className="feature-text">
                Reduce significativamente el tiempo de preparación y ejecución en tus proyectos de carpintería.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gradient-to-b from-madera-300 to-madera-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-madera-800">Cómo Funciona</h2>
          <div className="w-24 h-2 bg-herramienta-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-center text-madera-700 max-w-2xl mx-auto mb-16 text-lg font-medium">
            Nuestra guía de corte es fácil de usar y se adapta a múltiples herramientas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="step-card text-center transform transition-transform hover:scale-105 hover:shadow-lg">
              <div className="step-number">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-herramienta-700">Ajusta</h3>
              <p className="text-madera-700 mb-4">
                Coloca la guía sobre tu material y ajústala a la medida deseada con el sistema de bloqueo rápido.
              </p>
              <img
                src="/guia-imagenes/ajuste-recto-profix-126.webp"
                alt="Ajuste Guia Profix 126"
                loading="lazy"
                className="mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover hover:shadow-xl transition-shadow duration-300"
              />
            </div>

            <div className="step-card text-center transform transition-transform hover:scale-105 hover:shadow-lg">
              <div className="step-number">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-herramienta-700">Fija</h3>
              <p className="text-madera-700 mb-4">
                Asegura la guía al material con las pinzas de sujeción integradas para un agarre firme.
              </p>
              <img
                src="/guia-imagenes/corte-sierra-circular-profix-126.webp"
                alt="Fijar Guia Profix 126"
                loading="lazy"
                className="mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover hover:shadow-xl transition-shadow duration-300"
              />
            </div>

            <div className="step-card text-center transform transition-transform hover:scale-105 hover:shadow-lg">
              <div className="step-number">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-herramienta-700">Corta</h3>
              <p className="text-madera-700 mb-4">
                Utiliza tu herramienta deslizándola a lo largo de la guía para conseguir un corte perfecto.
              </p>
              <img
                src="/guia-imagenes/guia-profix-126.webp"
                alt="Cortar con Guia Profix 126"
                loading="lazy"
                className="mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover hover:shadow-xl transition-shadow duration-300"
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
