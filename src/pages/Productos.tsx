import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "@/api/sanityApi";
import { ExternalLink } from "lucide-react";
import { testimonials } from "@/components/TestimonialsCarousel";
import { Helmet } from "react-helmet-async";

type Product = {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  features?: string[];
  cashPrice: number;
  images: { asset: { url: string } }[];
  paymentLink?: string;
};

const productosExternos = [
  {
    nombre: "Carro eventos candybar",
    imagen: "/guia-imagenes/carro-candybar.webp",
    url: "https://www.carrosdesmontableschile.cl",
  },
  {
    nombre: "Terciado melamina 15 mm blanco brilante",
    imagen: "/guia-imagenes/terciado-melamina-15mm.webp",
    url: "https://www.ferreteria2.cl/producto/guia-universal",
  },
  {
    nombre: "Carro premium eventos",
    imagen: "/guia-imagenes/carro-premium-desmontable.webp",
    url: "https://www.carrosdesmontableschile.cl",
  },
  {
    nombre: "Meson desmontable premium",
    imagen: "/guia-imagenes/meson-premium.webp",
    url: "https://www.carrosdesmontableschile.cl",
  },
];

const Comparativa = () => (
  <section className="py-10 w-full">
    <div className="max-w-3xl mx-auto mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-naranja-700">
        ¿Por Qué Comprar <span className="text-gris-900">ESTA Guía?</span>
      </h2>
      <p className="text-center text-lg font-semibold mb-6">
        La Revolución en Cortes Rectos: Más Rápida, Más Larga, Más Robusta
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-naranja-600 text-white text-left">Característica</th>
              <th className="py-3 px-4 bg-gris-200 text-gris-700 text-left">Guía Competencia</th>
              <th className="py-3 px-4 bg-naranja-100 text-naranja-700 text-left">ProFix 126</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 font-semibold">Longitud máxima</td>
              <td className="py-2 px-4">Hasta 80 cm</td>
              <td className="py-2 px-4 font-bold">126 cm <span className="text-xs">(única en Chile)</span></td>
            </tr>
            <tr className="bg-gris-50">
              <td className="py-2 px-4 font-semibold">Cambio de herramienta</td>
              <td className="py-2 px-4">5-10 min (recalibración)</td>
              <td className="py-2 px-4 font-bold">15 segundos <span className="text-xs">(Quick-Change)</span></td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold">Material</td>
              <td className="py-2 px-4">Acero liviano/plástico</td>
              <td className="py-2 px-4 font-bold">Aluminio aeronáutico <span className="text-xs">(antiflexión)</span></td>
            </tr>
            <tr className="bg-gris-50">
              <td className="py-2 px-4 font-semibold">Precisión</td>
              <td className="py-2 px-4">±2 mm</td>
              <td className="py-2 px-4 font-bold">±0.3 mm <span className="text-xs">(certificado CNC)</span></td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold">Portabilidad</td>
              <td className="py-2 px-4">8 kg</td>
              <td className="py-2 px-4 font-bold">4.2 kg <span className="text-xs">(diseño plegable)</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-8 text-center text-base text-gris-800 font-semibold max-w-2xl mx-auto">
        Invierte en un accesorio que no limitará tus proyectos: corta tableros completos, optimiza material y reduce desperdicios con la única guía chilena validada por carpinteros industriales.
      </p>
    </div>
  </section>
);
const Compatibilidad = () => (
  <section className="py-10 w-full">
    <div className="max-w-3xl mx-auto mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-naranja-700">
        Compatibilidad con Herramientas y Marcas <span className="text-gris-900">(Sección Técnica)</span>
      </h2>
      <p className="text-center text-lg font-semibold mb-6">
        Diseñada para Integrarse con Tu Taller: Sin Límites de Marca o Potencia
      </p>
      <p className="text-gris-800 mb-6 text-center">
        Nuestra guía ProFix 126 se adapta a cualquier herramienta eléctrica gracias a su sistema universal que no depende de ningún tipo especial de anclaje. Funciona perfectamente con:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-bold text-naranja-700 mb-2">Sierras Circulares:</h3>
          <ul className="list-disc pl-5 text-gris-700">
            <li>DeWalt (DWE575, DCS565)</li>
            <li>Makita (HS7601)</li>
            <li>Bosch (GKS 190)</li>
            <li>Milwaukee (M18FCS)</li>
          </ul>
          <h3 className="font-bold text-naranja-700 mt-4 mb-2">Routers/Fresadoras:</h3>
          <ul className="list-disc pl-5 text-gris-700">
            <li>Tupi Bosch (GKF 600)</li>
            <li>Makita (RT0700)</li>
            <li>DeWalt (DWE6000)</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-naranja-700 mb-2">Sierras Caladoras:</h3>
          <ul className="list-disc pl-5 text-gris-700">
            <li>Bosch (GST 150)</li>
            <li>Makita (Jv101Dz)</li>
            <li>Einhell (TE-JS 43)</li>
          </ul>
          <h3 className="font-bold text-naranja-700 mt-4 mb-2">Esmeriles Angulares:</h3>
          <ul className="list-disc pl-5 text-gris-700">
            <li>Modelos de 115mm-125mm (Bosch GWS, Makita GA4530)</li>
          </ul>
        </div>
      </div>
      <h3 className="font-bold text-lg text-center mb-2 text-naranja-700">Requisitos técnicos:</h3>
      <ul className="list-none text-gris-800 text-center space-y-2">
        <li>✔️ Herramientas alámbricas o inalámbricas (sin restricción de voltaje).</li>
        <li>✔️ Bases planas o con ranura T (no compatible con bases redondeadas en caso de router de palma).</li>
        <li>✔️ No requiere modificaciones: Acoplamiento en 3 pasos (apretar, calibrar, cortar).</li>
      </ul>
    </div>
  </section>
);

const Productos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center py-8">Cargando productos...</p>;
  if (!products.length) return <p className="text-center py-8">No hay productos disponibles.</p>;

  // Si solo hay un producto, lo mostramos centrado y grande
  if (products.length === 1) {
    const product = products[0];

    // --- Schema.org para producto, reviews y aggregateRating ---
    const reviewsSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "image": product.images?.[0]?.asset?.url,
      "description": product.shortDescription,
      "brand": {
        "@type": "Organization",
        "name": "GuiaDeCorte.cl",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.guiadecorte.cl/guia-imagenes/guia-corte-logo.webp"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 5,
        "reviewCount": testimonials.length
      },
      "review": Array.isArray(testimonials) ? testimonials.map(t => ({
        "@type": "Review",
        "author": t.name,
        "reviewBody": t.comment,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": t.rating
        }
      })) : [],
      "offers": [
        {
          "@type": "Offer",
          "priceCurrency": "CLP",
          "price": 35000,
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": 35000,
            "priceCurrency": "CLP",
            "description": "Precio pagando en efectivo"
          }
        },
        {
          "@type": "Offer",
          "priceCurrency": "CLP",
          "price": 38990,
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": 38990,
            "priceCurrency": "CLP",
            "description": "Precio pagando con tarjeta"
          }
        }
      ]
    };

return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        {/* Datos estructurados schema.org para el producto */}
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(reviewsSchema)}
          </script>
        </Helmet>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">{product.name}</h1>
        <p className="text-lg text-gris-700 mb-6 text-center max-w-2xl">
          {product.shortDescription}
        </p>
        <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={product.images?.[0]?.asset?.url}
              alt={product.name}
              className="rounded-lg object-cover w-full max-w-xs md:max-w-sm shadow"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <p className="mb-4 text-gris-700">{product.longDescription}</p>
            {product.features && product.features.length > 0 && (
              <ul className="mb-4 list-disc pl-5 text-gris-800">
                {product.features.map((f, i) => (
                  <li key={i} className="mb-1">{f}</li>
                ))}
              </ul>
            )}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-naranja-600">
                ${product.cashPrice?.toLocaleString("es-CL")}
              </span>
            </div>
            <Link
              to={`/producto/${product._id}`}
              className="inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition"
            >
              Ver detalles y comprar
            </Link>
            {product.paymentLink && (
              <a
                href={product.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-green-700 transition mt-4"
              >
                Pagar con Payku
              </a>
            )}
          </div>
        </div>

        {/* Comparativa SIEMPRE visible */}
<Comparativa />
<Compatibilidad />

        <div className="max-w-2xl text-center mx-auto mb-12">
          <h2 className="text-xl font-bold mb-2">¿Por qué elegir la Guía de Corte Ajuste Rápido?</h2>
          <p className="text-gris-700">
            Esta guía ha sido diseñada para quienes buscan precisión, seguridad y rapidez en cada corte. 
            Su sistema de ajuste rápido permite adaptarla a distintos materiales y herramientas, 
            asegurando resultados profesionales incluso para quienes recién comienzan en el mundo de la carpintería.
            <br /><br />
            ¡No pierdas tiempo midiendo y corrigiendo! Con nuestra guía, cada corte es perfecto a la primera.
          </p>
        </div>

        {/* Sección de productos externos */}
        <section className="mt-16 w-full">
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
                    alt={prod.nombre}
                    loading="lazy"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{prod.nombre}</h3>
                  <span className="text-naranja-600 font-bold mt-2 block">
                    Ver en tienda <ExternalLink className="ml-1 h-4 w-4 inline" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Si hay más de un producto, usa la grilla tradicional
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Productos</h1>

      {/* Comparativa SIEMPRE visible */}
      <Comparativa />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img
              src={product.images?.[0]?.asset?.url}
              alt={product.name}
              className="rounded-lg object-cover w-full max-w-xs mb-4"
            />
            <h2 className="text-lg font-bold mb-2 text-center">{product.name}</h2>
            <p className="text-gris-700 mb-2 text-center">{product.shortDescription}</p>
            <span className="text-naranja-600 font-bold mb-2">
              ${product.cashPrice?.toLocaleString("es-CL")}
            </span>
            <Link
              to={`/producto/${product._id}`}
              className="inline-block bg-naranja-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-naranja-700 transition mb-2"
            >
              Ver detalles y comprar
            </Link>
            {product.paymentLink && (
              <a
                href={product.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-green-700 transition"
              >
                Pagar con Payku
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Sección de productos externos SIEMPRE visible */}
      <section className="mt-16 w-full">
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
                  alt={prod.nombre}
                  loading="lazy"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{prod.nombre}</h3>
                <span className="text-naranja-600 font-bold mt-2 block">
                  Ver en tienda <ExternalLink className="ml-1 h-4 w-4 inline" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Productos;