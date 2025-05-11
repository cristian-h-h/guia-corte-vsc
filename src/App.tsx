import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";

// Layout Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Logo from "@/components/Logo"; // Importamos el componente Logo

// Pages
import Index from "./pages/Index";
import Producto from "./pages/Producto";
import Carrito from "./pages/Carrito";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contacto from "./pages/Contacto";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children, showTestimonials = false }: { children: React.ReactNode; showTestimonials?: boolean }) => (
  <>
    <Navbar>
      {/* Logo con efecto en el Navbar */}
      <div className="flex justify-center py-4">
        <Logo />
      </div>
    </Navbar>
    <main className="min-h-screen">
      {children}
      {showTestimonials && <TestimonialsCarousel />}
    </main>
    <Footer>
      {/* Logo con efecto en el Footer */}
      <div className="flex justify-center py-4">
        <Logo />
      </div>
    </Footer>
    <WhatsAppButton />
  </>
);

// Configuración del enrutador con Future Flags
const router = createBrowserRouter(
  [
    { path: "/", element: <Layout showTestimonials={true}><Index /></Layout> },
    { path: "/producto", element: <Layout><Producto /></Layout> },
    { path: "/carrito", element: <Layout><Carrito /></Layout> },
    { path: "/blog", element: <Layout><Blog /></Layout> },
    { path: "/blog/:id", element: <Layout><BlogPost /></Layout> },
    { path: "/contacto", element: <Layout><Contacto /></Layout> },
    { path: "/admin", element: <Layout><Admin /></Layout> },
    { path: "*", element: <Layout><NotFound /></Layout> },
  ],
  {
    future: {
      v7_startTransition: true, // Habilita React.startTransition para actualizaciones de estado
      v7_relativeSplatPath: true, // Cambia la resolución de rutas relativas en splat routes
    },
  }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <HelmetProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} />
        </HelmetProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
