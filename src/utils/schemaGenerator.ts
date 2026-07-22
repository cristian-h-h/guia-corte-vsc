/**
 * Utilidad para generar esquemas JSON-LD para SEO
 */

const defaultCommercialKeywords = [
  "guia de corte recto",
  "guia de corte para sierra circular",
  "guia recta para sierra circular",
  "guia de aluminio para sierra circular",
  "guia para cortar melamina",
  "guia corte madera",
  "profix 126",
];

// Esquema de la organización
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.guiadecorte.cl/#organization",
    "name": "GuiaDeCorte.cl",
    "alternateName": "Guia de Corte Recto ProFix 126",
    "url": "https://www.guiadecorte.cl",
    "description":
      "GuiaDeCorte.cl comercializa la guia de corte recto ProFix 126 para sierra circular y herramientas con base compatible.",
    "keywords": defaultCommercialKeywords.join(", "),
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.guiadecorte.cl/guia-imagenes/profix-126-logo.webp",
      "width": 180,
      "height": 60
    },
    "sameAs": [
      "https://www.facebook.com/guiadecorte",
      "https://www.instagram.com/guiadecorte"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+56-9-5678-1234",
      "contactType": "customer service",
      "areaServed": "CL",
      "availableLanguage": "Spanish"
    }
  };
};

// Esquema del sitio web
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.guiadecorte.cl/#website",
    "url": "https://www.guiadecorte.cl",
    "name": "GuiaDeCorte.cl",
    "description":
      "Guia de corte recto ProFix 126 para sierra circular, melamina, MDF, terciado y madera con mejor precision y repetibilidad.",
    "keywords": defaultCommercialKeywords.join(", "),
    "publisher": {
      "@id": "https://www.guiadecorte.cl/#organization"
    }
  };
};

// Esquema de producto
export const generateProductSchema = (
  productName: string,
  description: string,
  price: number,
  currency: string = "CLP",
  sku: string,
  image: string,
  url: string,
  availability: "InStock" | "OutOfStock" = "InStock",
  brand: string = "ProFix",
  reviewCount?: number,
  ratingValue?: number,
  keywords: string[] = defaultCommercialKeywords
) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": description,
    "keywords": keywords.join(", "),
    "sku": sku,
    "mpn": sku,
    "image": image,
    "url": url,
    "category": "Guia de corte recto para sierra circular",
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "price": price,
      "priceCurrency": currency,
      "availability": `https://schema.org/${availability}`,
      "seller": {
        "@id": "https://www.guiadecorte.cl/#organization"
      }
    }
  };

  // Añadir reseñas si están disponibles
  if (reviewCount && ratingValue) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount
    };
  }

  return schema;
};

// Esquema de artículo de blog
export const generateArticleSchema = (
  headline: string,
  description: string,
  authorName: string,
  publishDate: string,
  modifiedDate: string,
  image: string,
  url: string,
  articleSection: string = "Carpintería"
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": headline,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@id": "https://www.guiadecorte.cl/#organization"
    },
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "articleSection": articleSection
  };
};

// Esquema de página de contacto
export const generateContactPageSchema = (url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": url,
    "name": "Contacto - GuiaDeCorte.cl",
    "description":
      "Contacta a GuiaDeCorte.cl para consultar stock, compra y compatibilidad de la guia de corte recto ProFix 126.",
    "keywords":
      "contacto guia de corte recto, comprar profix 126, stock guia de corte para sierra circular",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://www.guiadecorte.cl/#organization"
    }
  };
};

// Esquema de preguntas frecuentes (FAQ)
export const generateFAQSchema = (questions: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };
};

// Esquema de migas de pan (breadcrumbs)
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Esquema de video
export const generateVideoSchema = (
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  contentUrl: string,
  embedUrl: string,
  duration: string // Formato: "PT1M33S" (1 minuto y 33 segundos)
) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "contentUrl": contentUrl,
    "embedUrl": embedUrl,
    "duration": duration,
    "publisher": {
      "@id": "https://www.guiadecorte.cl/#organization"
    }
  };
};

// Esquema de galería de imágenes
export const generateImageGallerySchema = (
  name: string,
  description: string,
  url: string,
  images: { url: string; name: string; description?: string }[]
) => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": name,
    "description": description,
    "url": url,
    "image": images.map(img => ({
      "@type": "ImageObject",
      "url": img.url,
      "name": img.name,
      "description": img.description || ""
    }))
  };
};

// Esquema combinado para la página principal
export const generateHomePageSchema = () => {
  return [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.guiadecorte.cl/#webpage",
      "url": "https://www.guiadecorte.cl",
      "name": "Guía de Corte ProFix 126 | Precisión Profesional para Carpintería",
      "description":
        "Guia de corte recto ProFix 126 para sierra circular. Guia de aluminio para cortar madera, melamina, MDF y terciado con mayor control.",
      "keywords": defaultCommercialKeywords.join(", "),
      "isPartOf": {
        "@id": "https://www.guiadecorte.cl/#website"
      },
      "about": {
        "@id": "https://www.guiadecorte.cl/#organization"
      }
    }
  ];
};
