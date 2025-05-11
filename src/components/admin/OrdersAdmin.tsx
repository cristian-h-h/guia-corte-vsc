
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Datos iniciales de pedidos (simulados)
const initialOrders = [
  {
    id: 1,
    date: "2024-05-05",
    customer: {
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "+56912345678"
    },
    items: [
      {
        id: 1,
        name: "Guía de Corte Aluminio Ajuste Rápido",
        quantity: 1,
        price: 29990
      }
    ],
    total: 29990,
    status: "pending", // pending, processing, shipped, delivered, cancelled
    paymentMethod: "cash" // cash, card
  },
  {
    id: 2,
    date: "2024-05-03",
    customer: {
      name: "María González",
      email: "maria@example.com",
      phone: "+56987654321"
    },
    items: [
      {
        id: 1,
        name: "Guía de Corte Aluminio Ajuste Rápido",
        quantity: 2,
        price: 32990
      }
    ],
    total: 65980,
    status: "shipped",
    paymentMethod: "card"
  }
];

const OrdersAdmin = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('es-CL', options);
  };

  const handleDeleteOrder = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
    toast({
      title: "Pedido eliminado",
      description: "El pedido ha sido eliminado correctamente.",
    });
  };

  const handleStatusChange = (id: number, status: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
    toast({
      title: "Estado actualizado",
      description: `El estado del pedido ha sido actualizado a: ${getStatusText(status)}`,
    });
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "pending": return "Pendiente";
      case "processing": return "En proceso";
      case "shipped": return "Enviado";
      case "delivered": return "Entregado";
      case "cancelled": return "Cancelado";
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gris-100 text-gris-800";
    }
  };

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestión de Pedidos</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gris-50 rounded-lg">
          <p className="text-gris-500">No hay pedidos disponibles</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gris-50">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Cliente</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-3"># {order.id}</td>
                  <td className="px-4 py-3">{formatDate(order.date)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-sm text-gris-500">{order.customer.email}</p>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Select
                      defaultValue={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className={`w-32 h-8 text-xs ${getStatusColor(order.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="processing">En proceso</SelectItem>
                        <SelectItem value="shipped">Enviado</SelectItem>
                        <SelectItem value="delivered">Entregado</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => viewOrderDetails(order)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleDeleteOrder(order.id)}
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

      {/* Diálogo de detalles del pedido */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles del Pedido #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gris-500 mb-1">Información del pedido</h3>
                <div className="bg-gris-50 p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gris-500">Fecha:</p>
                      <p>{formatDate(selectedOrder.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gris-500">Estado:</p>
                      <p className="capitalize">{getStatusText(selectedOrder.status)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gris-500">Método de pago:</p>
                      <p className="capitalize">{selectedOrder.paymentMethod === "cash" ? "Efectivo/Transferencia" : "Tarjeta/Factura"}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gris-500 mb-1">Cliente</h3>
                <div className="bg-gris-50 p-3 rounded-md">
                  <p><strong>Nombre:</strong> {selectedOrder.customer.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                  <p><strong>Teléfono:</strong> {selectedOrder.customer.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gris-500 mb-1">Productos</h3>
                <div className="bg-gris-50 p-3 rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-gris-500">
                        <th className="pb-2">Producto</th>
                        <th className="pb-2 text-center">Cantidad</th>
                        <th className="pb-2 text-right">Precio</th>
                        <th className="pb-2 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="border-t">
                      {selectedOrder.items.map((item: any, index: number) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-2">{item.name}</td>
                          <td className="py-2 text-center">{item.quantity}</td>
                          <td className="py-2 text-right">${item.price.toLocaleString()}</td>
                          <td className="py-2 text-right">${(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="pt-2 text-right font-medium">Total:</td>
                        <td className="pt-2 text-right font-bold">${selectedOrder.total.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  onClick={() => setDetailsOpen(false)}
                >
                  Cerrar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersAdmin;
