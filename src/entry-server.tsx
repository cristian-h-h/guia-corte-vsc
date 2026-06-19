import ReactDOMServer from "react-dom/server";
import { createMemoryRouter, Navigate, RouterProvider, type RouteObject } from "react-router-dom";
import { AppProviders } from "./App";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import SkipLink from "@/components/SkipLink";
import Index from "./pages/Index";
import Producto from "./pages/Producto";
import Contacto from "./pages/Contacto";
import Galeria from "./pages/Galeria";
import NotFound from "./pages/NotFound";
import SupportGuides from "./pages/SupportGuides";
import SupportGuideDetail from "./pages/SupportGuideDetail";

const StaticLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <>
    <ScrollToTop />
    <SkipLink />
    <Navbar />
    <main id="main-content" className="min-h-screen">
      {children}
    </main>
    <Footer renderRelatedCompanies={false} />
    <WhatsAppButton />
  </>
);

const prerenderRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <StaticLayout>
        <Index />
      </StaticLayout>
    ),
  },
  {
    path: "/producto/:id",
    element: (
      <StaticLayout>
        <Producto />
      </StaticLayout>
    ),
  },
  {
    path: "/producto",
    element: <Navigate to="/producto/profix-126" replace />,
  },
  {
    path: "/contacto",
    element: (
      <StaticLayout>
        <Contacto />
      </StaticLayout>
    ),
  },
  {
    path: "/guias",
    element: (
      <StaticLayout>
        <SupportGuides />
      </StaticLayout>
    ),
  },
  {
    path: "/guias/:slug",
    element: (
      <StaticLayout>
        <SupportGuideDetail />
      </StaticLayout>
    ),
  },
  {
    path: "/galeria",
    element: (
      <StaticLayout>
        <Galeria />
      </StaticLayout>
    ),
  },
  {
    path: "*",
    element: (
      <StaticLayout>
        <NotFound />
      </StaticLayout>
    ),
  },
];

export async function render(url: string) {
  const helmetContext: { helmet?: any } = {};
  const router = createMemoryRouter(prerenderRoutes, {
    initialEntries: [url],
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  });

  const appHtml = ReactDOMServer.renderToString(
    <AppProviders helmetContext={helmetContext}>
      <RouterProvider router={router} />
    </AppProviders>
  );

  return {
    appHtml,
    helmet: helmetContext.helmet,
  };
}

export async function getPrerenderRoutes() {
  return [
    "/",
    "/producto/profix-126",
    "/contacto",
    "/galeria",
    "/guias",
    "/guias/compatibilidad-herramientas",
    "/guias/compatibilidad-por-modelo-de-herramienta",
    "/guias/compatibilidad-por-marcas-frecuentes",
    "/guias/cortes-en-melamina-mdf-terciado",
    "/guias/como-hacer-cortes-rectos-con-sierra-circular",
    "/guias/guia-de-corte-para-router",
    "/guias/profix-126-vs-regla-casera",
    "/guias/sierra-circular-con-guia-vs-sierra-de-mesa",
  ];
}
