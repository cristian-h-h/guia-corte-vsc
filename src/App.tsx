import { lazy, Suspense, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation,
  type RouteObject,
} from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import SkipLink from "@/components/SkipLink";

import "@/styles/accessibility.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Producto from "./pages/Producto";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

const TestimonialsCarousel = lazy(() => import("@/components/TestimonialsCarousel"));
const AccessibilityPanel = lazy(() => import("@/components/AccessibilityPanel"));

const queryClient = new QueryClient();

/**
 * Providers compartidos entre el bundle de cliente (App) y el bundle SSR
 * (src/entry-server.tsx). entry-server importa AppProviders y le pasa
 * `helmetContext` para poder extraer los meta tags durante el prerender.
 */
export function AppProviders({
  children,
  helmetContext,
}: {
  children: React.ReactNode;
  helmetContext?: Record<string, unknown>;
}) {
  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <AccessibilityProvider>
          <TooltipProvider>
            <CartProvider>{children}</CartProvider>
          </TooltipProvider>
        </AccessibilityProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

const Layout = () => {
  const { pathname } = useLocation();
  const showTestimonials = pathname === "/" || pathname.startsWith("/producto");

  return (
    <>
      <ScrollToTop />
      <SkipLink />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <Outlet />
      </main>
      {showTestimonials && (
        <Suspense fallback={null}>
          <TestimonialsCarousel />
        </Suspense>
      )}
      <Footer />
      <Suspense fallback={null}>
        <AccessibilityPanel />
      </Suspense>
      <Toaster />
      <Sonner />
      <WhatsAppButton />
    </>
  );
};

/**
 * Las rutas secundarias se cargan con `lazy` para no inflar el bundle
 * inicial de las paginas de conversion (home y producto). El blog ademas
 * necesita sus loaders para resolver los datos antes de renderizar.
 */
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "producto/:id", element: <Producto /> },
      { path: "producto", element: <Navigate to="/producto/profix-126" replace /> },
      { path: "contacto", element: <Contacto /> },
      {
        path: "carrito",
        lazy: async () => ({ Component: (await import("./pages/Carrito")).default }),
      },
      {
        path: "galeria",
        lazy: async () => ({ Component: (await import("./pages/Galeria")).default }),
      },
      {
        path: "blog",
        lazy: async () => {
          const mod = await import("./pages/Blog");
          return { Component: mod.default, loader: mod.blogLoader };
        },
      },
      {
        path: "blog/:slug",
        lazy: async () => {
          const mod = await import("./pages/BlogPost");
          return { Component: mod.default, loader: mod.blogPostLoader };
        },
      },
      {
        path: "blog-preview",
        lazy: async () => ({ Component: (await import("@/components/BlogPreview")).default }),
      },
      {
        path: "guias",
        lazy: async () => ({ Component: (await import("./pages/SupportGuides")).default }),
      },
      {
        path: "guias/:slug",
        lazy: async () => ({ Component: (await import("./pages/SupportGuideDetail")).default }),
      },
      {
        path: "search",
        lazy: async () => ({ Component: (await import("./pages/Search")).default }),
      },
      {
        path: "gracias",
        lazy: async () => ({ Component: (await import("./pages/gracias")).default }),
      },
      {
        path: "pagorechazado",
        lazy: async () => ({ Component: (await import("./pages/pagorechazado")).default }),
      },
      {
        path: "admin",
        lazy: async () => ({ Component: (await import("./pages/Admin")).default }),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const RouteFallback = () => (
  <div className="container mx-auto px-4 py-16 text-center text-gris-600">
    Cargando contenido...
  </div>
);

export default function App() {
  // createBrowserRouter requiere `window`, por lo que se crea dentro del
  // componente: asi entry-server.tsx puede importar AppProviders sin ejecutar
  // el router en Node durante el prerender.
  const [router] = useState(() =>
    createBrowserRouter(routes, {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    })
  );

  return (
    <AppProviders>
      <RouterProvider router={router} fallbackElement={<RouteFallback />} />
    </AppProviders>
  );
}
