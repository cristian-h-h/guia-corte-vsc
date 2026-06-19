import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const BASE_URL = 'https://www.guiadecorte.cl';
const DEFAULT_SOCIAL_IMAGE = `${BASE_URL}/social/profix-126-share.jpg`;

const stripQueryParams = (value: string) => value.split('?')[0];
const toAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value)
  ? value
  : value.startsWith('/')
    ? `${BASE_URL}${value}`
    : `${BASE_URL}/${value}`;
const isSocialFriendlyImage = (value: string) => /\.(png|jpe?g)$/i.test(stripQueryParams(value));

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
  const currentUrl = url ? toAbsoluteUrl(url) : `${BASE_URL}${location.pathname}`;
  const defaultTitle = 'ProFix 126 Guía de Corte | Carpintería Profesional';
  const defaultDescription = 'Guía de corte recto ProFix 126, para sierra circular y todo tipo de herramientas eléctricas. Realiza cortes rectos hasta 1,26 metros.';
  const requestedImage = image ? toAbsoluteUrl(image) : DEFAULT_SOCIAL_IMAGE;
  const defaultImage = isSocialFriendlyImage(requestedImage) ? requestedImage : DEFAULT_SOCIAL_IMAGE;

  // Valores finales
  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = defaultImage;

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
      <meta property="og:image:type" content="image/jpeg" />
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

      {/* Favicon y iconos */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <meta name="msapplication-TileImage" content={`${BASE_URL}/icons/apple-touch-icon.png`} />
      <meta name="msapplication-TileColor" content="#FF6600" />
    </Helmet>
  );
};

export default DynamicMetaTags;
