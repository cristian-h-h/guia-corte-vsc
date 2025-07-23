/**
 * Datos estructurados para la organización (Schema.org)
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.guiadecorte.cl/#organization",
  "name": "GuiaDeCorte.cl",
  "url": "https://www.guiadecorte.cl",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.guiadecorte.cl/guia-imagenes/profix-126-logo.webp",
    "width": 180,
    "height": 60
  },
  "sameAs": [
    "https://www.facebook.com/guiadecorte",
    "https://www.instagram.com/guiadecorte",
    "https://www.youtube.com/channel/UCxxxxxxxxxxxxxxx"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+56935777727",
    "contactType": "customer service",
    "areaServed": "CL",
    "availableLanguage": "Spanish"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CL",
    "addressRegion": "Región Metropolitana",
    "addressLocality": "Santiago"
  }
};

/**
 * Datos estructurados para el sitio web (Schema.org)
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.guiadecorte.cl/#website",
  "url": "https://www.guiadecorte.cl",
  "name": "GuiaDeCorte.cl",
  "description": "Guía de corte profesional para carpintería y bricolaje",
  "publisher": {
    "@id": "https://www.guiadecorte.cl/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.guiadecorte.cl/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

/**
 * Datos estructurados para el producto principal (Schema.org)
 */
export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.guiadecorte.cl/producto/profix-126#product",
  "name": "Guía de Corte ProFix 126",
  "image": [
    "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
    "https://www.guiadecorte.cl/guia-imagenes/corte-sierra-circular-profix-126.webp",
    "https://www.guiadecorte.cl/guia-imagenes/ajuste-recto-profix-126.webp"
  ],
  "description": "Guía de corte profesional para carpintería con precisión industrial. Realiza cortes rectos perfectos hasta 1.26 metros con cualquier herramienta.",
  "sku": "PROFIX-126",
  "mpn": "PROFIX-126",
  "brand": {
    "@type": "Brand",
    "name": "ProFix"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "GuiaDeCorte.cl"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.guiadecorte.cl/producto/profix-126",
    "priceCurrency": "CLP",
    "price": "35000",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@id": "https://www.guiadecorte.cl/#organization"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Carlos Méndez"
      },
      "datePublished": "2025-05-15",
      "reviewBody": "Esta guía ha transformado mi taller. La precisión y facilidad de uso es impresionante. Recomiendo totalmente este producto."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Andrea Soto"
      },
      "datePublished": "2025-04-22",
      "reviewBody": "Como aficionada al bricolaje, esta guía ha sido un descubrimiento. Ahora mis cortes son precisos y profesionales. ¡Una inversión que vale la pena!"
    }
  ]
};

/**
 * Datos estructurados para la página de contacto (Schema.org)
 */
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.guiadecorte.cl/contacto#contactpage",
  "url": "https://www.guiadecorte.cl/contacto",
  "name": "Contacto - GuiaDeCorte.cl",
  "description": "Contáctanos para más información sobre nuestros productos y servicios",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://www.guiadecorte.cl/#organization"
  }
};

/**
 * Datos estructurados para la página de blog (Schema.org)
 */
export const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://www.guiadecorte.cl/blog#blog",
  "url": "https://www.guiadecorte.cl/blog",
  "name": "Blog de Carpintería - GuiaDeCorte.cl",
  "description": "Artículos, tutoriales y consejos sobre carpintería, bricolaje y uso de herramientas",
  "publisher": {
    "@id": "https://www.guiadecorte.cl/#organization"
  }
};

/**
 * Datos estructurados para la página de galería (Schema.org)
 */
export const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": "https://www.guiadecorte.cl/galeria#gallery",
  "url": "https://www.guiadecorte.cl/galeria",
  "name": "Galería de Imágenes - GuiaDeCorte.cl",
  "description": "Galería de imágenes de la Guía de Corte ProFix 126 y sus aplicaciones",
  "publisher": {
    "@id": "https://www.guiadecorte.cl/#organization"
  }
};