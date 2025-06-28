import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Check, Plus, Minus, ExternalLink } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import WhatsAppButton from "@/components/WhatsAppButton";

const producto = {
  _id: "profix-126",
  name: "Guía de Corte ProFix 126 | Sistema Ajustable para Cortes Rectos de 1.26m (Sierras Circulares, Routers y Fresadoras)",
  shortDescription: "Guía de Corte ProFix 126: La solución profesional para cortes rectos milimétricos hasta 1.26m. Compatible con sierras circulares, routers y fresadoras DeWalt, Makita y Bosch, Einhell, Ingco, Total, Skill, Ubermann, etc. ¡Precisión industrial en tu taller! ✔️ Garantía 6 meses.",
  description: `Precisión Industrial en Cada Corte: La Guía ProFix 126

Fabricada en aluminio aeronáutico grado 6061-T6 y reforzada con poliuretano ABS de alta densidad, la Guía ProFix 126 es el accesorio definitivo para talleres profesionales y carpinteros exigentes.

Beneficios Clave:
✔ Cortes rectos perfectos hasta 1.26 metros (el mayor rango del mercado chileno).
✔ Sistema Quick-Lock: Cambio entre herramientas en 15 segundos (sierras circulares, routers, fresadoras).
✔ Resistencia extrema: Soporta hasta 40 kg de presión sin perder sujeción.
✔ Precisión certificada: Margen de error de ±0.3 mm gracias a su escala láser calibrada.

No aceptes imitaciones: La única guía con garantía de por vida en mecanizado y 6 meses en componentes.`,
  longDescription: `¿Por Qué el 92% de los Carpinteros Profesionales en Chile Eligen la Guía ProFix 126?

Multiherramienta Profesional:

Para sierras circulares: Corta planchas de melamina, aglomerado o terciado sin rebabas.

Con routers/fresadoras: Ideal para ranurados rectos y acabados de precisión.

Uso como prensa: Ensambla muebles con presión uniforme (evita torceduras en marcos).

Compatibilidad Comprobada con:
🔧 Sierras Circulares: DeWalt DWE575, Makita HS7601, Bosch GKS 190.
🔧 Routers: Bosch GKF 600, Makita RT0700.
🔧 Fresadoras de Palma: Modelos con base plana estándar.

Especificaciones Técnicas:

Material: Aluminio aeronáutico + ABS de alta resistencia.

Peso: 1.4 kg (ajustable para transporte).

Escalas: Métrica e imperial con nonio de 0.1 mm.
`,
  cashPrice: 35000,
  cardPrice: 38990,
  features: [
    "Longitud máxima: 126 cm",
    "Cambio de herramienta en 15 segundos",
    "Precisión ±0.3 mm (certificado CNC)",
    "Portabilidad: solo 1.4 kg",
    "Material: ✓ Aluminio Aeronáutico: Resistente a flexiones y vibraciones",
    "✓ Quick-Lock: Ajuste rápido desde 0.5 cm hasta 126 cm.",
    "✓ Multiusos: Cortes, prensado y guía para ensamblaje.",
    "✓ Compatibilidad Universal: No se requieren adaptadores especiales para uso con DeWalt, Makita, Bosch.",
  ],
  specifications: [
    "Materiales Compatibles",
    "Maderas duras (roble, raulí, pino, etc)",
    "Tableros industriales (melamina, MDF, terciado, Trupan, volcanita (yeso carton)",
    "Materiales no ferrosos (aluminio, PVC, mármol artificial"
  ],
  images: [
  { url: "/guia-imagenes/profix-126-guia-corte-recto.webp", alt: "Guía de Corte ProFix 126 imagen principal" },
  { url: "/guia-imagenes/guia-corte-profix-126.webp", alt: "Guía de Corte ProFix 126 en uso" },
  { url: "/guia-imagenes/corte-sierra-circular-profix-126.webp", alt: "Detalle de corte con ProFix 126" },
  { url: "/guia-imagenes/ajuste-recto-profix-126.webp", alt: "Sistema de ajuste rápido ProFix 126" }
],
  keywords: [
    "carpintería", "herramienta", "aluminio", "corte recto", "melamina", "guía de corte", "profix 126", "guía de corte para sierra circular", "corte recto preciso 1.26 metros", "guía de aluminio para carpintería", "mejor guía de corte para router DeWalt", "guía de 1.26m para cortar melamina", "profix 126 vs guía festool", "cómo hacer cortes rectos con sierra circular", "guía profesional para fresadora de palma", "guía corte sierra circular Makita", "accesorio para router Bosch GKF 600", "guía ajustable para esmeril angular", "cortar melamina sin astillar", "guía para cortar terciado grueso", "corte preciso en MDF", "guía de corte más larga de Chile", "sistema quick-lock para cambio rápido", "garantía 3 años guía carpintería"
  ],
  paymentLink: "https://www.payku.cl/pagar/profix-126"
};



const productosExternos = [
  {
    nombre: "Terciado Melamina 15 mm bblanco brillante",
    imagen: "/guia-imagenes/terciado-melamina-15mm.webp",
    url: "https://www.terciamel.cl",
  },
  {
    nombre: "Carro Clasico desmontable eventos",
    imagen: "/guia-imagenes/carro-premium.webp",
    url: "https://www.carrosdesmontableschile.cl",
  },
  {
    nombre: "Meson desmontable Candy Bar - Snack",
    imagen: "/guia-imagenes/carro-candybar-desmontable.webp",
    url: "https://www.carrosdesmontableschile.cl",
  },
  {
    nombre: "Carro Premium Desmontable emprendimientos",
    imagen: "/guia-imagenes/carro-premium-desmontable.webp",
    url: "https://www.carrosdesmontableschile.cl",
  },
];

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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-red-600">Producto no encontrado</h1>
      </div>
    );
  }
  // Datos estructurados para SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: producto.name,
    image: producto.images.map((img) => img.url),
    description: producto.description,
    sku: producto._id,
    brand: {
      "@type": "Brand",
      name: "GuiaDeCorte",
    },
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
        <title>{producto.name} | Herramienta Profesional para Carpintería</title>
        <meta name="description" content={producto.description} />
        <meta name="keywords" content={producto.keywords.join(", ")} />
        <link rel="canonical" href={`https://www.guiadecorte.cl/producto/${producto._id}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imágenes del producto */}
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

          {/* Información del producto */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gris-900 mb-2">
  Guía de Corte ProFix 126
  <br />
  <span className="text-xl font-semibold block mt-1">
    Sistema Ajustable para Cortes Rectos de 1.26m (Sierras Circulares, Routers y Fresadoras)
  </span>
</h1>
            
<p className="text-base text-gris-600 mb-4">
  {producto.shortDescription}
</p>
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
    <span className="text-lg font-bold text-green-700">💰 Oferta Exclusiva Web:</span>
    <div className="mt-1">
      <span className="font-semibold text-black">
        ${formatPrice(producto.cashPrice)} (Efectivo/Transferencia)
      </span>
      <span className="text-green-700 font-bold ml-2">¡Ahorra $3.000!</span>
    </div>
    <div>
      <span className="font-semibold text-black">
        $38.000 (Tarjeta de Crédito)
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
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Características</h2>
              <ul className="list-disc pl-5">
                {producto.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Especificaciones</h2>
              <ul className="list-disc pl-5">
                {producto.specifications.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </div>







              </div> {/* <-- cierre de w-full md:w-1/2 */}


              
            </div> {/* <-- cierre de flex flex-col md:flex-row gap-8 */}
            {/* Descripción larga */}
<div className="mt-10 mb-8">
  <div className="text-2xl font-bold text-black mb-2">
    Precisión Industrial en Cada Corte:
  </div>
  <div className="text-lg text-gris-700">
    La Guía ProFix 126 fabricada en aluminio aeronáutico grado 6061-T6 y reforzada con poliuretano ABS de alta densidad, es el accesorio definitivo para talleres profesionales y carpinteros exigentes.
  </div>
</div>
<div className="mb-8">
  <span className="block font-bold text-black underline mb-2">Beneficios Clave:</span>
  <span className="block">
    <span className="text-green-600 font-bold">✔</span> Cortes rectos perfectos hasta 1.26 metros (el mayor rango del mercado chileno).
  </span>
  <span className="block">
    <span className="text-green-600 font-bold">✔</span> Sistema Quick-Lock: Cambio entre herramientas en 15 segundos (sierras circulares, routers, fresadoras).
  </span>
  <span className="block">
    <span className="text-green-600 font-bold">✔</span> Resistencia extrema: Soporta hasta 40 kg de presión sin perder sujeción.
  </span>
  <span className="block">
    <span className="text-green-600 font-bold">✔</span> Precisión certificada: Margen de error de ±0.3 mm gracias a su escala láser calibrada.
  </span>
  <span className="block mt-4">
    No aceptes imitaciones: La única guía con garantía de por vida en mecanizado y 6 meses en componentes.
  </span>
</div>

            {/* Comparativa ProFix vs Competencia */}
<section className="my-12">
  <h2 className="text-2xl font-bold mb-4 text-center">
    <span className="text-naranja-600 font-bold">¿Por Qué Comprar </span>
    <span className="text-black font-bold">ESTA Guía?</span>
  </h2>
  <p className="text-lg text-center mb-6">
    <span className="font-bold">La Revolución en Cortes Rectos:</span> Más Rápida, Más Larga, Más Robusta
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
              Guía Competencia
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
          <td className="py-2 px-4 font-semibold text-left">Longitud máxima</td>
          <td className="py-2 px-4 text-left">Hasta 80 cm</td>
          <td className="py-2 px-4 font-bold text-left">126 cm (única en Chile)</td>
        </tr>
        <tr>
          <td className="py-2 px-4 font-semibold text-left">Cambio de herramienta</td>
          <td className="py-2 px-4 text-left">4-8 min (recalibración)</td>
          <td className="py-2 px-4 font-bold text-left">15 segundos (Quick-Change)</td>
        </tr>
        <tr>
          <td className="py-2 px-4 font-semibold text-left">Material</td>
          <td className="py-2 px-4 text-left">Acero liviano/plástico</td>
          <td className="py-2 px-4 font-bold text-left">Aluminio aeronáutico (antiflexión)</td>
        </tr>
        <tr>
          <td className="py-2 px-4 font-semibold text-left">Precisión</td>
          <td className="py-2 px-4 text-left">±2 mm</td>
          <td className="py-2 px-4 font-bold text-left">±0.3 mm (certificado CNC)</td>
        </tr>
        <tr>
          <td className="py-2 px-4 font-semibold text-left">Portabilidad</td>
          <td className="py-2 px-4 text-left">2.1 kg</td>
          <td className="py-2 px-4 font-bold text-left">1.4 kg (diseño ajustable)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p className="mt-6 text-center text-lg">
  Invierte en un accesorio que no limitará tus proyectos: corta tableros completos, optimiza material y reduce desperdicios con la única guía chilena validada por carpinteros profesionales.
</p>
        </section>            
       { /* Compatibilidad con Herramientas y Marcas (Sección Técnica) */}
<section className="my-12">
  <h2 className="text-2xl font-bold mb-4 text-center">
    <span className="text-naranja-600 font-bold">Compatibilidad con Herramientas y Marcas</span>
    <span className="text-black font-bold"> (Sección Técnica)</span>
  </h2>
  <p className="text-lg text-center mb-6 font-semibold text-gris-900">
    Diseñada para Integrarse con Tu Taller: <span className="text-naranja-600">Sin Límites de Marca o Potencia</span>
  </p>
  <div className="bg-gris-50 rounded-lg shadow p-6 max-w-3xl mx-auto mb-6">
    <p className="mb-4 text-gris-800">
      Nuestra guía se adapta a cualquier herramienta eléctrica gracias a su sistema universal de anclaje <span className="font-bold">(incluye adaptadores para 4 sistemas)</span>. Funciona perfectamente con:
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <h3 className="font-bold text-naranja-600 mb-1">Sierras Circulares:</h3>
        <ul className="list-disc pl-5 text-gris-800">
          <li>DeWalt (DWE575, DCS565)</li>
          <li>Makita (HS7601)</li>
          <li>Bosch (GKS 190)</li>
          <li>Milwaukee (M18FCS)</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-naranja-600 mb-1">Routers/Fresadoras:</h3>
        <ul className="list-disc pl-5 text-gris-800">
          <li>Bosch (GKF 600)</li>
          <li>Makita (RT0700)</li>
          <li>DeWalt (DWE6000)</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-naranja-600 mb-1">Sierras Caladoras:</h3>
        <ul className="list-disc pl-5 text-gris-800">
          <li>Bosch (GST 150)</li>
          <li>Makita (Jv101Dz)</li>
          <li>Einhell (TE-JS 43)</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-naranja-600 mb-1">Esmeriles Angulares:</h3>
        <ul className="list-disc pl-5 text-gris-800">
          <li>Modelos de 115mm-125mm (Bosch GWS, Makita GA4530)</li>
        </ul>
      </div>
    </div>
    <div className="mb-4">
      <h3 className="font-bold text-naranja-600 mb-1">Requisitos técnicos:</h3>
      <ul className="list-disc pl-5 text-gris-800">
        <li>✔️ Herramientas alámbricas o inalámbricas (sin restricción de voltaje).</li>
        <li>✔️ Bases planas o con ranura T (no compatible con bases redondeadas).</li>
        <li>✔️ No requiere modificaciones: Acoplamiento en 3 pasos (apretar, calibrar, cortar).</li>
      </ul>
    </div>
    <p className="text-gris-900 text-center font-medium">
      ¿Tienes una marca no listada?{" "}
      <a
        href="/manuales/guia-profix126-manual.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-naranja-600 underline font-bold"
      >
        Descarga el manual
      </a>{" "}
      con medidas exactas de anclaje o contáctanos para confirmar compatibilidad al 100%.
    </p>
  </div>
</section>

        {/* Productos externos recomendados */}
<section className="mt-16 max-w-6xl mx-auto">
  <h2 className="text-2xl font-bold mb-6 text-center">También te podría interesar</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {productosExternos.map((prod, idx) => (
      <a
        key={idx}
        href={prod.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
      >
        <div className="aspect-video bg-white flex items-center justify-center overflow-hidden">
          <img
            src={prod.imagen}
            alt={`Imagen de ${prod.nombre} - Producto recomendado`}
            loading="lazy"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg">{prod.nombre}</h3>
          <span className="text-naranja-600 font-bold mt-2 block">
            Ver en tienda
          </span>
          <ExternalLink className="ml-1 h-4 w-4 inline" />
        </div>
      </a>
    ))}
  </div>
</section>

        <WhatsAppButton />

          </div> {/* <-- cierre de container mx-auto px-4 py-8 */}
        </>
      );
    };

export default Producto;