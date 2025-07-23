import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import SkipLink from "@/components/SkipLink";

// Importar estilos de accesibilidad
import "@/styles/accessibility.css";

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
import Gracias from "./pages/gracias";
import PagoRechazado from "./pages/pagorechazado";
import Galeria from "./pages/Galeria";

const queryClient = new QueryClient();

// Interfaz para las propiedades del Layout
interface LayoutProps {
  children: React.ReactNode;
  showTestimonials?: boolean;
  title?: string;
  description?: string;
  image?: string;
}

const Layout = ({
  children,
  showTestimonials = false,
  title,
  description,
  image
}: LayoutProps) => (
  <>
    <ScrollToTop />
    <SkipLink />
    <Navbar />
    <main id="main-content" className="min-h-screen">
      {children}
      {showTestimonials && <TestimonialsCarousel />}
    </main>
    <Footer />
    <WhatsAppButton />
    <AccessibilityPanel />
  </>
);

// Importar el componente de vista previa del blog
import BlogPreview from "@/components/BlogPreview";

// Configuración del enrutador con Future Flags
const router = createBrowserRouter(
  [
    { path: "/", element: <Layout showTestimonials={true}><Index /></Layout> },
    { path: "/producto/:id", element: <Layout><Producto /></Layout> },
    { path: "/carrito", element: <Layout><Carrito /></Layout> },
    { path: "/blog", element: <Layout><Blog /></Layout> },
    { path: "/blog/:slug", element: <Layout><BlogPost /></Layout> },
    { path: "/blog-preview", element: <Layout><BlogPreview /></Layout> }, // <--- NUEVA RUTA DE VISTA PREVIA
    { path: "/contacto", element: <Layout><Contacto /></Layout> },
    { path: "/admin", element: <Layout><Admin /></Layout> },
    { path: "/producto", element: <Navigate to="/producto/profix-126" replace /> },
    //{ path: "/producto", element: <Layout><Producto /></Layout> },//
    { path: "/gracias", element: <Layout><Gracias /></Layout> },
    { path: "/pagorechazado", element: <Layout><PagoRechazado /></Layout> },
    { path: "/galeria", element: <Layout><Galeria /></Layout> },
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
          <AccessibilityProvider>
            <Toaster />
            <Sonner />
            <RouterProvider router={router} />
          </AccessibilityProvider>
        </HelmetProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
