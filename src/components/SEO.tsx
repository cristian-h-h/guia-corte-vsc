import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: object | object[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
  alternateLocales?: string[];
  category?: string;
  tags?: string[];
  videoUrl?: string;
  children?: React.ReactNode;
}

/**
 * Componente SEO mejorado para gestionar todas las metaetiquetas, Open Graph, Twitter Cards y datos estructurados
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  schema,
  author = "GuiaDeCorte.cl",
  publishedTime,
  modifiedTime,
  locale = "es_CL",
  alternateLocales = ["es_ES", "es_MX"],
  category,
  tags,
  videoUrl,
  children
}) => {
  // Valores por defecto
  const defaultTitle = "Guía de Corte ProFix 126 | Precisión Profesional para Carpintería";
  const defaultDescription = "Guía de corte recto ProFix 126, para sierra circular profesional y todo tipo de herramientas eléctricas. Realiza cortes rectos perfectos hasta 1,26 metros en madera, melamina y más.";
  const defaultKeywords = "guía de corte, sierra circular, router, carpintería, bricolaje, herramientas precisión, cortes madera, profix 126, guía aluminio, corte recto preciso";
  const defaultImage = "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp";
  const defaultUrl = "https://www.guiadecorte.cl";

  // Valores finales
  const metaTitle = title ? `${title} | GuiaDeCorte.cl` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image || defaultImage;
  const metaUrl = url || defaultUrl;

  // Determinar si es una página de artículo/blog
  const isArticle = type === 'article';

  return (
    <Helmet>
      {/* Metaetiquetas básicas */}
      <html lang="es" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />

      {/* Metaetiquetas para SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#FF6600" />

      {/* Canonical URL */}
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="GuiaDeCorte.cl" />
      <meta property="og:locale" content={locale} />

      {/* Locales alternativos para Open Graph */}
      {alternateLocales.map((altLocale) => (
        <meta key={altLocale} property="og:locale:alternate" content={altLocale} />
      ))}

      {/* Metadatos adicionales para artículos */}
      {isArticle && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {isArticle && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {isArticle && category && (
        <meta property="article:section" content={category} />
      )}
      {isArticle && tags && tags.length > 0 && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      {isArticle && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:creator" content="@guiadecorte" />

      {/* Video (si existe) */}
      {videoUrl && (
        <>
          <meta property="og:video" content={videoUrl} />
          <meta property="og:video:secure_url" content={videoUrl} />
          <meta property="og:video:type" content="video/mp4" />
          <meta property="og:video:width" content="1280" />
          <meta property="og:video:height" content="720" />
        </>
      )}

      {/* Datos estructurados (Schema.org) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

      {/* Metaetiquetas de accesibilidad */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Enlaces para precargar recursos críticos */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Contenido adicional */}
      {children}
    </Helmet>
  );
};

export default SEO;