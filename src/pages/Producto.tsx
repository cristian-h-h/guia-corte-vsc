import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Check, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";

const producto = {
  _id: "profix-126",
  name: "Guía de Corte Recto ProFix 126",
  seoTitle: "Guía de Corte Recto ProFix 126 para Sierra Circular | Guía de Aluminio 1.26 m",
  seoDescription:
    "ProFix 126 es una guía de corte recto de aluminio de 1.26 metros para sierra circular y herramientas con base compatible. Ideal para melamina, MDF, terciado y madera cuando buscas cortes rectos, repetibles y mejor terminación.",
  shortDescription:
    "Guia de corte recto de 1.26 metros para sierra circular, talleres, mueblistas, instaladores y aficionados avanzados que necesitan cortes rectos, repetibles y limpios sin depender de maquinaria grande.",
  overview:
    "ProFix 126 combina estructura de aluminio, ajuste rapido y una superficie de guiado pensada para trabajo real en carpinteria. Su mayor fortaleza es ayudarte a repetir medidas, reducir error humano y mantener el corte estable en piezas largas de melamina, MDF, terciado o madera.",
  cashPrice: 35000,
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
  paymentLink: "https://www.payku.cl/pagar/profix-126",
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

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id: producto._id,
      name: producto.name,
      price: producto.cashPrice,
      priceCard: producto.cardPrice,
      quantity: quantity,
      image: producto.images[0].url,
    });
    toast({
      title: "Producto agregado al carrito",
      description: `${quantity} x ${producto.name}`,
    });
  };

  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
  // Datos estructurados para SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: producto.seoTitle,
    alternateName: "Guia de corte recto ProFix 126 para sierra circular",
    image: producto.images.map((img) => `https://www.guiadecorte.cl${img.url}`),
    description: producto.seoDescription,
    keywords: producto.keywords.join(", "),
    sku: producto._id,
    mpn: "PROFIX-126",
    url: `https://www.guiadecorte.cl/producto/${producto._id}`,
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
    offers: {
      "@type": "Offer",
      url: `https://www.guiadecorte.cl/producto/${producto._id}`,
      priceCurrency: "CLP",
      price: producto.cashPrice,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Helmet>
        <title>{producto.seoTitle} | GuiaDeCorte.cl</title>
        <meta name="description" content={producto.seoDescription} />
        <meta name="keywords" content={producto.keywords.join(", ")} />
        <link rel="canonical" href={`https://www.guiadecorte.cl/producto/${producto._id}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4 shadow-lg border-2 border-naranja-600">
              <img
                src={activeImage}
                loading="lazy"
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

            <div className="mb-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-naranja-600">
                  ${formatPrice(producto.cashPrice)}
                </span>
                <span className="text-gris-500 line-through">
                  ${formatPrice(producto.cardPrice)}
                </span>
              </div>
              <div className="mt-2 bg-yellow-50 rounded px-3 py-2">
                <span className="text-lg font-bold text-green-700">Oferta web vigente</span>
                <div className="mt-1">
                  <span className="font-semibold text-black">
                    ${formatPrice(producto.cashPrice)} (efectivo o transferencia)
                  </span>
                  <span className="text-green-700 font-bold ml-2">Ahorras ${formatPrice(producto.cardPrice - producto.cashPrice)}</span>
                </div>
                <div>
                  <span className="font-semibold text-black">
                    ${formatPrice(producto.cardPrice)} (tarjeta)
                  </span>
                </div>
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
                href="https://wa.me/56935777727?text=Hola,%20quiero%20el%20link%20de%20compra%20de%20la%20guia%20de%20corte%20ProFix%20126%20y%20validar%20compatibilidad%20con%20mi%20sierra%20circular."
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
            El valor del sistema no esta solo en la longitud. Esta en combinar estabilidad, ajuste rapido y una forma de trabajo
            pensada para talleres, muebles a medida e instalaciones donde el tiempo y la precision importan.
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
                      Solución genérica
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
                  <td className="py-2 px-4 font-semibold text-left">Longitud de trabajo</td>
                  <td className="py-2 px-4 text-left">Limitada para piezas largas</td>
                  <td className="py-2 px-4 font-bold text-left">Hasta 126 cm</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold text-left">Preparación</td>
                  <td className="py-2 px-4 text-left">Ajustes lentos y repetitivos</td>
                  <td className="py-2 px-4 font-bold text-left">Ajuste rápido para preparar y repetir medidas</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold text-left">Rigidez del cuerpo</td>
                  <td className="py-2 px-4 text-left">Menor estabilidad en piezas largas</td>
                  <td className="py-2 px-4 font-bold text-left">Aluminio 6061-T6 para trabajo más estable</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold text-left">Portabilidad</td>
                  <td className="py-2 px-4 text-left">Mayor volumen o peso</td>
                  <td className="py-2 px-4 font-bold text-left">Aprox. 1.4 kg para taller y obra</td>
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
