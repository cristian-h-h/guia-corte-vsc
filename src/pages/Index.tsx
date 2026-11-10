import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Check, MessageSquare, ShieldCheck, Store, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import { organizationSchema, websiteSchema, productSchema } from "@/data/organizationSchema";
import { buildBreadcrumbList, buildHowTo } from "@/utils/schema";
import { preciosProducto, formatCLP } from "@/data/precioProducto";

const compatibilityBrands = [
  { name: "Makita", tone: "bg-madera-50 border-madera-200 text-madera-800" },
  { name: "DeWalt", tone: "bg-herramienta-50 border-herramienta-200 text-herramienta-800" },
  { name: "Bosch", tone: "bg-naranja-50 border-naranja-200 text-naranja-800" },
  { name: "Ubermann", tone: "bg-taller-50 border-taller-200 text-taller-800" },
  { name: "Stanley", tone: "bg-madera-50 border-madera-200 text-madera-800" },
  { name: "Ingco", tone: "bg-herramienta-50 border-herramienta-200 text-herramienta-800" },
  { name: "Skil", tone: "bg-naranja-50 border-naranja-200 text-naranja-800" },
  { name: "Einhell", tone: "bg-taller-50 border-taller-200 text-taller-800" },
];

const realClientShowcase = [
  {
    title: "Taller movil en obra: sierra circular + melamina de 15mm",
    scenario: "Instalador de muebles que corta planchas en terreno antes de armar.",
    alt: "Guia de corte ProFix 126 usada en taller real de obra con melamina de 15mm",
    image: "/guia-imagenes/terciado-melamina-15mm.webp",
    detail:
      "Corta planchas de 1.22m de una sola pasada, ahorra traslado a un taller de corte y evita cortes intermedios.",
    badge: "Cliente real - zona sur",
  },
  {
    title: "Mueblista en taller chico: cortes repetitivos para rack y closet",
    scenario: "Piezas iguales en melamina blanca con sierra circular portatil.",
    alt: "Guia ProFix 126 en taller de mueblista cortando melamina blanca de forma repetida",
    image: "/guia-imagenes/terciado-melamina-blanco.webp",
    detail:
      "Repite medidas sin marcar dos veces cada pieza y reduce mermas de terminacion.",
    badge: "Cliente real - RM",
  },
  {
    title: "Armado de carro candybar con tableros largos",
    scenario: "Fabricacion de estructuras y apoyos con guia para cortes rectos largos.",
    alt: "Guia de corte ProFix 126 usada para fabricar estructura de carro candybar en taller",
    image: "/guia-imagenes/carro-candybar.webp",
    detail:
      "Cortes largos con referencia continua en tableros que luego se ensamblan sin retoques.",
    badge: "Cliente real - V Region",
  },
  {
    title: "Carro premium desmontable: precision en piezas encastrables",
    scenario: "Piezas que requieren escuadra y repeticion exacta en espesores.",
    alt: "Guia ProFix 126 usada en fabricacion de carro premium desmontable en taller",
    image: "/guia-imagenes/carro-premium.webp",
    detail:
      "El 1.26m ayuda en planchas completas y luego en piezas largas del carro sin re-cortes.",
    badge: "Cliente real - RM",
  },
];

const featuredBlogPosts = [
  {
    slug: "5-proyectos-carpinteria-principiantes-guia-corte",
    title: "5 proyectos de carpintería para principiantes",
    excerpt:
      "5 proyectos sencillos (repisa, organizador, banco, estante y macetero) usando la ProFix 126 como guía de corte recto sobre melamina y madera.",
    image: "/guia-imagenes/terciado-melamina-blanco.webp",
    badge: "Gratis — Nivel principiante",
    category: "Proyectos",
  },
  {
    slug: "guia-de-corte-para-melamina-122x244",
    title: "Cómo cortar melamina 122x244 sin astillar",
    excerpt:
      "Consejos prácticos para planchar la plancha completa de 1.22x2.44m usando la ProFix 126 de 1.26m de una sola pasada.",
    image: "/guia-imagenes/terciado-melamina-15mm.webp",
    badge: "Materiales",
    category: "Técnica de corte",
  },
  {
    slug: "compatibilidad-profix-126-makita-hs7600",
    title: "ProFix 126 + Makita HS7600: Guía de compatibilidad",
    excerpt:
      "Validación de base plana, apoyo, recorrido y corte real con la sierra Makita HS7600 sobre melamina y MDF.",
    image: "/guia-imagenes/ajuste-recto-profix-126.webp",
    badge: "Compatibilidad",
    category: "Marca y modelo",
  },
];

const Index = () => {
  const homeBreadcrumbSchema = buildBreadcrumbList([
    { name: "Inicio", url: "https://www.guiadecorte.cl/" },
  ]);

  const homeHowToSchema = buildHowTo({
    name: "Cómo usar la Guía de Corte ProFix 126",
    description:
      "Guía paso a paso para utilizar correctamente la Guía de Corte ProFix 126 de 1.26m sobre planchas de melamina, MDF, terciado y madera con sierra circular o router.",
    image: "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
    totalTime: "PT5M",
    estimatedCost: { currency: "CLP", value: String(preciosProducto.precioEfectivo) },
    supply: [
      { name: "Guía de Corte ProFix 126" },
      { name: "Sierra circular, router o caladora" },
      { name: "Material a cortar (madera, melamina, etc.)" },
    ],
    tool: [
      { name: "Sierra circular" },
      { name: "Router" },
      { name: "Caladora" },
    ],
    steps: [
      {
        name: "Ajustar la guía",
        text: "Coloca la guía sobre tu material y ajústala a la medida deseada con el sistema de bloqueo rápido.",
        image: "https://www.guiadecorte.cl/guia-imagenes/ajuste-recto-profix-126.webp",
        url: "https://www.guiadecorte.cl/galeria#ajuste",
      },
      {
        name: "Fijar la guía",
        text: "Asegura la guía al material con las pinzas de sujeción integradas para un agarre firme.",
        image: "https://www.guiadecorte.cl/guia-imagenes/corte-sierra-circular-profix-126.webp",
        url: "https://www.guiadecorte.cl/galeria#fijacion",
      },
      {
        name: "Realizar el corte",
        text: "Utiliza tu herramienta deslizándola a lo largo de la guía para conseguir un corte perfecto de hasta 1.26m en planchas de 1.22m de una sola pasada.",
        image: "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
        url: "https://www.guiadecorte.cl/galeria#corte",
      },
    ],
  });

  const topSearchPhrases = [
    "guia de corte recto para sierra circular",
    "guia de corte para sierra circular",
    "guia de aluminio para sierra circular",
    "guia recta para sierra circular",
    "guia corte madera",
    "guia de corte Ubermann",
  ];

  const homeUseCases = [
    {
      title: "Cortes rectos en melamina y MDF",
      description:
        "Si buscas una guia para cortar melamina o trabajar MDF con mejor repeticion, la ProFix 126 ordena la referencia y ayuda a reducir errores en tableros largos.",
    },
    {
      title: "Guia de corte para sierra circular en obra o taller",
      description:
        "La ProFix 126 funciona como guia de corte para sierra circular cuando necesitas portabilidad, rapidez de ajuste y una base de trabajo mas controlada que una regla improvisada.",
    },
    {
      title: "Guia de aluminio para cortar madera",
      description:
        "El cuerpo de aluminio entrega rigidez y estabilidad para cortes rectos en madera, terciado y piezas donde una desviacion pequena ya afecta terminacion y encastre.",
    },
  ];

  const homeBenefits = [
    "Mejor repetibilidad cuando debes sacar varias piezas iguales.",
    "Menor desperdicio al trabajar melamina, MDF, terciado y madera.",
    "Mas control en cortes largos con sierra circular y base compatible.",
    "Referencia portable para taller pequeno, instalacion y obra.",
    "Ajuste rapido para pasar de medir a cortar con menos tiempo muerto.",
    "Mejor claridad comercial para quien compara guia de corte recto, guia de aluminio o soluciones tipo Ubermann.",
  ];

  return (
    <>
      <SEO
        title="Guía de Corte Sierra Circular 1.26m | Precisión Profesional Chile"
        description="Guía de corte recto ProFix 126 para sierra circular y herramientas con base compatible. Guía de aluminio de 1.26m en Chile para cortar melamina, MDF, terciado y madera con precisión y menos desperdicio."
        keywords="guia de corte recto, guia de corte para sierra circular, guia de aluminio para sierra circular, guia recta para sierra circular, guia corte sierra circular, guia corte madera, guia de corte Ubermann, guia de corte Makita, guia de corte Bosch, guia de corte DeWalt, melamina, MDF, terciado, profix 126, 1.26 metros, Chile"
        image="https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp"
        url="https://www.guiadecorte.cl/"
        schema={[
          organizationSchema,
          websiteSchema,
          productSchema,
          homeBreadcrumbSchema,
          homeHowToSchema,
        ]}
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
                <span style={{ fontFamily: 'AmbiguityInline' }}>Guía de Corte Recto</span> <br />
                <span className="text-herramienta-600 drop-shadow-md">ProFix 126</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-taller-700 to-taller-600"> para Sierra Circular</span>
              </h1>

              <div className="mt-6 space-y-4">
                <p className="text-madera-700 text-lg md:text-xl font-medium">
                  La <strong>ProFix 126</strong> es una guia de corte recto para sierra circular pensada para quienes
                  buscan cortes limpios, repetibles y con mejor control al trabajar melamina, MDF, terciado y madera
                  en taller, instalacion u obra.
                </p>
                <div className="flex flex-wrap gap-2">
                  {topSearchPhrases.map((phrase) => (
                    <span
                      key={phrase}
                      className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-madera-800 shadow-sm"
                    >
                      {phrase}
                    </span>
                  ))}
                </div>

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
                    Compatible con múltiples marcas según base
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
                <Link to="/guias/compatibilidad-por-marcas-frecuentes">
                  <Button variant="outline" className="border-2 border-herramienta-600 text-herramienta-700 hover:bg-herramienta-100 text-lg px-8 py-6 rounded-xl shadow-md hover:shadow-lg">
                    Ver compatibilidad por marcas
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
                  Elegida por carpinteros, mueblistas y usuarios que buscan más precisión en cada corte
                </span>
              </div>
            </div>

            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                {/* Imagen principal del producto */}
                <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                  <img
                    src="/guia-imagenes/guia-corte-profix-126.webp"
                    alt="Guía de corte ProFix 126 - Guía banco sierra de aluminio para corte recto con sierra circular"
                    loading="eager"
                    fetchPriority="high"
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-lg"
                  />

                  {/* Etiqueta de precio */}
                  <div className="absolute top-4 right-4 bg-taller-800 text-white px-4 py-2 rounded-2xl font-bold shadow-lg border-2 border-white text-center leading-tight">
                    <span className="block text-[10px] uppercase tracking-wide text-naranja-200">Efectivo o transferencia</span>
                    <span className="block text-xl">{formatCLP(preciosProducto.precioEfectivo)}</span>
                    <span className="block text-[10px] text-naranja-200">Tarjeta y factura {formatCLP(preciosProducto.precioTarjeta)}</span>
                  </div>
                </div>

                {/* Etiqueta de beneficio principal */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-herramienta-600 text-white px-8 py-3 rounded-full font-bold shadow-lg z-20 text-lg border-2 border-white">
                  Más control en cada corte
                </div>

                {/* Imágenes pequeñas de uso del producto */}
                <div className="absolute -right-4 top-1/4 w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg z-20 transform rotate-6">
                  <img
                    src="/guia-imagenes/corte-sierra-circular-profix-126.webp"
                    alt="Guía de corte recto para sierra circular - Uso de guía banco sierra ProFix 126"
                    loading="lazy"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -left-4 bottom-1/4 w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg z-20 transform -rotate-6">
                  <img
                    src="/guia-imagenes/ajuste-recto-profix-126.webp"
                    alt="Guía de corte ProFix 126 - Sistema de ajuste rápido de guía banco sierra"
                    loading="lazy"
                    width={96}
                    height={96}
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
            <p className="text-center text-gris-500 mb-4">Compatible con múltiples marcas y modelos de base similar:</p>
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
            <div className="text-center mt-5">
              <Link to="/guias/compatibilidad-por-marcas-frecuentes" className="text-herramienta-700 font-semibold hover:text-herramienta-800">
                Revisa compatibilidad por marcas frecuentes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Precios del producto */}
      <section id="precios" className="py-14 bg-gradient-to-br from-gris-50 via-white to-gris-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-herramienta-600 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg">
              Precios ProFix 126
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-gris-900 md:text-4xl">
              Dos formas de pago, elige la que mejor te acomoda
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gris-600">
              Compra directa con envío inmediato en todo Chile. Puedes pagar en efectivo o transferencia, o con tarjeta y factura.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-naranja-500 bg-white p-6 text-center shadow-lg">
              <p className="text-sm font-bold uppercase tracking-wide text-naranja-700">Efectivo o transferencia</p>
              <p className="mt-2 text-4xl font-extrabold text-naranja-600">{formatCLP(preciosProducto.precioEfectivo)}</p>
              <p className="mt-1 text-sm text-gris-600">por unidad</p>
            </div>
            <div className="rounded-2xl border-2 border-herramienta-200 bg-white p-6 text-center shadow-lg">
              <p className="text-sm font-bold uppercase tracking-wide text-herramienta-700">Tarjeta y factura</p>
              <p className="mt-2 text-4xl font-extrabold text-herramienta-700">{formatCLP(preciosProducto.precioTarjeta)}</p>
              <p className="mt-1 text-sm text-gris-600">por unidad</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gris-600">
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-herramienta-600" /> Envío a todo Chile mediante {preciosProducto.envioNacional}
            </span>
            <span className="inline-flex items-center gap-2">
              <Store className="h-4 w-4 text-herramienta-600" /> Retiros en{" "}
              <a
                href={preciosProducto.mapaRetiroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-herramienta-700 underline decoration-dotted underline-offset-2 hover:text-herramienta-800"
              >
                {preciosProducto.direccionRetiro}
              </a>
            </span>
          </div>

          <div className="mt-8 text-center">
            <Link to="/producto/profix-126">
              <Button className="bg-naranja-600 px-8 py-6 text-lg font-bold text-white hover:bg-naranja-700">
                Comprar ProFix 126
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Descripción SEO del producto principal */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gris-900">
            Guía de Corte Recto <span className="text-naranja-600">ProFix 126</span> para Sierra Circular:
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gris-800">
            Guía de Aluminio para Cortes con Herramientas Eléctricas e Inalámbricas
          </h3>
          <p className="text-gris-700 mb-4">
            La <strong>ProFix 126</strong> es una guía de corte recto de <strong>1.26 metros</strong> creada para personas
            que trabajan melamina, MDF, terciado y madera en general con <strong>sierra circular</strong> como uso principal.
            Tambien puede acompañar trabajos con <strong>router o fresadora</strong> cuando la base de la herramienta es compatible.
            Su objetivo es simple: ayudarte a repetir medidas, mejorar la terminación y reducir desperdicio en cortes largos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="bg-gris-50 border border-gris-200 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2">Si buscas una guia de corte para sierra circular</h3>
              <p className="text-gris-700 text-sm">
                Aqui aterrizas en el uso principal de la ProFix 126: guiar cortes rectos, largos y repetibles sin depender
                de soluciones improvisadas o maquinas grandes.
              </p>
            </div>
            <div className="bg-gris-50 border border-gris-200 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2">Si comparas una guia de aluminio</h3>
              <p className="text-gris-700 text-sm">
                El cuerpo en aluminio 6061-T6 aporta rigidez, portabilidad y mejor estabilidad para trabajar tableros,
                muebles y piezas largas con una referencia mas confiable.
              </p>
            </div>
            <div className="bg-gris-50 border border-gris-200 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2">Si necesitas confirmar compatibilidad</h3>
              <p className="text-gris-700 text-sm">
                Muchas visitas llegan buscando Makita, Bosch, DeWalt o Ubermann. Por eso la web hoy comunica compatibilidad
                responsable por marca, base y tipo de trabajo.
              </p>
            </div>
          </div>
          <h3 className="text-xl font-bold mt-6 mb-2">
            <span className="text-naranja-600">Especificaciones</span>{" "}
            <span className="text-gris-900">Técnicas Clave:</span>
          </h3>
          <ul className="list-disc pl-6 text-gris-700 mb-4">
            <li>Estructura en aluminio aeronáutico 6061-T6 (resistencia a flexiones y vibraciones).</li>
            <li>Sistema de ajuste rápido para preparar medidas de trabajo con mayor agilidad.</li>
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
            <li>✔ Mejor control del corte en piezas largas y tableros de mueblería</li>
            <li>✔ Estabilidad superior incluso en cortes de materiales densos (maderas duras, MDF, melamina)</li>
          </ul>
          <h3 className="text-xl font-bold mt-6 mb-2">
            Ventajas para <span className="text-naranja-600">Hobbistas</span> Avanzados:
          </h3>
          <ul className="list-disc pl-6 text-gris-700 mb-4">
            <li>✓ Preparación rápida para trabajos domésticos y de taller</li>
            <li>✓ Resultados profesionales en proyectos domésticos</li>
            <li>✓ Mejor repetibilidad cuando necesitas varias piezas iguales</li>
          </ul>
          <h3 className="text-xl font-bold mt-6 mb-2">
            ¿Por qué Elegir la <span className="text-naranja-600">ProFix 126</span>?
          </h3>
          <ul className="list-disc pl-6 text-gris-700 mb-4">
            <li>Te entrega un formato de trabajo largo y portable para taller u obra.</li>
            <li>Prioriza sierra circular y herramientas de base compatible, sin vender compatibilidades dudosas.</li>
            <li>Ayuda a trabajar con más confianza cuando necesitas cortes rectos repetibles y mejor terminación.</li>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <Link to="/guias/cortes-en-melamina-mdf-terciado" className="bg-gris-50 border border-gris-200 rounded-lg p-5 hover:border-herramienta-600 transition-colors">
              <h3 className="font-bold text-lg mb-2">Trabajas melamina, MDF o terciado?</h3>
              <p className="text-gris-700 text-sm">
                Mira cuando una guia recta realmente ayuda a cortar tableros con mejor repeticion y menos error.
              </p>
            </Link>
            <Link to="/guias/profix-126-vs-regla-casera" className="bg-gris-50 border border-gris-200 rounded-lg p-5 hover:border-herramienta-600 transition-colors">
              <h3 className="font-bold text-lg mb-2">Sigues usando una regla casera?</h3>
              <p className="text-gris-700 text-sm">
                Compara cuando una guia dedicada ya marca diferencia real en flujo, precision y desperdicio.
              </p>
            </Link>
            <Link to="/guias/compatibilidad-por-modelo-de-herramienta" className="bg-gris-50 border border-gris-200 rounded-lg p-5 hover:border-herramienta-600 transition-colors">
              <h3 className="font-bold text-lg mb-2">Tienes una marca o modelo especifico?</h3>
              <p className="text-gris-700 text-sm">
                Revisa que datos conviene validar antes de comprar para confirmar compatibilidad responsable.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 bg-gris-50 border-y border-gris-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gris-900 mb-4">
              Usos y beneficios de una <span className="text-naranja-600">guia de corte recto ProFix 126</span>
            </h2>
            <p className="text-lg text-gris-700">
              Esta seccion responde una duda comercial concreta: para que sirve realmente una guia de corte recto
              para sierra circular y por que una guia de aluminio como la ProFix 126 puede ayudarte a vender mejor
              precision, menos desperdicio y mas confianza en cada trabajo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {homeUseCases.map((item) => (
              <article key={item.title} className="bg-white rounded-xl border border-gris-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gris-900">{item.title}</h3>
                <p className="text-gris-700">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gris-200 p-6 md:p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-5 text-gris-900">
              Beneficios reales al usar una guia recta para sierra circular
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {homeBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-lg bg-gris-50 p-4 border border-gris-200">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-naranja-600 text-white">
                    <Check size={14} />
                  </span>
                  <p className="text-gris-700">{benefit}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/producto/profix-126">
                <Button className="bg-naranja-600 hover:bg-naranja-700 text-white">
                  Ver la ProFix 126
                </Button>
              </Link>
              <Link to="/guias/como-hacer-cortes-rectos-con-sierra-circular">
                <Button variant="outline">Ver usos con sierra circular</Button>
              </Link>
              <Link to="/guias/cortes-en-melamina-mdf-terciado">
                <Button variant="outline">Ver usos en melamina y MDF</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-madera-100 to-madera-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-madera-800">Características Principales de la Guía de Corte ProFix 126</h2>
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
              <h3 className="feature-title">Guía de Corte con Herramientas Eléctricas</h3>
              <p className="feature-text">
                Diseñada principalmente para sierra circular y también utilizable con router o fresadora cuando la base de la herramienta es compatible con el sistema.
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-madera-800">Cómo Funciona la Guía de Corte Recto</h2>
          <div className="w-24 h-2 bg-herramienta-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-center text-madera-700 max-w-2xl mx-auto mb-16 text-lg font-medium">
            Nuestra guía de corte recto para sierra circular es fácil de usar y se adapta a múltiples herramientas eléctricas e inalámbricas. La guía de aluminio para cortes sierra circular permite realizar cortes precisos en cualquier proyecto.
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
                alt="Guía de corte ProFix 126 - Ajuste rápido de guía banco sierra para corte recto"
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
                alt="Guía de corte recto para sierra circular - Fijación de guía banco sierra ProFix 126"
                loading="lazy"
                className="mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover hover:shadow-xl transition-shadow duration-300"
              />
            </div>

            <div className="step-card text-center transform transition-transform hover:scale-105 hover:shadow-lg">
              <div className="step-number">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-herramienta-700">Corta con la Guía</h3>
              <p className="text-madera-700 mb-4">
                Utiliza tu sierra circular u otra herramienta eléctrica deslizándola a lo largo de la guía de corte recto para conseguir un corte perfecto. Esta guía para realizar cortes con sierra circular garantiza precisión profesional en cada proyecto.
              </p>
              <img
                src="/guia-imagenes/guia-profix-126.webp"
                alt="Guía de corte ProFix 126 - Realizando cortes con guía banco sierra de aluminio"
                loading="lazy"
                className="mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ventaja 1.26m */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Tu ventaja con los <span className="text-naranja-600">1.26m</span> frente a Sodimac, Imperial y Kreg
          </h2>
          <div className="w-24 h-2 bg-naranja-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-center text-gris-700 max-w-3xl mx-auto mb-12 text-lg">
            La mayoria de las guias en Chile se quedan en 1.00 - 1.22m. Eso no alcanza para una plancha estandar de 1.22m.
            La ProFix 126 llega a 1.26m, asi que cortas la plancha completa de una sola vez, sin cortes intermedios, sin desviaciones y sin perder tiempo.
          </p>
          <div className="overflow-x-auto max-w-5xl mx-auto">
            <table className="min-w-full bg-white rounded-lg shadow text-left border border-gris-200">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gris-50 border-b border-gris-200 font-bold text-gris-900">
                    Característica
                  </th>
                  <th className="py-3 px-4 bg-gris-50 border-b border-gris-200 font-bold text-gris-700">
                    Competencia estándar (Sodimac, Imperial, Kreg)
                  </th>
                  <th className="py-3 px-4 bg-naranja-600 border-b border-naranja-700 font-bold text-white">
                    ProFix 126 en Chile
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gris-200">
                  <td className="py-3 px-4 font-semibold text-gris-900">Largo total</td>
                  <td className="py-3 px-4 text-gris-700">1.00 - 1.22m (quedan cortas para planchas)</td>
                  <td className="py-3 px-4 font-bold text-naranja-700">1.26m, corta planchas de 1.22m de una vez</td>
                </tr>
                <tr className="border-b border-gris-200">
                  <td className="py-3 px-4 font-semibold text-gris-900">Material</td>
                  <td className="py-3 px-4 text-gris-700">Plástico o aluminio delgado</td>
                  <td className="py-3 px-4 font-bold text-naranja-700">Aluminio aeronáutico 6061-T6</td>
                </tr>
                <tr className="border-b border-gris-200">
                  <td className="py-3 px-4 font-semibold text-gris-900">Precio</td>
                  <td className="py-3 px-4 text-gris-700">$43.990+ o $300.000+ en opciones premium</td>
                  <td className="py-3 px-4 font-bold text-naranja-700">{formatCLP(preciosProducto.precioEfectivo)} por transferencia o efectivo / {formatCLP(preciosProducto.precioTarjeta)} con tarjeta y factura.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-gris-900">Despacho</td>
                  <td className="py-3 px-4 text-gris-700">Depende de stock regional o espera</td>
                  <td className="py-3 px-4 font-bold text-naranja-700">Stock para envío inmediato en Chile</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sello Compatibilidad Garantizada */}
      <section className="py-14 bg-gradient-to-b from-madera-50 to-gris-50 border-y border-madera-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-herramienta-300 shadow-xl p-7 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-herramienta-600 opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-naranja-600 opacity-10 blur-3xl"></div>
                <div className="flex items-center justify-between mb-5 relative">
                  <div className="rounded-full bg-naranja-100 border-2 border-naranja-400 p-3 shadow-sm">
                    <ShieldCheck className="h-8 w-8 text-naranja-700" />
                  </div>
                  <div className="flex items-center gap-1 bg-taller-800 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md">
                    <BadgeCheck className="h-4 w-4" />
                    Garantia ProFix
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gris-900 mb-3 leading-tight">
                  Compatible con Makita, DeWalt, Bosch, Ubermann y mas.
                </h3>
                <p className="text-gris-700 font-semibold mb-4 text-lg">
                  Si no le sirve para su trabajo con sierra circular, base compatible o modelo concreto, <span className="text-naranja-700">se la cambiamos</span>.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-gris-700">
                    <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-herramienta-100 text-herramienta-700 p-1 border border-herramienta-200 shadow-sm">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-medium">Soporte antes de comprar: envianos foto de la base y el modelo.</span>
                  </li>
                  <li className="flex items-start gap-2 text-gris-700">
                    <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-herramienta-100 text-herramienta-700 p-1 border border-herramienta-200 shadow-sm">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-medium">Envio inmediato en CHILE con stock listo para despacho.</span>
                  </li>
                  <li className="flex items-start gap-2 text-gris-700">
                    <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-herramienta-100 text-herramienta-700 p-1 border border-herramienta-200 shadow-sm">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-medium">Guia pensada para sierra circular y uso real en muebles, taller u obra.</span>
                  </li>
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to="/guias/compatibilidad-por-modelo-de-herramienta">
                    <Button variant="outline" className="w-full h-auto whitespace-normal text-center leading-tight border-2 border-herramienta-600 text-herramienta-700 hover:bg-herramienta-50 py-3 rounded-xl shadow-md">
                      Revisar compatibilidad
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/56935777727?text=Hola,%20tengo%20stock%20para%20envio%20inmediato%20en%20Chile%20y%20somos%20los%20unicos%20con%201.26m%20de%20largo.%20Quiero%20validar%20compatibilidad%20de%20la%20guia%20de%20corte%20ProFix%20126%20con%20mi%20herramienta."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full h-auto whitespace-normal leading-tight bg-naranja-600 hover:bg-naranja-700 text-white py-3 rounded-xl shadow-md flex items-center justify-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      <span className="text-center">Validar por WhatsApp</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-herramienta-700 mb-3">
                  Marcas habituales que usan la guia en talleres de Chile
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-gris-900 mb-4">
                  Eliminamos el miedo a que <span className="text-naranja-600">no sea compatible</span> con tu sierra circular.
                </h2>
                <p className="text-gris-700 text-lg leading-relaxed max-w-3xl">
                  Antes de comprar puedes validar el modelo y la base con nosotros por WhatsApp. Si llega y no funciona para el uso que tenias previsto dentro de nuestro alcance comercial, resolvemos el cambio dentro del proceso.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {compatibilityBrands.map((brand) => (
                  <div
                    key={brand.name}
                    className={`rounded-2xl border-2 ${brand.tone} p-5 flex items-center justify-center shadow-sm hover:shadow-lg transition-shadow`}
                  >
                    <p className="text-center text-xl font-extrabold">{brand.name}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-gris-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5">
                <article>
                  <h4 className="font-extrabold text-gris-900 mb-2 flex items-center gap-2">
                    <span className="bg-naranja-100 text-naranja-700 rounded-full px-2 py-1 text-xs font-bold">
                      PASO 1
                    </span>
                    Foto de la base
                  </h4>
                  <p className="text-gris-700">
                    Envianos por WhatsApp una foto de la base plana de tu sierra circular, router o herramienta.
                  </p>
                </article>
                <article>
                  <h4 className="font-extrabold text-gris-900 mb-2 flex items-center gap-2">
                    <span className="bg-herramienta-100 text-herramienta-700 rounded-full px-2 py-1 text-xs font-bold">
                      PASO 2
                    </span>
                    Marca + Modelo
                  </h4>
                  <p className="text-gris-700">
                    Indicanos marca, modelo y si la base tiene ranuras, topes o una parte inferior plana.
                  </p>
                </article>
                <article>
                  <h4 className="font-extrabold text-gris-900 mb-2 flex items-center gap-2">
                    <span className="bg-taller-100 text-taller-700 rounded-full px-2 py-1 text-xs font-bold">
                      PASO 3
                    </span>
                    Respuesta con OK o cambio
                  </h4>
                  <p className="text-gris-700">
                    Te respondemos rapido si es util para tu trabajo. Si no lo es, resolvemos alternativa o cambio.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes reales en taller */}
      <section className="py-16 bg-gradient-to-b from-gris-50 to-white border-b border-gris-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-sm font-bold uppercase tracking-wide text-naranja-600 mb-3">
              Factor Humano - Talleres reales de Chile
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gris-900 mb-4">
              La ProFix 126 en talleres, obra y muebles reales
            </h2>
            <p className="text-lg text-gris-700 leading-relaxed">
              No usamos fotos de catalogo. En la practica la guia se usa en talleres chicos, instaladores, fabricacion de carros y muebles con sierra circular, melamina, MDF y terciado. Estos son escenarios reales de clientes que ya usan la ProFix 126 en Chile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {realClientShowcase.map((item) => (
              <article
                key={item.title}
                className="group bg-white rounded-2xl border border-gris-200 shadow-sm hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-naranja-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md">
                    <BadgeCheck className="h-4 w-4" />
                    {item.badge}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs uppercase tracking-wide font-bold text-herramienta-700">
                    {item.scenario}
                  </p>
                  <h3 className="font-extrabold text-lg text-gris-900 leading-snug group-hover:text-naranja-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gris-700 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/galeria">
              <Button className="bg-herramienta-600 hover:bg-herramienta-700 text-white py-6 px-8 rounded-xl text-lg shadow-md">
                Ver galeria completa
              </Button>
            </Link>
            <a
              href="https://wa.me/56935777727?text=Hola,%20tengo%20stock%20para%20envio%20inmediato%20en%20Chile%20y%20somos%20los%20unicos%20con%201.26m%20de%20largo.%20Quiero%20comprar%20la%20guia%20de%20corte%20ProFix%20126%20despues%20de%20ver%20clientes%20reales."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full sm:w-auto border-2 border-naranja-600 text-naranja-700 hover:bg-naranja-50 py-6 px-8 rounded-xl text-lg shadow-md">
                Pedir link de compra
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Blog destacado / Interlinking */}
      <section id="blog-destacado" className="py-16 bg-gradient-to-b from-white to-madera-50 border-y border-madera-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-sm font-bold uppercase tracking-wide text-herramienta-700 mb-3">
              Consejo de taller · Contenido real
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gris-900 mb-4">
              Tips de corte, proyectos y compatibilidad desde el blog
            </h2>
            <p className="text-lg text-gris-700 leading-relaxed">
              Guías prácticas pensadas para quien usa sierra circular, melamina, MDF o madera en taller o instalación.
              Cada post se arma con casos reales y termina vinculado a la ficha producto, a las guías o a WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
            {featuredBlogPosts.map((post, idx) => {
              const isBlog = idx === 0;
              const href = isBlog
                ? `/blog/${post.slug}`
                : `/guias/${post.slug}`;
              return (
                <Link
                  key={post.slug}
                  to={href}
                  className="group bg-white rounded-2xl border border-gris-200 shadow-sm hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-naranja-200"
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={`${post.title} — ProFix 126 guía de corte`}
                      loading="lazy"
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="bg-herramienta-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md animate-pulse">
                        {post.badge}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 text-madera-800 rounded-full px-3 py-1 text-xs font-semibold shadow-sm border border-madera-200">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-extrabold text-lg text-gris-900 leading-snug group-hover:text-naranja-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gris-700 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="pt-3 flex items-center justify-between border-t border-gris-100">
                      <span className="inline-flex items-center gap-2 text-naranja-600 hover:text-naranja-700 font-semibold group-hover:gap-3 transition-all text-sm">
                        Abrir contenido <ArrowRight className="h-4 w-4" />
                      </span>
                      <BadgeCheck className="h-5 w-5 text-herramienta-600" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/blog">
              <Button className="bg-taller-700 hover:bg-taller-800 text-white py-6 px-8 rounded-xl text-lg shadow-md flex items-center gap-2">
                Ver todo el blog <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/guias">
              <Button variant="outline" className="w-full sm:w-auto border-2 border-herramienta-600 text-herramienta-700 hover:bg-herramienta-50 py-6 px-8 rounded-xl text-lg shadow-md">
                Ir al centro de guías
              </Button>
            </Link>
            <a
              href="https://wa.me/56935777727?text=Hola,%20tengo%20stock%20para%20envio%20inmediato%20en%20Chile%20y%20somos%20los%20unicos%20con%201.26m%20de%20largo.%20Vine%20del%20blog%20destacado%20y%20quiero%20validar%20compatibilidad%20de%20la%20guia%20de%20corte%20ProFix%20126."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full sm:w-auto border-2 border-naranja-600 text-naranja-700 hover:bg-naranja-50 py-6 px-8 rounded-xl text-lg shadow-md flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> Resolver duda por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Call to Action */}
      <section className="py-16 bg-naranja-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¡Mejora tus Proyectos con nuestra
            <br />
            Guía de Corte Recto{" "}
            <span className="text-black font-bold border-2 border-white px-2 rounded">
              ProFix 126
            </span>
            !
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Adquiere tu guía de corte recto en material de aluminio que posee un Ajuste Rápido{" "}
            <span className="text-gris-900 font-bold">"ProFix 126"</span>
            {" "}para sierra circular y llevarás tus habilidades al siguiente nivel. Esta guía de corte con herramientas eléctricas es perfecta para proyectos profesionales con herramientas inalámbricas y eléctricas.
          </p>
          <p className="text-base max-w-3xl mx-auto mb-8 text-naranja-50">
            Si llegaste buscando "guia de corte recto", "guia de corte para sierra circular" o incluso "tienes link",
            aqui puedes pasar directo a compra, producto o compatibilidad segun el punto en que estes de la decision.
          </p>
          <p className="mx-auto mb-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-lg font-bold">
            <span>{formatCLP(preciosProducto.precioEfectivo)} por unidad en efectivo o transferencia</span>
            <span className="font-semibold text-naranja-50">· {formatCLP(preciosProducto.precioTarjeta)} con tarjeta y factura</span>
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
            <a
              href="https://app.payku.cl/botonpago/index?qr=ku26722-verif-35a175cd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-naranja-700 font-bold py-6 px-8 text-lg rounded-lg"
              >
                Pedir link directo de compra
              </Button>
            </a>
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
