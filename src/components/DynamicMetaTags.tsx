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
  const defaultImage = 'https://www.guiadecorte.cl/guia-imagenes/profix-126-logo.webp?v=2';

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

      {/* Favicon y iconos */}
      <link rel="icon" type="image/webp" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="shortcut icon" type="image/webp" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="apple-touch-icon" sizes="180x180" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="apple-touch-icon" sizes="152x152" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="apple-touch-icon" sizes="144x144" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="apple-touch-icon" sizes="120x120" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="apple-touch-icon" sizes="114x114" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="apple-touch-icon" sizes="76x76" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="apple-touch-icon" sizes="72x72" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="apple-touch-icon" sizes="60x60" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="apple-touch-icon" sizes="57x57" href="/guia-imagenes/profix-126-logo.webp" />
      <link rel="apple-touch-icon" href="/guia-imagenes/profix-126-logo.webp" />
      <meta name="msapplication-TileImage" content={metaImage} />
      <meta name="msapplication-TileColor" content="#FF6600" />
    </Helmet>
  );
};

export default DynamicMetaTags;