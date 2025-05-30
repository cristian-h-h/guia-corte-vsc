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
import Productos from "./pages/Productos";
import Gracias from "./pages/gracias";
import PagoRechazado from "./pages/pagorechazado";

const queryClient = new QueryClient();

const Layout = ({ children, showTestimonials = false }: { children: React.ReactNode; showTestimonials?: boolean }) => (
  <>
    <Navbar />
    <main className="min-h-screen">
      {children}
      {showTestimonials && <TestimonialsCarousel />}
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

// Configuración del enrutador con Future Flags
const router = createBrowserRouter(
  [
    { path: "/", element: <Layout showTestimonials={true}><Index /></Layout> },
    { path: "/producto/:id", element: <Layout><Producto /></Layout> },
    { path: "/carrito", element: <Layout><Carrito /></Layout> },
    { path: "/blog", element: <Layout><Blog /></Layout> },
    { path: "/blog/:slug", element: <Layout><BlogPost /></Layout> }, // <--- CAMBIO AQUÍ
    { path: "/contacto", element: <Layout><Contacto /></Layout> },
    { path: "/admin", element: <Layout><Admin /></Layout> },
    { path: "/producto", element: <Layout><Productos /></Layout> },
    { path: "/producto/:id", element: <Layout><Producto /></Layout> },
    { path: "/gracias", element: <Layout><Gracias /></Layout> }, // <--- NUEVA RUTA
    { path: "/pagorechazado", element: <Layout><PagoRechazado /></Layout> }, // <--- NUEVA RUTA
    { path: "*", element: <Layout><NotFound /></Layout> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
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
