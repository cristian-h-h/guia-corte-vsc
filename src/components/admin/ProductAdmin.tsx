
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Edit, Plus, Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// Datos iniciales de productos (simulados)
const initialProducts = [
  {
    id: 1,
    name: "Guía de Corte Aluminio Ajuste Rápido",
    description: "Herramienta profesional para realizar cortes precisos en madera con sierra circular, caladora, router y otras herramientas de carpintería.",
    cashPrice: 35000,
    cardPrice: 38990,
    image: "/guia-imagenes/guia-corte-terciamel.png",
    stock: 25,
    paymentLink: "",
    // SEO fields
    seoTitle: "Guía de Corte Aluminio Ajuste Rápido - Herramienta Profesional",
    seoDescription: "Herramienta profesional para realizar cortes precisos en madera. Compatible con sierra circular, caladora y router. Envíos a todo Chile.",
    seoKeywords: "guía de corte, aluminio, carpintería, herramientas, cortes precisos",
    seoImgAlt: "Guía de Corte Aluminio Ajuste Rápido para carpintería profesional",
  }
];

// Lista de proveedores de pagos web
const paymentProviders = [
  { id: "mercadopago", name: "MercadoPago" },
  { id: "webpay", name: "Webpay Plus" },
  { id: "flow", name: "Flow" },
  { id: "khipu", name: "Khipu" },
  { id: "custom", name: "Personalizado" }
];

const ProductAdmin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>({
    id: 0,
    name: "",
    description: "",
    cashPrice: 0,
    cardPrice: 0,
    image: "",
    stock: 0,
    paymentLink: "",
    paymentProvider: "",
    // SEO fields
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    seoImgAlt: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === "cashPrice" || name === "cardPrice" || name === "stock" 
        ? Number(value) 
        : value
    });
  };

  const handleAddProduct = () => {
    setIsEditing(false);
    setCurrentProduct({
      id: Date.now(),
      name: "",
      description: "",
      cashPrice: 0,
      cardPrice: 0,
      image: "",
      stock: 0,
      paymentLink: "",
      paymentProvider: "",
      // SEO fields
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      seoImgAlt: "",
    });
    setDialogOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setIsEditing(true);
    setCurrentProduct({
      ...product,
      paymentProvider: product.paymentProvider || "",
      // Ensure SEO fields exist
      seoTitle: product.seoTitle || "",
      seoDescription: product.seoDescription || "",
      seoKeywords: product.seoKeywords || "",
      seoImgAlt: product.seoImgAlt || "",
    });
    setDialogOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado correctamente.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      setProducts(products.map(product => 
        product.id === currentProduct.id ? currentProduct : product
      ));
      toast({
        title: "Producto actualizado",
        description: "Los cambios han sido guardados correctamente.",
      });
    } else {
      setProducts([...products, currentProduct]);
      toast({
        title: "Producto añadido",
        description: "El nuevo producto ha sido añadido correctamente.",
      });
    }
    
    setDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestión de Productos</h2>
        <Button onClick={handleAddProduct} className="flex items-center gap-2">
          <Plus size={16} /> Añadir Producto
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-gris-50 rounded-lg">
          <p className="text-gris-500">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gris-50">
              <tr>
                <th className="px-4 py-3 text-left">Imagen</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-right">Precio Efectivo</th>
                <th className="px-4 py-3 text-right">Precio Tarjeta</th>
                <th className="px-4 py-3 text-right">Stock</th>
                <th className="px-4 py-3 text-center">Pago Web</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="w-16 h-16 rounded bg-gris-100 overflow-hidden">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.seoImgAlt || product.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gris-400">
                          Sin imagen
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gris-500 truncate max-w-xs">
                      {product.description}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right">${product.cashPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">${product.cardPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{product.stock}</td>
                  <td className="px-4 py-3 text-center">
                    {product.paymentLink ? (
                      <div className="flex items-center justify-center">
                        <LinkIcon size={16} className="text-naranja-600 mr-1" />
                        <span className="text-sm">Configurado</span>
                      </div>
                    ) : (
                      <span className="text-gris-400 text-sm">No configurado</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Producto" : "Añadir Producto"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="payment">Pagos Web</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gris-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={currentProduct.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gris-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cashPrice" className="block text-sm font-medium mb-1">
                      Precio Efectivo
                    </label>
                    <input
                      type="number"
                      id="cashPrice"
                      name="cashPrice"
                      value={currentProduct.cashPrice}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gris-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardPrice" className="block text-sm font-medium mb-1">
                      Precio Tarjeta
                    </label>
                    <input
                      type="number"
                      id="cardPrice"
                      name="cardPrice"
                      value={currentProduct.cardPrice}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gris-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium mb-1">
                      URL de la Imagen
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={currentProduct.image}
                      onChange={handleInputChange}
                      className="w-full border border-gris-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={currentProduct.stock}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gris-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-4">
                <div>
                  <label htmlFor="paymentProvider" className="block text-sm font-medium mb-1">
                    Proveedor de Pago
                  </label>
                  <select
                    id="paymentProvider"
                    name="paymentProvider"
                    value={currentProduct.paymentProvider}
                    onChange={handleInputChange}
                    className="w-full border border-gris-300 rounded-md px-3 py-2"
                  >
                    <option value="">Seleccione un proveedor</option>
                    {paymentProviders.map(provider => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="paymentLink" className="block text-sm font-medium mb-1">
                    Enlace de Pago
                  </label>
                  <input
                    type="text"
                    id="paymentLink"
                    name="paymentLink"
                    value={currentProduct.paymentLink}
                    onChange={handleInputChange}
                    placeholder="https://"
                    className="w-full border border-gris-300 rounded-md px-3 py-2"
                  />
                  <p className="text-sm text-gris-500 mt-1">
                    Ingrese el enlace proporcionado por su proveedor de pagos
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="seo" className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle" className="block text-sm font-medium mb-1">
                    Título SEO
                  </Label>
                  <Input
                    id="seoTitle"
                    name="seoTitle"
                    value={currentProduct.seoTitle}
                    onChange={handleInputChange}
                    placeholder="Título optimizado para motores de búsqueda"
                    className="w-full"
                  />
                  <p className="text-xs text-gris-500 mt-1">
                    Recomendado: 50-60 caracteres
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="seoDescription" className="block text-sm font-medium mb-1">
                    Descripción SEO
                  </Label>
                  <Textarea
                    id="seoDescription"
                    name="seoDescription"
                    value={currentProduct.seoDescription}
                    onChange={handleInputChange}
                    placeholder="Descripción breve y optimizada para motores de búsqueda"
                    rows={3}
                  />
                  <p className="text-xs text-gris-500 mt-1">
                    Recomendado: 150-160 caracteres
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="seoKeywords" className="block text-sm font-medium mb-1">
                    Palabras Clave
                  </Label>
                  <Input
                    id="seoKeywords"
                    name="seoKeywords"
                    value={currentProduct.seoKeywords}
                    onChange={handleInputChange}
                    placeholder="Ej: guía de corte, carpintería, herramientas"
                    className="w-full"
                  />
                  <p className="text-xs text-gris-500 mt-1">
                    Separe las palabras clave con comas
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="seoImgAlt" className="block text-sm font-medium mb-1">
                    Texto Alternativo de Imagen
                  </Label>
                  <Input
                    id="seoImgAlt"
                    name="seoImgAlt"
                    value={currentProduct.seoImgAlt}
                    onChange={handleInputChange}
                    placeholder="Descripción breve de la imagen del producto"
                    className="w-full"
                  />
                  <p className="text-xs text-gris-500 mt-1">
                    Importante para accesibilidad y SEO de imágenes
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductAdmin;
