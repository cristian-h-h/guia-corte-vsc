import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Plus, Minus, ExternalLink } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Helmet } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";

const Producto = () => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("/guia-imagenes/guia-corte-terciamel.png");
  const { addToCart } = useCart();

  const productInfo = {
    id: 1,
    name: "Guía de Corte Aluminio Ajuste Rápido Profesional",
    shortDescription: "Herramienta profesional para carpintería y bricolaje",
    description: "Herramienta profesional de alta precisión para realizar cortes perfectos en madera con sierra circular, caladora, router y otras herramientas de carpintería. Con capacidad de corte hasta 1,26 metros, ideal para trabajos profesionales y bricolaje.",
    longDescription: "La Guía de Corte Aluminio Ajuste Rápido es la herramienta definitiva para carpinteros profesionales y aficionados exigentes. Fabricada con aluminio de alta resistencia, permite realizar cortes perfectamente rectos y precisos con diversas herramientas eléctricas como sierra circular, caladora, router, tupí y fresadora. Su sistema patentado de ajuste rápido te permite configurarla en segundos sin herramientas adicionales, ahorrándote tiempo valioso en tus proyectos. Con una capacidad de corte de hasta 1,26 metros, es perfecta para trabajar con tableros grandes y realizar proyectos de ebanistería profesional.",
    cashPrice: 35000,
    cardPrice: 38990,
    features: [
      "Compatible con múltiples herramientas de carpintería: sierra circular, caladora, router",
      "Longitud máxima de corte: 1,26 metros para proyectos grandes",
      "Sistema patentado de ajuste rápido sin herramientas adicionales",
      "Fabricada en aluminio anodizado de alta resistencia y durabilidad",
      "Doble función: guía de corte precisa y prensa para armado de muebles",
      "Diseño ergonómico y liviano para fácil manejo y transporte",
      "Garantía profesional de 1 año contra defectos de fabricación"
    ],
    specifications: {
      "Material": "Aluminio anodizado de alta resistencia industrial",
      "Longitud": "1,26 metros para proyectos de gran formato",
      "Ancho del perfil": "44mm para máxima estabilidad",
      "Alto del perfil": "20mm para rigidez estructural",
      "Peso": "880g para fácil manipulación",
      "Capacidad de corte": "Hasta 1,26 metros en línea recta perfecta",
      "Compatible con": "Sierra circular, caladora, router, tupí, fresadora y herramientas manuales",
      "Función adicional": "Prensa profesional para armado de muebles y ensamblajes"
    },
    images: [
      "/guia-imagenes/guia-corte-terciamel.png",
      "/guia-imagenes/guia-corte-recto-terciamel.png",
      "/guia-imagenes/guia-corte-sierra-circular-terciamel.png",
      "/guia-imagenes/guia-corte-ajustable-terciamel.png",
      "/guia-imagenes/guia-corte-ajuste-rapido-terciamel.png",
      "/guia-imagenes/guia-corte-router-terciamel.png"
    ],
    keywords: "guía de corte aluminio, herramienta carpintería, sierra circular, caladora, router, cortes precisos, bricolaje, ebanistería"
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Carros y mesones desmontables",
      price: 165000,
      image: "/guia-imagenes/carro-premium-desmontable.png",
      url: "http://carrosdesmontableschile.cl"
    },
    {
      id: 3,
      name: "Carros y mesones Candybar",
      price: 265000,
      image: "/guia-imagenes/carro-candybar-desmontable.png",
      url: "http://carrosdesmontableschile.cl"
    },
    {
      id: 4,
      name: "Terciado Melamina 15 mm",
      price: 53000,
      image: "/guia-imagenes/terciado-melamina-blanco.png",
      url: "https://terciamel.cl"
    },
    {
      id: 5,
      name: "Terciado Melamina Blanco Brillante",
      price: 53000,
      image: "/guia-imagenes/terciado-melamina-15mm.png",
      url: "https://terciamel.cl"
    }
  ];

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart({
      id: productInfo.id,
      name: productInfo.name,
      price: productInfo.cashPrice,
      priceCard: productInfo.cardPrice,
      quantity: quantity,
      image: productInfo.images[0]
    });
    
    toast({
      title: "Producto agregado al carrito",
      description: `${quantity} x ${productInfo.name}`,
    });
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  // Datos estructurados para SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productInfo.name,
    "image": productInfo.images,
    "description": productInfo.description,
    "sku": "GC-AL-126",
    "brand": {
      "@type": "Brand",
      "name": "GuiaDeCorte"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.guiadecorte.cl/producto",
      "priceCurrency": "CLP",
      "price": productInfo.cashPrice,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <Helmet>
        <title>Guía de Corte Aluminio Ajuste Rápido | Herramienta Profesional para Carpintería</title>
        <meta name="description" content="Guía de corte aluminio profesional con ajuste rápido para sierra circular, caladora y router. Longitud de 1,26 metros. Ideal para carpintería y bricolaje." />
        <meta name="keywords" content={productInfo.keywords} />
        <link rel="canonical" href="https://www.guiadecorte.cl/producto" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
    
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imágenes del producto */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              <img 
                src={activeImage} 
                alt={`Guía de Corte Aluminio Ajuste Rápido - ${activeImage.split('/').pop()?.split('.')[0]}`} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {productInfo.images.map((image, index) => (
                <div 
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer
                    ${activeImage === image ? 'border-naranja-600' : 'border-transparent'}`}
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
            
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-naranja-600">
                  ${formatPrice(productInfo.cashPrice)}
                </span>
                <span className="text-sm bg-naranja-600 text-white px-2 py-1 rounded">
                  Efectivo / Transferencia
                </span>
              </div>
              <div className="mt-2">
                <span className="text-lg text-gris-600">
                  ${formatPrice(productInfo.cardPrice)} con tarjeta/factura
                </span>
              </div>
            </div>
            
            <p className="text-gris-700 mb-6">
              {productInfo.description}
            </p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Características principales:</h3>
              <ul className="space-y-2">
                {productInfo.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-naranja-600 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-b py-4 my-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 border-r"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 border-l"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <span className="text-gris-600">
                  Stock disponible
                </span>
              </div>
              
              <Button
                className="btn-primary w-full flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                Añadir al carrito de compra
              </Button>
            </div>
            
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="details">Detalles del producto</TabsTrigger>
                <TabsTrigger value="specs">Especificaciones técnicas</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 mt-4">
                <div>
                  <h3 className="font-bold mb-2">Descripción detallada de la guía de corte</h3>
                  <p>
                    {productInfo.longDescription}
                  </p>
                  <p className="mt-2">
                    Con una longitud de hasta 1,26 metros, nuestra guía de corte aluminio es perfecta para trabajar con tableros grandes y realizar cortes extensos con precisión profesional. 
                    Su sistema de ajuste rápido permite configurarla en segundos sin necesidad de herramientas adicionales, 
                    ahorrándote tiempo valioso en tus proyectos de carpintería y bricolaje.
                  </p>
                  <p className="mt-2">
                    Además de ser una excelente guía de corte para herramientas eléctricas, también funciona como prensa profesional para el armado de muebles, 
                    brindándote versatilidad en un solo producto. Su diseño ergonómico y liviano facilita su manejo y 
                    almacenamiento, mientras que su construcción en aluminio anodizado asegura durabilidad y resistencia a lo largo del tiempo en tu taller.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="specs" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(productInfo.specifications).map(([key, value], index) => (
                    <div key={index} className="border-b pb-2">
                      <span className="font-medium text-gris-900">{key}:</span> <span className="text-gris-700">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Productos relacionados */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">También te podría interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-naranja-600 font-bold mt-2">${formatPrice(product.price)}</p>
                  <a 
                    href={product.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
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
