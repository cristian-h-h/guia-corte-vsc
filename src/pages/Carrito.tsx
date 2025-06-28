import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight, Check, ShoppingCart, Store, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import ShippingForm, { ShippingFormData } from "@/components/ShippingForm";
import { createOrder } from "@/api/sanityApi";

const Carrito = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<"store" | "shipping">("store");
  const [shippingInfo, setShippingInfo] = useState<ShippingFormData>({
    nombre: "",
    apellido: "",
    rut: "",
    telefono: "",
    email: "",
    tipoEntrega: "domicilio",
    direccion: "",
    comuna: "",
    region: "",
    detalles: "",
  });

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getItemPrice = (item: any) => {
    return paymentMethod === "card" && item.priceCard 
      ? item.priceCard * item.quantity
      : item.price * item.quantity;
  };

  const handleShippingInfoComplete = (data: ShippingFormData) => {
    setShippingInfo(data);
    handleCheckout();
  };

  // INTEGRACIÓN CON SANITY
  const PAYKU_LINK = "https://app.payku.cl/botonpago/index?qr=ku26722-verif-35a175cd"; // Usa aquí tu link real de Payku

const handleCheckout = async () => {
  if (cartItems.length === 0) {
    toast({
      title: "Carrito vacío",
      description: "Agrega productos al carrito antes de continuar.",
      variant: "destructive",
    });
    return;
  }

  if (deliveryOption === "shipping") {
    if (!shippingInfo.nombre || !shippingInfo.email || !shippingInfo.telefono) {
      toast({
        title: "Información incompleta",
        description: "Por favor completa todos los campos requeridos del formulario de envío.",
        variant: "destructive",
      });
      return;
    }
  }

  try {
    await createOrder({
      date: new Date().toISOString(),
      customer: shippingInfo,
      tipoEntrega: deliveryOption === "shipping" ? "domicilio" : "retiro",
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: paymentMethod === "card" && item.priceCard ? item.priceCard : item.price,
      })),
      total: getCartTotal(paymentMethod),
      paymentMethod,
      paymentUrl: paymentMethod === "card" ? PAYKU_LINK : "",
    });
  } catch (error) {
    toast({
      title: "Error al guardar la orden",
      description: "Intenta nuevamente o contacta soporte.",
      variant: "destructive",
    });
    return;
  }

  setIsOrderPlaced(true);
  setIsDialogOpen(false);

  // Redirige a Payku si el método es tarjeta
  if (paymentMethod === "card") {
    clearCart();
    window.location.href = PAYKU_LINK;
    return;
  }

  toast({
    title: "Pedido realizado con éxito",
    description: deliveryOption === "shipping" 
      ? "Te contactaremos pronto para coordinar la entrega."
      : "Te contactaremos para coordinar el retiro en tienda.",
  });
  clearCart();
};

  if (isOrderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
        <p className="mb-2 max-w-md mx-auto text-gris-600">
          Hemos recibido tu pedido. Te contactaremos pronto para coordinar los detalles de pago 
          {deliveryOption === "shipping" ? " y entrega." : " y retiro en tienda."}
        </p>
        <p className="mb-6 max-w-md mx-auto text-gris-600">
          <strong>Nombre:</strong> {deliveryOption === "shipping" ? `${shippingInfo.nombre} ${shippingInfo.apellido}` : "A confirmar"}<br />
          <strong>Email:</strong> {deliveryOption === "shipping" ? shippingInfo.email : "A confirmar"}<br />
          <strong>Teléfono:</strong> {deliveryOption === "shipping" ? shippingInfo.telefono : "A confirmar"}<br />
          <strong>Tipo de entrega:</strong> {deliveryOption === "shipping" ? "Envío" : "Retiro en tienda"}<br />
          {deliveryOption === "shipping" && (
            <>
              {shippingInfo.tipoEntrega === "domicilio" && (
                <>
                  <strong>Dirección:</strong> {shippingInfo.direccion}<br />
                </>
              )}
              <strong>Comuna:</strong> {shippingInfo.comuna}<br />
              <strong>Región:</strong> {shippingInfo.region}<br />
              {shippingInfo.detalles && (
                <>
                  <strong>Detalles adicionales:</strong> {shippingInfo.detalles}<br />
                </>
              )}
            </>
          )}
          <strong>Método de pago:</strong> {paymentMethod === "cash" ? "Efectivo" : "Tarjetas/Factura"}<br />
          <strong>Total:</strong> ${formatPrice(getCartTotal(paymentMethod))}
        </p>
        <Link to="/">
          <Button>Volver a la página principal</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gris-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-10 w-10 text-gris-400" />
          </div>
          <h2 className="text-2xl font-medium mb-4">Tu carrito está vacío</h2>
          <p className="text-gris-600 mb-6">
            Parece que aún no has agregado productos a tu carrito.
          </p>
          <Link to="/producto/profix-126">
            <Button>Ver productos</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Productos en el carrito */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gris-50 border-b">
                <div className="col-span-6">Producto</div>
                <div className="col-span-2 text-center">Precio</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-2 text-center">Subtotal</div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center">
                  <div className="col-span-6 flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm flex items-center mt-2 hover:text-red-700"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <div className="md:hidden text-sm text-gris-500 mb-1">Precio:</div>
                    ${formatPrice(paymentMethod === "card" && item.priceCard ? item.priceCard : item.price)}
                  </div>
                  
                  <div className="col-span-2">
                    <div className="md:hidden text-sm text-gris-500 mb-1">Cantidad:</div>
                    <div className="flex items-center justify-center border rounded-md w-24 mx-auto">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 py-1 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center font-medium">
                    <div className="md:hidden text-sm text-gris-500 mb-1">Subtotal:</div>
                    ${formatPrice(getItemPrice(item))}
                  </div>
                </div>
              ))}
              
              <div className="p-4 flex justify-between">
                <button
                  onClick={clearCart}
                  className="text-gris-500 hover:text-gris-700"
                >
                  Vaciar carrito
                </button>
                <Link to="/producto/profix-126" className="text-naranja-600 hover:text-naranja-700 flex items-center">
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
              
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${formatPrice(getCartTotal(paymentMethod))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>A coordinar</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold mb-4">
                <span>Total</span>
                <span>${formatPrice(getCartTotal(paymentMethod))}</span>
              </div>
              
              {/* Opciones de entrega */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Opción de entrega:</h3>
                <div className="flex flex-col gap-3 mb-4">
                  <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                    <input 
                      type="radio" 
                      name="deliveryOption" 
                      checked={deliveryOption === "store"} 
                      onChange={() => setDeliveryOption("store")}
                      className="form-radio text-naranja-600"
                    />
                    <Store size={18} className="text-naranja-600" />
                    <div>
                      <p className="font-medium">Retiro en tienda</p>
                      <p className="text-sm text-gray-500">Retira tu pedido directamente en nuestra tienda</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                    <input 
                      type="radio" 
                      name="deliveryOption" 
                      checked={deliveryOption === "shipping"} 
                      onChange={() => setDeliveryOption("shipping")}
                      className="form-radio text-naranja-600"
                    />
                    <Truck size={18} className="text-naranja-600" />
                    <div>
                      <p className="font-medium">Envío a domicilio</p>
                      <p className="text-sm text-gray-500">Recibe tu pedido donde indiques</p>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Formulario de envío si está seleccionada la opción de envío */}
              {deliveryOption === "shipping" && (
                <div className="mb-6">
                  <ShippingForm 
                    onComplete={setShippingInfo}
                    initialData={shippingInfo}
                    showSubmitButton={false}
                  />
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-medium mb-2">Método de pago:</h3>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === "cash"} 
                      onChange={() => setPaymentMethod("cash")}
                      className="form-radio text-naranja-600"
                    />
                    <span>Efectivo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === "card"} 
                      onChange={() => setPaymentMethod("card")}
                      className="form-radio text-naranja-600"
                    />
                    <span>Tarjetas/Factura</span>
                  </label>
                </div>
                <div className="text-sm bg-gris-50 p-3 rounded-md">
                  {paymentMethod === "card" ? (
                    <p>Precio con tarjetas/factura incluye recargo del 10% por impuestos.</p>
                  ) : (
                    <p>Precio con efectivo tiene descuento por pago inmediato.</p>
                  )}
                </div>
              </div>
              
              <Button 
                className="w-full flex items-center justify-center gap-2"
                onClick={deliveryOption === "store" ? handleCheckout : () => setIsDialogOpen(true)}
              >
                Finalizar compra <ArrowRight size={18} />
              </Button>
              
              {/* Dialog para confirmar compra con envío */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Confirmar pedido</DialogTitle>
                    <DialogDescription>
                      Verifica que todos los datos sean correctos antes de finalizar.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <h3 className="font-medium mb-2">Resumen del pedido:</h3>
                    <p><strong>Total:</strong> ${formatPrice(getCartTotal(paymentMethod))}</p>
                    <p><strong>Método de pago:</strong> {paymentMethod === "cash" ? "Efectivo" : "Tarjetas/Factura"}</p>
                    <p><strong>Tipo de entrega:</strong> Envío a domicilio</p>
                    
                    {shippingInfo.nombre && (
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Información de envío:</h3>
                        <p>{shippingInfo.nombre} {shippingInfo.apellido}</p>
                        <p>{shippingInfo.email}</p>
                        <p>{shippingInfo.telefono}</p>
                        {shippingInfo.tipoEntrega === "domicilio" && <p>{shippingInfo.direccion}</p>}
                        <p>{shippingInfo.comuna}, {shippingInfo.region}</p>
                      </div>
                    )}
                  </div>
                  
                  <DialogFooter>
                    <Button onClick={() => setIsDialogOpen(false)} variant="outline">
                      Cancelar
                    </Button>
                    <Button onClick={handleCheckout}>
                      Confirmar compra
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
