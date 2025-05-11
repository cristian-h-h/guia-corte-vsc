import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Plus, Minus, ExternalLink } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Helmet } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";
import client from "@/sanityClient"; // Importa el cliente de Sanity

const Producto = () => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const { addToCart } = useCart();

  // Estado para el producto y productos relacionados
  const [productInfo, setProductInfo] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  // Función para cargar datos desde Sanity
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Obtén el producto principal
        const product = await client.fetch(
          `*[_type == "product" && _id == $id][0]{
            name,
            shortDescription,
            description,
            longDescription,
            cashPrice,
            cardPrice,
            features,
            specifications,
            "images": images[].asset->url,
            keywords
          }`,
          { id: "tu_producto_id" } // Reemplaza con el ID del producto
        );

        // Obtén productos relacionados
        const related = await client.fetch(
          `*[_type == "product" && _id != $id][0...4]{
            _id,
            name,
            cashPrice,
            "image": images[0].asset->url,
            "url": "/producto/" + _id
          }`,
          { id: "tu_producto_id" }
        );

        setProductInfo(product);
        setRelatedProducts(related);
        setActiveImage(product.images[0]); // Establece la primera imagen como activa
      } catch (error) {
        console.error("Error al cargar los datos del producto:", error);
      }
    };

    fetchProductData();
  }, []);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (productInfo) {
      addToCart({
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.cashPrice,
        priceCard: productInfo.cardPrice,
        quantity: quantity,
        image: productInfo.images[0],
      });

      toast({
        title: "Producto agregado al carrito",
        description: `${quantity} x ${productInfo.name}`,
      });
    }
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (!productInfo) {
    return <p className="text-center py-8">Cargando producto...</p>;
  }

  // Datos estructurados para SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productInfo.name,
    image: productInfo.images,
    description: productInfo.description,
    sku: "GC-AL-126",
    brand: {
      "@type": "Brand",
      name: "GuiaDeCorte",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.guiadecorte.cl/producto",
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
        <meta name="keywords" content={productInfo.keywords} />
        <link rel="canonical" href="https://www.guiadecorte.cl/producto" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imágenes del producto */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              <img
                src={activeImage}
                alt={`Guía de Corte Aluminio Ajuste Rápido - ${activeImage
                  .split("/")
                  .pop()
                  ?.split(".")[0]}`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {productInfo.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${
                    activeImage === image
                      ? "border-naranja-600"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(image)}
                >
                  <img
                    src={image}
                    alt={`Guía de Corte Aluminio - vista ${index + 1} para carpintería`}
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
            {/* Resto del contenido */}
          </div>
        </div>

        {/* Productos relacionados */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">También te podría interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-naranja-600 font-bold mt-2">
                    ${formatPrice(product.cashPrice)}
                  </p>
                  <a
                    href={product.url}
                    className="mt-3 inline-flex items-center text-naranja-600 hover:text-naranja-800 transition-colors"
                  >
                    Ver producto <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <WhatsAppButton />
      </div>
    </>
  );
};

export default Producto;
