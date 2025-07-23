import { Link } from "react-router-dom";
import { useAccessibility } from "@/context/AccessibilityContext";

interface SEOLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  rel?: string;
  onClick?: () => void;
  ariaLabel?: string;
  download?: boolean | string;
  hrefLang?: string;
  role?: string;
  tabIndex?: number;
}

/**
 * Componente de enlace optimizado para SEO y accesibilidad
 */
const SEOLink: React.FC<SEOLinkProps> = ({
  to,
  children,
  className,
  title,
  rel,
  onClick,
  ariaLabel,
  download,
  hrefLang,
  role,
  tabIndex
}) => {
  // Usar el contexto de accesibilidad
  const { options } = useAccessibility();
  
  // Determinar si es un enlace interno o externo
  const isExternal = to.startsWith("http") || to.startsWith("//");

  // Clase adicional para alto contraste si está activado
  const accessibilityClass = options.highContrast ? "high-contrast-link" : "";
  const combinedClassName = `${className || ""} ${accessibilityClass}`.trim();

  // Para enlaces externos, usar <a> con atributos de seguridad y accesibilidad
  if (isExternal) {
    return (
      <a
        href={to}
        className={combinedClassName}
        title={title}
        rel={rel || "noopener noreferrer"}
        target="_blank"
        onClick={onClick}
        aria-label={ariaLabel}
        download={download}
        hrefLang={hrefLang}
        role={role}
        tabIndex={tabIndex}
      >
        {children}
        <span className="sr-only"> (se abre en una nueva ventana)</span>
      </a>
    );
  }

  // Para enlaces internos, usar Link de react-router-dom con atributos de accesibilidad
  return (
    <Link
      to={to}
      className={combinedClassName}
      title={title}
      onClick={onClick}
      aria-label={ariaLabel}
      download={download}
      hrefLang={hrefLang}
      rel={rel}
      role={role}
      tabIndex={tabIndex}
    >
      {children}
    </Link>
  );
};

export default SEOLink;