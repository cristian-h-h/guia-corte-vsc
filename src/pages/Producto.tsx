import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Check, MessageSquare, Minus, Plus, ShieldCheck, Store, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import {
  buildAggregateRating,
  buildBreadcrumbList,
  buildFAQPage,
  buildHowTo,
  buildReview,
  type FAQItem,
} from "@/utils/schema";
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
    title: "Corte de plancha de melamina de 1.22m de una sola pasada",
    scenario: "Mueblista en taller chico que antes cortaba por la mitad y re-unia.",
    alt: "Guia ProFix 126 cortando plancha de melamina de 1.22m de una sola vez en taller real",
    image: "/guia-imagenes/guia-corte-ajuste-rapido-terciamel.webp",
    detail:
      "El 1.26m le permite trabajar la plancha estandar sin cortes intermedios, evitando desviaciones y ahorrando tiempo.",
    badge: "Cliente real - RM",
  },
  {
    title: "Uso en sierra circular con base compatible y apoyo controlado",
    scenario: "Carpintero que usa sierra circular portatil en obra y taller.",
    alt: "Guia de corte ProFix 126 guiando una sierra circular con base compatible en taller real",
    image: "/guia-imagenes/corte-sierra-circular-profix-126.webp",
    detail:
      "Guia repetible y estable para piezas de rack, closet, muebles de melamina y tableros.",
    badge: "Cliente real - V Region",
  },
  {
    title: "Uso complementario con router en melamina y ranurados",
    scenario: "Taller que integra sierra circular y router en procesos de muebleria.",
    alt: "Guia ProFix 126 usada como apoyo complementario con router en melamina",
    image: "/guia-imagenes/guia-corte-router-terciamel.webp",
    detail:
      "Ranurados largos con referencia continua, previa validacion de la base y tipo de herramienta.",
    badge: "Cliente real - zona sur",
  },
  {
    title: "Fabricacion de carros, mesones y muebles con piezas largas",
    scenario: "Proyectos que necesitan varias piezas iguales con menos desperdicio.",
    alt: "Guia ProFix 126 en fabricacion de carros y mesones con piezas largas",
    image: "/guia-imagenes/carro-premium-desmontable.webp",
    detail:
      "Menos re-trabajo, mejor escuadra y mayor rapidez al preparar el corte vs regla casera.",
    badge: "Cliente real - RM",
  },
];

const producto = {
  _id: "profix-126",
  name: "Guía de Corte Recto ProFix 126",
  seoTitle: "Guía de Corte Sierra Circular 1.26m | ProFix 126 Chile",
  seoDescription:
    "Guía de corte recto ProFix 126 de 1.26m para sierra circular y herramientas con base compatible. Envío inmediato en Chile, ideal para melamina, MDF, terciado y madera con precisión profesional.",
  shortDescription:
    "Guia de corte recto de 1.26 metros para sierra circular, talleres, mueblistas, instaladores y aficionados avanzados que necesitan cortes rectos, repetibles y limpios sin depender de maquinaria grande.",
  overview:
    "ProFix 126 combina estructura de aluminio, ajuste rapido y una superficie de guiado pensada para trabajo real en carpinteria. Su mayor fortaleza es ayudarte a repetir medidas, reducir error humano y mantener el corte estable en piezas largas de melamina, MDF, terciado o madera.",
  cashPrice: 32000,
  cardPrice: 38990,
  keyPoints: [
    "Hasta 126 cm de capacidad de trabajo",
    "Aluminio aeronáutico 6061-T6",
    "Ajuste rápido para preparación del corte",
    "Peso aproximado de 1.4 kg",
    "Pensada para cortes rectos repetibles",
    "Compatibilidad sujeta al tipo de base y herramienta",
    "Uso estrella como guia de corte para sierra circular"
  ],
  materials: [
    "Melamina",
    "MDF",
    "Terciado",
    "Maderas blandas y duras",
    "Tableros de mueblería",
    "Otros materiales según herramienta y configuración"
  ],
  idealFor: [
    "Carpinteros y mueblistas que cortan tableros con frecuencia",
    "Talleres pequeños que necesitan precisión sin ocupar demasiado espacio",
    "Instaladores que requieren portabilidad para trabajar en obra",
    "Aficionados avanzados que buscan terminación profesional"
  ],
  compatibleTools: {
    primary: [
      "Sierra circular con base compatible",
      "Router y fresadora con apoyo plano compatible"
    ],
    secondary: [
      "Caladora para guiados rectos controlados",
      "Otras herramientas con base plana, previa validación"
    ]
  },
  images: [
    {
      url: "/guia-imagenes/profix-126-guia-corte-recto.webp",
      alt: "Guía de corte ProFix 126 preparada para cortes rectos de precisión"
    },
    {
      url: "/guia-imagenes/guia-corte-profix-126.webp",
      alt: "Guía de corte ProFix 126 en uso sobre tablero de carpintería"
    },
    {
      url: "/guia-imagenes/corte-sierra-circular-profix-126.webp",
      alt: "ProFix 126 guiando una sierra circular para un corte recto"
    },
    {
      url: "/guia-imagenes/ajuste-recto-profix-126.webp",
      alt: "Sistema de ajuste rápido de la guía de corte ProFix 126"
    }
  ],
  keywords: [
    "guía de corte recto",
    "guía de corte para sierra circular",
    "guía recta para sierra circular",
    "guía de aluminio para carpintería",
    "guía de aluminio para sierra circular",
    "guía de corte 1.26 metros",
    "guía de corte para melamina",
    "guía de corte para MDF",
    "guía corte madera",
    "guía de corte Ubermann",
    "profix 126",
    "guía para router",
    "accesorio para carpintería"
  ],
  paymentLink: "https://app.payku.cl/botonpago/index?qr=ku26722-verif-35a175cd",
  videos: [
    { href: "https://youtube.com/shorts/shIy8jqR0tE?feature=share", label: "Ver demostración de corte" },
    { href: "https://youtube.com/shorts/UHUVFCgoRSc?feature=share", label: "Ver ajuste rápido" },
    { href: "https://youtube.com/shorts/JDyfjvraM2I?feature=share", label: "Ver aplicaciones y usos" }
  ],
  mainUses: [
    {
      title: "Guia de corte para sierra circular en tableros",
      description:
        "Es el uso principal de la ProFix 126: ayudarte a cortar melamina, MDF, terciado y madera con una referencia mas estable, especialmente cuando trabajas piezas largas o repetidas.",
    },
    {
      title: "Guia recta para sierra circular en muebles e instalaciones",
      description:
        "Si fabricas muebles o trabajas en terreno, esta guia recta para sierra circular te ayuda a repetir medidas con mas control sin depender de una sierra de mesa grande.",
    },
    {
      title: "Guia de aluminio para trabajos repetibles",
      description:
        "La estructura de aluminio 6061-T6 entrega rigidez y portabilidad para quien compara una guia de aluminio para sierra circular y necesita algo mas confiable que una regla casera.",
    },
  ],
  mainBenefits: [
    "Reduce desperdicio cuando trabajas melamina, MDF, terciado o madera.",
    "Mejora la repetibilidad en cortes rectos para muebles, repisas y piezas largas.",
    "Aporta mas control visual y mecanico al usar sierra circular con guia de corte.",
    "Ayuda a ordenar el flujo de trabajo en taller pequeno, instalacion u obra.",
    "Permite validar compatibilidad responsable cuando vienes buscando Ubermann, Makita, Bosch o DeWalt.",
    "Acerca una terminacion mas limpia sin sobredimensionar la solucion.",
  ],
};

const Producto = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(producto.images[0].url);
  const { addToCart } = useCart();

  const precioEfectivo = preciosProducto.precioEfectivo;
  const precioTarjeta = preciosProducto.precioTarjeta;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id: producto._id,
      name: producto.name,
      price: precioEfectivo,
      priceCard: precioTarjeta,
      quantity: quantity,
      image: producto.images[0].url,
    });
    toast({
      title: "Producto agregado al carrito",
      description: `${quantity} x ${producto.name} · ${formatCLP(precioEfectivo)} c/u`,
    });
  };

    // Solo muestra el producto si el id es "profix-126"
  if (id !== "profix-126") {
    return (
      <>
        <Helmet>
          <title>Producto no encontrado | GuiaDeCorte.cl</title>
          <meta name="description" content="El producto que buscas no existe. Conoce nuestra Guía de Corte ProFix 126 para herramientas profesionales de carpintería." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Producto no encontrado</h1>
            <p className="text-gris-600 mb-8">
              Lo sentimos, el producto que buscas no existe o ha sido removido de nuestro catálogo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/producto/profix-126">
                <Button className="bg-herramienta-600 hover:bg-herramienta-700 text-white">
                  Ver Guía ProFix 126
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
  const productUrl = `https://www.guiadecorte.cl/producto/${producto._id}`;
  const productImages = producto.images.map((img) => `https://www.guiadecorte.cl${img.url}`);

  const breadcrumbProductSchema = buildBreadcrumbList([
    { name: "Inicio", url: "https://www.guiadecorte.cl/" },
    { name: "Producto", url: "https://www.guiadecorte.cl/producto" },
    { name: "ProFix 126", url: productUrl },
  ]);

  const productFaq: FAQItem[] = [
    {
      question: "¿Sirve para cortar madera, melamina, MDF o terciado?",
      answer: "Si. Esos son precisamente los escenarios donde la ProFix 126 suele marcar más diferencia por control, repetición de medidas y calidad de terminación al trabajar como guía de corte recto con sierra circular.",
    },
    {
      question: "¿Sirve con cualquier sierra circular?",
      answer: "No conviene prometer compatibilidad universal. La mejor recomendación depende de la base, el apoyo y el tipo de trabajo que quieres hacer; por eso validamos marca y modelo por WhatsApp antes de comprar.",
    },
    {
      question: "¿Puedo pedir el link directo de compra?",
      answer: "Si. Puedes comprar de inmediato o pedir el link por WhatsApp si primero quieres validar compatibilidad o envío en Chile.",
    },
    {
      question: "¿Vale la pena frente a una regla casera?",
      answer: "Cuando el trabajo exige repetir medidas, cuidar terminación y reducir desperdicio, una guía dedicada como la ProFix 126 de 1.26m suele justificar mucho mejor la inversión.",
    },
    {
      question: "¿Hacen envíos a todo Chile?",
      answer: "Se realizan envíos a domicilio tanto en Región Metropolitana como a cualquier región de Chile por Starken o Bluexpress, con stock inmediato.",
    },
    {
      question: "¿Cuál es el largo y el precio?",
      answer: `La ProFix 126 tiene 1.26m de longitud de trabajo. Precio por unidad: ${formatCLP(preciosProducto.precioEfectivo)} CLP pagando en efectivo o transferencia, y ${formatCLP(preciosProducto.precioTarjeta)} CLP con tarjeta y factura. Ideal para planchas estándar de 1.22m de una sola pasada.`,
    },
  ];
  const faqProductSchema = buildFAQPage(productFaq);

  const howtoProductSchema = buildHowTo({
    name: "Cómo usar la ProFix 126 en 5 pasos",
    description:
      "Pasos sencillos para usar la guía de corte recto ProFix 126 con sierra circular sobre planchas de melamina, MDF o terciado de 1.22m.",
    image: productImages[0],
    totalTime: "PT8M",
    estimatedCost: { currency: "CLP", value: String(preciosProducto.precioEfectivo) },
    supply: [
      { name: "Guía ProFix 126" },
      { name: "Plancha de melamina, MDF o madera" },
      { name: "Abrazaderas o pinzas de sujeción" },
    ],
    tool: [
      { name: "Sierra circular" },
      { name: "Cinta métrica y escuadra" },
    ],
    steps: [
      {
        name: "Paso 1 — Medir y marcar la referencia",
        text: "Marca la medida deseada sobre el tablero con cinta métrica y escuadra para confirmar el 90 grados y el punto de inicio del corte.",
        image: "https://www.guiadecorte.cl/guia-imagenes/ajuste-recto-profix-126.webp",
      },
      {
        name: "Paso 2 — Colocar la ProFix 126 sobre el material",
        text: "Apoya la guía ProFix 126 sobre la plancha alineando la referencia de corte con la marca hecha en el paso anterior.",
        image: "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
      },
      {
        name: "Paso 3 — Fijar con abrazaderas",
        text: "Usa abrazaderas en los extremos para que la guía no se desplace durante el pasada de la sierra circular, especialmente en cortes largos.",
        image: "https://www.guiadecorte.cl/guia-imagenes/terciado-melamina-blanco.webp",
      },
      {
        name: "Paso 4 — Pasar la sierra circular por la guía",
        text: "Desliza la sierra circular con base plana apoyada firmemente en la ProFix 126 de 1.26m a velocidad constante sin forzar el avance.",
        image: "https://www.guiadecorte.cl/guia-imagenes/corte-sierra-circular-profix-126.webp",
      },
      {
        name: "Paso 5 — Repetir piezas iguales",
        text: "Para repetición de piezas iguales, mantén la misma configuración y ajuste para sacar varias partes idénticas sin volver a medir.",
        image: "https://www.guiadecorte.cl/guia-imagenes/guia-corte-ajuste-rapido-terciamel.webp",
      },
    ],
  });

  const aggregateRating = buildAggregateRating({
    ratingValue: "4.9",
    reviewCount: "128",
    bestRating: "5",
    worstRating: "1",
  });

  const reviews = [
    buildReview({
      author: "Carlos, mueblista en RM",
      datePublished: "2026-06-12",
      name: "Excelente longitud de 1.26m para melamina de 1.22m",
      reviewBody:
        "La ProFix 126 me corta la plancha completa de una sola pasada. Antes lo hacía en dos partes y tenía que reencajar. Ahora repito piezas iguales sin errores de medición y con menos merma.",
      ratingValue: "5",
    }),
    buildReview({
      author: "Fabiola, instaladora de closets",
      datePublished: "2026-07-02",
      name: "Buena combinación sierra circular + base plana compatible",
      reviewBody:
        "Yo trabajo con Makita HS7600 y la base me calza perfecto. Lo más útil es llevarla de taller a obra sin perder rigidez. El precio $32.000 justifica por lo que ahorro en desperdicio.",
      ratingValue: "5",
    }),
  ];

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: producto.seoTitle,
    alternateName: "Guia de corte recto ProFix 126 para sierra circular",
    image: productImages,
    description: producto.seoDescription,
    keywords: producto.keywords.join(", "),
    sku: producto._id,
    mpn: "PROFIX-126",
    url: productUrl,
    category: "Guia de corte recto para sierra circular",
    material: "Aluminio 6061-T6",
    brand: {
      "@type": "Brand",
      name: "ProFix",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Longitud",
        value: "1.26 m",
      },
      {
        "@type": "PropertyValue",
        name: "Uso principal",
        value: "Guia de corte para sierra circular",
      },
      {
        "@type": "PropertyValue",
        name: "Materiales recomendados",
        value: "Melamina, MDF, terciado y madera",
      },
    ],
    aggregateRating,
    review: reviews,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "CLP",
      price: preciosProducto.precioEfectivo,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "GuiaDeCorte.cl",
      },
      areaServed: "CL",
    },
  };

  const structuredData: object[] = [
    productSchema,
    breadcrumbProductSchema,
    faqProductSchema,
    howtoProductSchema,
  ];

  return (
    <>
      <Helmet>
        <title>{producto.seoTitle} | GuiaDeCorte.cl</title>
        <meta name="description" content={producto.seoDescription} />
        <meta name="keywords" content={producto.keywords.join(", ")} />
        <link rel="canonical" href={productUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4 shadow-lg border-2 border-naranja-600">
              <img
                src={activeImage}
                loading="eager"
                fetchPriority="high"
                width={1000}
                height={1000}
                alt={producto.images.find(img => img.url === activeImage)?.alt || producto.name}
                className="object-cover w-full h-full"
              />
          </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {producto.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                    activeImage === image.url
                      ? "border-naranja-600 scale-105 shadow-lg"
                      : "border-transparent"
      }`}
          onClick={() => setActiveImage(image.url)}
          >
              <img
                src={image.url}
                alt={image.alt}
                loading="lazy"
                className="object-cover w-full h-full"
            />
          </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gris-900 mb-2">
              Guía de Corte ProFix 126
              <br />
              <span className="text-xl font-semibold block mt-1">
                Sistema de 1.26 m para sierra circular, router y herramientas con base compatible
              </span>
            </h1>

            <p className="text-base text-gris-600 mb-4">{producto.shortDescription}</p>
            <p className="text-gris-700 mb-6">{producto.overview}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="rounded-lg border border-gris-200 bg-gris-50 p-4">
                <h2 className="font-bold mb-2">Si llegaste buscando una guia de corte para sierra circular</h2>
                <p className="text-sm text-gris-700">
                  Esta es la aplicacion principal de la ProFix 126: ordenar cortes rectos y repetibles en tableros,
                  muebles y piezas largas con mejor control.
                </p>
              </div>
              <div className="rounded-lg border border-gris-200 bg-gris-50 p-4">
                <h2 className="font-bold mb-2">Si comparas una guia de aluminio</h2>
                <p className="text-sm text-gris-700">
                  Aqui importa la rigidez del cuerpo, la longitud de trabajo y el ajuste rapido para repetir referencias
                  sin perder tiempo entre corte y corte.
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border-2 border-naranja-500 bg-gradient-to-br from-naranja-50 via-white to-white p-5 shadow-lg">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gris-600">Precios por unidad</p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-naranja-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-naranja-700">Efectivo o transferencia</p>
                  <p className="text-3xl font-extrabold text-naranja-600">{formatCLP(preciosProducto.precioEfectivo)}</p>
                  <p className="text-sm text-gris-600">por unidad</p>
                </div>
                <div className="rounded-xl border border-herramienta-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-herramienta-700">Tarjeta y factura</p>
                  <p className="text-3xl font-extrabold text-herramienta-700">{formatCLP(preciosProducto.precioTarjeta)}</p>
                  <p className="text-sm text-gris-600">por unidad</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gris-700">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-herramienta-600" /> Envío a todo Chile mediante {preciosProducto.envioNacional}
                </span>
                <span className="inline-flex items-center gap-1.5">
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
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Button onClick={decrementQuantity} variant="outline" size="icon">
                <Minus />
              </Button>
              <span className="text-lg font-semibold">{quantity}</span>
              <Button onClick={incrementQuantity} variant="outline" size="icon">
                <Plus />
              </Button>
              <Button
                onClick={handleAddToCart}
                className="ml-4 py-4 px-8 text-xl font-bold flex items-center gap-3"
              >
                <Check className="mr-2 w-7 h-7" /> Agregar al carrito
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={producto.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-naranja-600 hover:bg-naranja-700 text-white w-full sm:w-auto">
                  Comprar ahora
                </Button>
              </a>
              <Link to="/contacto">
                <Button variant="outline" className="w-full sm:w-auto">Resolver dudas antes de comprar</Button>
              </Link>
              <a
                href="https://wa.me/56935777727?text=Hola,%20tengo%20stock%20para%20envio%20inmediato%20en%20Chile%20y%20somos%20los%20unicos%20con%201.26m%20de%20largo.%20Quiero%20el%20link%20de%20compra%20de%20la%20guia%20de%20corte%20ProFix%20126%20y%20validar%20compatibilidad%20con%20mi%20sierra%20circular."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full sm:w-auto">Pedir link por WhatsApp</Button>
              </a>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Puntos clave</h2>
              <ul className="list-disc pl-5">
                {producto.keyPoints.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gris-50 rounded-lg p-5 border border-gris-200">
              <h2 className="text-xl font-semibold mb-2">Compatibilidad responsable</h2>
              <p className="text-gris-700 mb-3">
                El uso principal recomendado es con <strong>sierra circular</strong>. Tambien puede trabajar con <strong>router</strong>,
                <strong> fresadora</strong> y otras herramientas de base compatible, pero la confirmacion final depende del modelo, la base y el tipo de apoyo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contacto">
                  <Button variant="outline">Confirmar compatibilidad</Button>
                </Link>
                <Link to="/guias/compatibilidad-por-marcas-frecuentes">
                  <Button variant="outline">Ver compatibilidad por marcas</Button>
                </Link>
                <Link to="/galeria">
                  <Button className="bg-herramienta-600 hover:bg-herramienta-700 text-white">Ver fotos y videos</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Que resuelve</h2>
            <p className="text-gris-700">
              ProFix 126 esta pensada para quienes necesitan guiar cortes rectos en tableros, repetir medidas con mas confianza
              y trabajar con mejor terminacion sin depender de una mesa de corte grande.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Ideal para</h2>
            <ul className="list-disc pl-5 text-gris-700 space-y-2">
              {producto.idealFor.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Materiales de trabajo</h2>
            <ul className="list-disc pl-5 text-gris-700 space-y-2">
              {producto.materials.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="my-12 bg-gris-50 border border-gris-200 rounded-xl p-6 md:p-8">
          <div className="max-w-4xl mb-8">
            <h2 className="text-3xl font-bold text-gris-900 mb-3">
              Principales usos de la <span className="text-naranja-600">guia de corte recto ProFix 126</span>
            </h2>
            <p className="text-gris-700 text-lg">
              Esta ficha no busca solo describir el producto. Busca responder para que sirve realmente una guia de corte
              para sierra circular, cuando una guia recta marca diferencia y por que una guia de aluminio como la ProFix 126
              puede ayudarte a cortar con mas precision, repeticion y confianza.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {producto.mainUses.map((use) => (
              <article key={use.title} className="bg-white rounded-lg border border-gris-200 p-5 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gris-900">{use.title}</h3>
                <p className="text-gris-700">{use.description}</p>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gris-200 p-5 shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-gris-900">Beneficios reales que obtienes</h3>
              <ul className="list-disc pl-5 text-gris-700 space-y-3">
                {producto.mainBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg border border-gris-200 p-5 shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-gris-900">Busquedas que esta pagina ataca mejor</h3>
              <p className="text-gris-700 mb-4">
                Aqui reforzamos consultas como <strong>guia de corte recto</strong>, <strong>guia de corte para sierra circular</strong>,
                <strong> guia recta para sierra circular</strong>, <strong>guia de aluminio para sierra circular</strong> y
                variantes ligadas a melamina, MDF, madera y compatibilidad por marca.
              </p>
              <div className="flex flex-wrap gap-2">
                {producto.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center rounded-full bg-naranja-50 px-3 py-1 text-sm text-naranja-700 border border-naranja-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="my-12 bg-white rounded-lg shadow p-6 max-w-5xl mx-auto border border-gris-200">
          <h2 className="text-2xl font-bold mb-4 text-center">Consultas reales que esta pagina responde mejor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gris-700">
            <div className="rounded-lg bg-gris-50 p-5 border border-gris-200">
              <h3 className="font-bold mb-2">Guia de corte recto y guia de corte</h3>
              <p>
                Esta ficha deja claro que la ProFix 126 no es una referencia improvisada: es una guia recta de aluminio
                pensada para cortes repetibles y mejor terminacion.
              </p>
            </div>
            <div className="rounded-lg bg-gris-50 p-5 border border-gris-200">
              <h3 className="font-bold mb-2">Guia de corte para sierra circular</h3>
              <p>
                El uso principal recomendado es con sierra circular. Por eso la pagina prioriza tableros, melamina, MDF,
                terciado y madera antes que promesas genericas.
              </p>
            </div>
            <div className="rounded-lg bg-gris-50 p-5 border border-gris-200">
              <h3 className="font-bold mb-2">Guia de aluminio para sierra circular</h3>
              <p>
                El cuerpo en aluminio 6061-T6 aporta rigidez y portabilidad para trabajo real en taller u obra cuando
                necesitas una referencia larga pero transportable.
              </p>
            </div>
            <div className="rounded-lg bg-gris-50 p-5 border border-gris-200">
              <h3 className="font-bold mb-2">Guia de corte Ubermann y otras marcas</h3>
              <p>
                Si llegaste por una marca especifica, el siguiente paso correcto no es adivinar: es revisar compatibilidad
                por base, modelo y tipo de trabajo.
              </p>
            </div>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Por que elegir <span className="text-naranja-600">ProFix 126</span>
          </h2>
          <p className="text-lg text-center mb-6 max-w-3xl mx-auto">
            El valor del sistema no esta solo en la longitud de 1.26m. Esta en combinar estabilidad, ajuste rapido y una forma de trabajo
            pensada para talleres, muebles a medida e instalaciones donde el tiempo y la precision importan. Con 1.26m cortas la plancha estandar
            de 1.22m de una sola vez, a diferencia de la mayoria de guias que quedan cortas.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-center">
                    <div className="bg-naranja-600 rounded-lg px-4 py-2 font-bold text-black text-center">
                      Característica
                    </div>
                  </th>
                  <th className="py-2 px-4 text-center">
                    <div className="bg-gris-200 rounded-lg px-4 py-2 font-bold text-black text-center">
                      Competencia estandar (Sodimac, Imperial, Kreg)
                    </div>
                  </th>
                  <th className="py-2 px-4 text-center">
                    <div className="bg-naranja-600 rounded-lg px-4 py-2 font-bold text-white text-center">
                      ProFix 126
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 font-semibold text-left">Largo total</td>
                  <td className="py-2 px-4 text-left">1.00 - 1.22m (insuficiente para planchas completas)</td>
                  <td className="py-2 px-4 font-bold text-left">1.26m, corta planchas de 1.22m de una sola vez</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold text-left">Material</td>
                  <td className="py-2 px-4 text-left">Plastico o aluminio delgado</td>
                  <td className="py-2 px-4 font-bold text-left">Aluminio aeronáutico 6061-T6, rigido y estable</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold text-left">Precio</td>
                  <td className="py-2 px-4 text-left">$43.990+ o $300.000+ en sistemas premium</td>
                  <td className="py-2 px-4 font-bold text-left">$32.000 efectivo o transferencia · $38.990 con tarjeta</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold text-left">Despacho</td>
                  <td className="py-2 px-4 text-left">Depende de stock regional o espera</td>
                  <td className="py-2 px-4 font-bold text-left">Stock para envio inmediato en Chile</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="my-12 bg-gris-50 rounded-lg shadow p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Compatibilidad con herramientas y marcas
          </h2>
          <p className="text-gris-800 mb-6 text-center">
            La recomendacion comercial principal es comunicar <strong>sierra circular</strong> como uso estrella.
            Router y fresadora funcionan muy bien cuando la base y el apoyo son compatibles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-naranja-600 mb-2">Uso principal recomendado</h3>
              <ul className="list-disc pl-5">
                {producto.compatibleTools.primary.map((tool, idx) => (
                  <li key={idx}>{tool}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-naranja-600 mb-2">Usos complementarios</h3>
              <ul className="list-disc pl-5">
                {producto.compatibleTools.secondary.map((tool, idx) => (
                  <li key={idx}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center text-gris-700">
            Si tienes una marca o modelo no listado, te conviene confirmar antes de comprar para asegurar el mejor acople posible.
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/guias/compatibilidad-por-modelo-de-herramienta" className="bg-white border border-gris-200 rounded-lg p-4 hover:border-herramienta-600 transition-colors">
              <h3 className="font-bold mb-2">Compatibilidad por modelo</h3>
              <p className="text-sm text-gris-700">Aprende que datos conviene enviar para validar tu herramienta antes de comprar.</p>
            </Link>
            <Link to="/guias/compatibilidad-por-marcas-frecuentes" className="bg-white border border-gris-200 rounded-lg p-4 hover:border-herramienta-600 transition-colors">
              <h3 className="font-bold mb-2">Marcas frecuentes</h3>
              <p className="text-sm text-gris-700">Makita, Bosch, DeWalt, Stanley, Skil, Einhell, Ingco, Ubermann y Milwaukee.</p>
            </Link>
            <Link to="/guias/guia-de-corte-para-router" className="bg-white border border-gris-200 rounded-lg p-4 hover:border-herramienta-600 transition-colors">
              <h3 className="font-bold mb-2">Uso con router</h3>
              <p className="text-sm text-gris-700">Revisa cuando tiene sentido y que conviene mirar antes de validarlo.</p>
            </Link>
          </div>
        </section>

        <section className="my-12 bg-white rounded-lg shadow p-6 max-w-5xl mx-auto border border-gris-200">
          <h2 className="text-2xl font-bold mb-4 text-center">Preguntas clave antes de comprar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article className="border border-gris-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">Sirve para cortar madera, melamina, MDF o terciado?</h3>
              <p className="text-gris-700">
                Si, esos son precisamente los escenarios donde una guia recta suele marcar mas diferencia por control,
                repeticion de medidas y calidad de terminacion.
              </p>
            </article>
            <article className="border border-gris-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">Sirve con cualquier sierra circular?</h3>
              <p className="text-gris-700">
                No conviene prometer compatibilidad universal. La mejor recomendacion depende de la base, el apoyo y el
                tipo de trabajo que quieres hacer.
              </p>
            </article>
            <article className="border border-gris-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">Puedo pedir el link directo de compra?</h3>
              <p className="text-gris-700">
                Si. Puedes comprar de inmediato o pedir el link por WhatsApp si primero quieres validar compatibilidad o envio.
              </p>
            </article>
            <article className="border border-gris-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">Vale la pena frente a una regla casera?</h3>
              <p className="text-gris-700">
                Cuando el trabajo exige repetir medidas, cuidar terminacion y reducir desperdicio, una guia dedicada suele
                justificar mucho mejor la inversion.
              </p>
            </article>
          </div>
        </section>

        <section className="my-12 bg-gradient-to-b from-madera-50 to-gris-50 border-y border-madera-200">
          <div className="max-w-6xl mx-auto px-4 py-12">
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
                      href="https://wa.me/56935777727?text=Hola,%20tengo%20stock%20para%20envio%20inmediato%20en%20Chile%20y%20somos%20los%20unicos%20con%201.26m%20de%20largo.%20Estoy%20en%20la%20ficha%20producto%20y%20quiero%20validar%20compatibilidad%20de%20la%20guia%20de%20corte%20ProFix%20126%20con%20mi%20herramienta."
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
                    Eliminamos el miedo a que <span className="text-naranja-600">no sea compatible</span> con tu herramienta.
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

        <section className="my-12 bg-gradient-to-b from-gris-50 to-white border-y border-gris-200">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-wide text-naranja-600 mb-3">
                Factor Humano - Talleres reales de Chile
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gris-900 mb-4">
                Uso real de la ProFix 126 en talleres, muebles y obra
              </h2>
              <p className="text-lg text-gris-700 leading-relaxed">
                No usamos solo fotos de catalogo. La guia se usa con sierra circular, melamina, MDF, terciado y tambien como apoyo complementario para router. Estos son escenarios reales de clientes que ya usan la ProFix 126 en Chile.
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
                href="https://wa.me/56935777727?text=Hola,%20tengo%20stock%20para%20envio%20inmediato%20en%20Chile%20y%20somos%20los%20unicos%20con%201.26m%20de%20largo.%20Estoy%20en%20la%20ficha%20producto%20y%20quiero%20comprar%20la%20guia%20de%20corte%20ProFix%20126%20despues%20de%20ver%20los%20usos%20reales."
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

        <section className="my-12 bg-madera-50 rounded-lg shadow p-6 max-w-5xl mx-auto border border-madera-200">
          <h2 className="text-2xl font-bold mb-4 text-center">Comparativas que ayudan a decidir mejor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/guias/profix-126-vs-regla-casera" className="bg-white border border-gris-200 rounded-lg p-5 hover:border-herramienta-600 transition-colors">
              <h3 className="font-bold text-lg mb-2">ProFix 126 vs regla casera</h3>
              <p className="text-gris-700">
                Ideal para quien ya corta con referencias improvisadas y quiere saber cuando una guia dedicada realmente vale la pena.
              </p>
            </Link>
            <Link to="/guias/sierra-circular-con-guia-vs-sierra-de-mesa" className="bg-white border border-gris-200 rounded-lg p-5 hover:border-herramienta-600 transition-colors">
              <h3 className="font-bold text-lg mb-2">Sierra circular con guia vs sierra de mesa</h3>
              <p className="text-gris-700">
                Buena ruta para talleres pequenos, instaladores y usuarios que comparan portabilidad, espacio y flujo real de trabajo.
              </p>
            </Link>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Videos de apoyo</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {producto.videos.map((video) => (
              <a
                key={video.href}
                href={video.href}
                className="inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {video.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Producto;
