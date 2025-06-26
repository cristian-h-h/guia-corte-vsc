import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Check, Plus, Minus, ExternalLink } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Helmet } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchProductById } from "@/api/sanityApi";

type Product = {
  _id: string;
  name: string;
  shortDescription: string;
  description: string;
  longDescription: string;
  cashPrice: number;
  cardPrice: number;
  features: string[];
  specifications: string[];
  images: { asset: { url: string } }[];
  keywords: string[];
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
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const { addToCart } = useCart();

  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const product = await fetchProductById(id);
        setProductInfo(product);
        setActiveImage(product?.images?.[0]?.asset?.url || "");
      } catch (error) {
        console.error("Error al cargar los datos del producto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (productInfo) {
      addToCart({
        id: productInfo._id,
        name: productInfo.name,
        price: productInfo.cashPrice,
        priceCard: productInfo.cardPrice,
        quantity: quantity,
        image: productInfo.images?.[0]?.asset?.url,
      });
      toast({
        title: "Producto agregado al carrito",
        description: `${quantity} x ${productInfo.name}`,
      });
    }
  };

  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (loading) {
    return <p className="text-center py-8">Cargando producto...</p>;
  }

  if (!productInfo) {
    return (
      <div className="text-center py-8 text-red-600">
        Producto no encontrado.
      </div>
    );
  }

  // Datos estructurados para SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productInfo.name,
    image: (productInfo.images || []).map((img) => img.asset.url),
    description: productInfo.description,
    sku: productInfo._id,
    brand: {
      "@type": "Brand",
      name: "GuiaDeCorte",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.guiadecorte.cl/producto/${productInfo._id}`,
      priceCurrency: "CLP",
      price: productInfo.cashPrice,
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
        <title>{productInfo.name} | Herramienta Profesional para Carpintería</title>
        <meta name="description" content={productInfo.description} />
        <meta name="keywords" content={productInfo.keywords?.join(", ")} />
        <link rel="canonical" href={`https://www.guiadecorte.cl/producto/${productInfo._id}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imágenes del producto */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              <img
                src={activeImage}
                loading="lazy"
                alt={`Guía de Corte Aluminio Ajuste Rápido`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {(productInfo.images || []).map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${
                    activeImage === image.asset.url
                      ? "border-naranja-600"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(image.asset.url)}
                >
                  <img
                    src={image.asset.url}
                    alt={`Guía de Corte Aluminio - vista ${index + 1}`}
                    loading="lazy"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gris-900 mb-2">{productInfo.name}</h1>
            <p className="text-lg text-gris-700 mb-4">{productInfo.shortDescription}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-naranja-600">
                ${formatPrice(productInfo.cashPrice)}
              </span>
              <span className="text-gris-500 line-through">
                ${formatPrice(productInfo.cardPrice)}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <Button onClick={decrementQuantity} variant="outline" size="icon">
                <Minus />
              </Button>
              <span className="text-lg font-semibold">{quantity}</span>
              <Button onClick={incrementQuantity} variant="outline" size="icon">
                <Plus />
              </Button>
              <Button onClick={handleAddToCart} className="ml-4">
                <Check className="mr-2 h-4 w-4" /> Agregar al carrito
              </Button>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Características</h2>
              <ul className="list-disc pl-5">
                {(productInfo.features || []).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Especificaciones</h2>
              <ul className="list-disc pl-5">
                {(productInfo.specifications || []).map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Productos externos recomendados */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">También te podría interesar</h2>
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
                    Ver en tienda
                  </span>
                  <ExternalLink className="ml-1 h-4 w-4 inline" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <WhatsAppButton />
      </div>
    </>
  );
};

export default Producto;
