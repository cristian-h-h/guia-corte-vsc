import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

/**
 * Componente para actualizar dinámicamente las etiquetas meta según la página actual
 */
const DynamicMetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image,
  url,
  type = 'website'
}) => {
  const location = useLocation();
  const currentUrl = url || `https://www.guiadecorte.cl${location.pathname}`;
  const defaultTitle = 'ProFix 126 Guía de Corte | Carpintería Profesional';
  const defaultDescription = 'Guía de corte recto ProFix 126, para sierra circular y todo tipo de herramientas eléctricas. Realiza cortes rectos hasta 1,26 metros.';
  const defaultImage = 'https://www.guiadecorte.cl/guia-imagenes/profix-126-logo.webp';

  // Valores finales
  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;

  return (
    <Helmet>
      {/* Etiquetas básicas */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:secure_url" content={metaImage} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={metaTitle} />
      <meta property="og:site_name" content="GuiaDeCorte.cl" />
      <meta property="og:locale" content="es_CL" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={metaTitle} />
    </Helmet>
  );
};

export default DynamicMetaTags;