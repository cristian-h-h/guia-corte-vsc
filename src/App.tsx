import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate, type RouteObject } from "react-router-dom";
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

const TestimonialsCarousel = lazy(() => import("@/components/TestimonialsCarousel"));
const AccessibilityPanel = lazy(() => import("@/components/AccessibilityPanel"));

const queryClient = new QueryClient();

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
  image,
}: LayoutProps) => (
  <>
    <ScrollToTop />
    <SkipLink />
    <Navbar />
    <main id="main-content">{children}</main>
    {showTestimonials && (
      <Suspense fallback={null}>
        <TestimonialsCarousel />
      </Suspense>
    )}
    <Footer />
    <TooltipProvider>
      <Suspense fallback={null}>
        <AccessibilityPanel />
      </Suspense>
    </TooltipProvider>
    <Toaster />
    <Sonner />
    <WhatsAppButton />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout title="Guía de Corte" description="Guía de corte profesional para sierra circular" />
    ),
    children: [
      { index: true, element: <Index /> },
      // Aquí pueden añadirse más rutas hijas
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
