
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Edit, Plus, Save, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

// Componentes de administración
import ProductAdmin from "@/components/admin/ProductAdmin";
import BlogAdmin from "@/components/admin/BlogAdmin";
import OrdersAdmin from "@/components/admin/OrdersAdmin";

const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Configuración de credenciales
    if (loginData.username === "asescont.cyl@gmail.com" && loginData.password === "Guias@1977") {
      setIsLoggedIn(true);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al panel de administración",
      });
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales incorrectas",
        variant: "destructive",
      });
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (resetEmail.trim() === "") {
      toast({
        title: "Error",
        description: "Por favor ingrese su correo electrónico",
        variant: "destructive",
      });
      return;
    }
    
    // Demo: En un sistema real, esto enviaría un correo electrónico
    toast({
      title: "Solicitud enviada",
      description: "Se ha enviado un correo con instrucciones para restablecer su contraseña",
    });
    setShowResetForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({
      username: "",
      password: "",
    });
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Panel de Administración</h1>
          
          {!showResetForm ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gris-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="username"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    required
                    className="w-full border border-gris-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-naranja-500 focus:border-naranja-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gris-700 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                    className="w-full border border-gris-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-naranja-500 focus:border-naranja-500"
                  />
                </div>
                
                <Button type="submit" className="btn-primary w-full">
                  Iniciar sesión
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setShowResetForm(true)}
                  className="text-naranja-600 hover:text-naranja-700 text-sm"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div>
                  <label htmlFor="resetEmail" className="block text-sm font-medium text-gris-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="resetEmail"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full border border-gris-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-naranja-500 focus:border-naranja-500"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowResetForm(false)} className="flex-1">
                    Volver
                  </Button>
                  <Button type="submit" className="flex-1">
                    Enviar
                  </Button>
                </div>
              </form>
              
              <div className="mt-4 text-center text-sm text-gris-500">
                <p>Se enviarán instrucciones para restablecer su contraseña.</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <Button variant="outline" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
      
      <Tabs defaultValue="products">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <ProductAdmin />
        </TabsContent>
        
        <TabsContent value="blog">
          <BlogAdmin />
        </TabsContent>
        
        <TabsContent value="orders">
          <OrdersAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
