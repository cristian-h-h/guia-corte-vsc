import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate, type RouteObject } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import SkipLink from "@/components/SkipLink";

// Importar estilos de accesibilidad
import "@/styles/accessibility.css";

// Layout Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const TestimonialsCarousel = lazy(() => import("@/components/TestimonialsCarousel").then((module) => ({ default: module.default })));
const AccessibilityPanel = lazy(() => import("@/components/AccessibilityPanel"));

// Pages
import Index from "./pages/Index";

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
      {showTestimonials && (
        <Suspense fallback={null}>
          <TestimonialsCarousel />
        </Suspense>
      )}
    </main>
    <Footer />
    <WhatsAppButton />
    <Suspense fallback={null}>
      <AccessibilityPanel />
    </Suspense>
  </>
);

const RouteFallback = () => (
  <div className="container mx-auto px-4 py-12 text-center text-gris-600">
    Cargando contenido...
  </div>
);

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{element}</Suspense>
);

const lazyLayoutRoute = (
  importer: () => Promise<any>,
  options?: { showTestimonials?: boolean; loaderName?: string }
) => async () => {
  const mod = await importer();
  const Component = mod.default;
  const routeConfig: Record<string, unknown> = {
    element: (
      <Layout showTestimonials={options?.showTestimonials}>
        {withSuspense(<Component />)}
      </Layout>
    ),
  };

  if (options?.loaderName && typeof mod[options.loaderName] === "function") {
    routeConfig.loader = mod[options.loaderName];
  }

  return routeConfig;
};

export const appRoutes: RouteObject[] = [
  { path: "/", element: <Layout showTestimonials={true}><Index /></Layout> },
  { path: "/producto/:id", lazy: lazyLayoutRoute(() => import("./pages/Producto")) },
  { path: "/carrito", lazy: lazyLayoutRoute(() => import("./pages/Carrito")) },
  { path: "/blog", lazy: lazyLayoutRoute(() => import("./pages/Blog"), { loaderName: "blogLoader" }) },
  { path: "/blog/:slug", lazy: lazyLayoutRoute(() => import("./pages/BlogPost"), { loaderName: "blogPostLoader" }) },
  { path: "/guias", lazy: lazyLayoutRoute(() => import("./pages/SupportGuides")) },
  { path: "/guias/:slug", lazy: lazyLayoutRoute(() => import("./pages/SupportGuideDetail")) },
  { path: "/blog-preview", lazy: lazyLayoutRoute(() => import("@/components/BlogPreview")) },
  { path: "/contacto", lazy: lazyLayoutRoute(() => import("./pages/Contacto")) },
  { path: "/admin", lazy: lazyLayoutRoute(() => import("./pages/Admin")) },
  { path: "/producto", element: <Navigate to="/producto/profix-126" replace /> },
  { path: "/gracias", lazy: lazyLayoutRoute(() => import("./pages/gracias")) },
  { path: "/pagorechazado", lazy: lazyLayoutRoute(() => import("./pages/pagorechazado")) },
  { path: "/galeria", lazy: lazyLayoutRoute(() => import("./pages/Galeria")) },
  { path: "*", lazy: lazyLayoutRoute(() => import("./pages/NotFound")) },
];

export const createAppRouter = () =>
  createBrowserRouter(appRoutes, {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  });

interface AppProvidersProps {
  children: React.ReactNode;
  helmetContext?: object;
}

export const AppProviders = ({ children, helmetContext }: AppProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <HelmetProvider context={helmetContext}>
          <AccessibilityProvider>
            <Toaster />
            <Sonner />
            {children}
          </AccessibilityProvider>
        </HelmetProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => {
  const router = createAppRouter();

  return (
    <AppProviders>
      <RouterProvider router={router} fallbackElement={<RouteFallback />} />
    </AppProviders>
  );
};

export default App;
