import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  customItems?: { label: string; path: string }[];
}

/**
 * Componente de migas de pan (breadcrumbs) para mejorar la navegación y SEO
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customItems }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Mapeo de rutas a nombres legibles
  const pathMap: Record<string, string> = {
    producto: "Producto",
    blog: "Blog",
    galeria: "Galería",
    contacto: "Contacto",
    carrito: "Carrito",
    "profix-126": "ProFix 126",
  };

  // Generar los elementos de breadcrumb
  const breadcrumbs = customItems || pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    const label = pathMap[name] || name;

    return {
      label,
      path: routeTo,
      isLast,
    };
  });

  // Si no hay rutas, no mostrar breadcrumbs
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-madera-100">
      <ol 
        className="flex flex-wrap items-center text-sm text-madera-700" 
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        <li 
          className="flex items-center" 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <Link 
            to="/" 
            className="flex items-center hover:text-herramienta-600 transition-colors"
            itemProp="item"
          >
            <Home size={16} className="mr-1" />
            <span itemProp="name">Inicio</span>
          </Link>
          <meta itemProp="position" content="1" />
          {breadcrumbs.length > 0 && (
            <ChevronRight size={14} className="mx-2 text-madera-400" />
          )}
        </li>

        {breadcrumbs.map((breadcrumb, index) => (
          <li 
            key={breadcrumb.path} 
            className="flex items-center"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            {breadcrumb.isLast ? (
              <span className="font-medium text-herramienta-700" itemProp="name">
                {breadcrumb.label}
              </span>
            ) : (
              <Link 
                to={breadcrumb.path} 
                className="hover:text-herramienta-600 transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{breadcrumb.label}</span>
              </Link>
            )}
            <meta itemProp="position" content={`${index + 2}`} />
            {!breadcrumb.isLast && (
              <ChevronRight size={14} className="mx-2 text-madera-400" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;