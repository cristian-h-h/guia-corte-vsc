import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
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

const Layout = ({ showTestimonials = false }: { showTestimonials?: boolean }) => (
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

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout showTestimonials />,
    children: [
      { index: true, element: <Index /> },
      { path: "producto/:id", element: <Producto /> },
      { path: "producto", element: <Navigate to="/producto/profix-126" replace /> },
      { path: "contacto", element: <Contacto /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
