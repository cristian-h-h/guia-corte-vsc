/**
 * Utilidad para generar esquemas JSON-LD para SEO
 */

// Esquema de la organización
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.guiadecorte.cl/#organization",
    "name": "GuiaDeCorte.cl",
    "url": "https://www.guiadecorte.cl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.guiadecorte.cl/guia-imagenes/logo-guia-de-corte.webp",
      "width": 600,
      "height": 60
    },
    "sameAs": [
      "https://www.facebook.com/guiadecorte",
      "https://www.instagram.com/guiadecorte.cl/",
      "https://www.youtube.com/channel/UCXcYP9xDZWvmRhg4dkKimQQ"
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
    "description": "Guía de corte recto ProFix 126, para sierra circular profesional y todo tipo de herramientas eléctricas.",
    "publisher": {
      "@id": "https://www.guiadecorte.cl/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.guiadecorte.cl/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
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
  ratingValue?: number
) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": description,
    "sku": sku,
    "mpn": sku,
    "image": image,
    "url": url,
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
    "description": "Contáctanos para más información sobre nuestros productos y servicios.",
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
      "description": "Guía de corte recto ProFix 126, para sierra circular profesional y todo tipo de herramientas eléctricas. Realiza cortes rectos perfectos hasta 1,26 metros en madera, melamina y más.",
      "isPartOf": {
        "@id": "https://www.guiadecorte.cl/#website"
      },
      "about": {
        "@id": "https://www.guiadecorte.cl/#organization"
      }
    }
  ];
};