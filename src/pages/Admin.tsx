
import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Edit, Plus, Save, ArrowRight, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { supabase } from "@/supabaseClient";

// Componentes de administración
import ProductAdmin from "@/components/admin/ProductAdmin";
import BlogAdmin from "@/components/admin/BlogAdmin";
import OrdersAdmin from "@/components/admin/OrdersAdmin";
import GalleryAdmin from "@/components/admin/GalleryAdmin";

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

  const [loading, setLoading] = useState(false);

  // Verificar si el usuario ya está autenticado al cargar la página
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Primero verificamos las credenciales locales
    if (loginData.username === "ventas@terciamel.cl" && loginData.password === "Guias@1977") {
      setIsLoggedIn(true);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al panel de administración",
      });
      setLoading(false);
      return;
    }

    try {
      // Si no coinciden con las credenciales locales, intentamos con Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.username,
        password: loginData.password,
      });

      if (error) {
        throw error;
      }

      setIsLoggedIn(true);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al panel de administración",
      });
    } catch (error: any) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message || "Credenciales incorrectas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (resetEmail.trim() === "") {
      toast({
        title: "Error",
        description: "Por favor ingrese su correo electrónico",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Enviar correo de restablecimiento de contraseña con Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: window.location.origin + '/admin',
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Solicitud enviada",
        description: "Se ha enviado un correo con instrucciones para restablecer su contraseña",
      });
      setShowResetForm(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo enviar el correo de restablecimiento",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setLoginData({
        username: "",
        password: "",
      });
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
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

                <Button type="submit" className="btn-primary w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    "Iniciar sesión"
                  )}
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
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar"
                    )}
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
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="gallery">Galería</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductAdmin />
        </TabsContent>

        <TabsContent value="blog">
          <BlogAdmin />
        </TabsContent>

        <TabsContent value="gallery">
          <GalleryAdmin />
        </TabsContent>
        
        <TabsContent value="orders">
          <OrdersAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
