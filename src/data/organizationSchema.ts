const siteKeywordList = [
  "guia de corte recto",
  "guia de corte",
  "guia de corte para sierra circular",
  "guia recta para sierra circular",
  "guia de aluminio para sierra circular",
  "sierra circular con guia de corte",
  "guia para cortar melamina",
  "guia corte madera",
  "profix 126",
];

const productKeywordList = [
  "guia de corte recto",
  "guia de corte para sierra circular",
  "guia recta para sierra circular",
  "guia de aluminio para sierra circular",
  "guia para cortar melamina",
  "guia para MDF",
  "guia corte madera",
  "profix 126",
];

/**
 * Datos estructurados para la organización (Schema.org)
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.guiadecorte.cl/#organization",
  "name": "GuiaDeCorte.cl",
  "alternateName": "Guia de Corte Recto ProFix 126",
  "url": "https://www.guiadecorte.cl",
  "description":
    "GuiaDeCorte.cl comercializa la guia de corte recto ProFix 126 para sierra circular y herramientas con base compatible en trabajos sobre melamina, MDF, terciado y madera.",
  "keywords": siteKeywordList.join(", "),
  "knowsAbout": [
    "guia de corte recto",
    "guia de corte para sierra circular",
    "guia de aluminio para sierra circular",
    "cortes rectos en melamina",
    "cortes rectos en MDF",
    "cortes rectos en madera",
  ],
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.guiadecorte.cl/icons/apple-touch-icon.png",
    "width": 180,
    "height": 180
  },
  "sameAs": [
    "https://www.facebook.com/guiadecorte",
    "https://www.instagram.com/guiadecorte"
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
  "alternateName": "Guia de corte recto ProFix 126",
  "description":
    "Sitio especializado en la guia de corte recto ProFix 126 para sierra circular, guia recta para cortar melamina, MDF, terciado y madera con mayor precision.",
  "keywords": siteKeywordList.join(", "),
  "about": {
    "@type": "Thing",
    "name": "Guia de corte recto para sierra circular",
  },
  "publisher": {
    "@id": "https://www.guiadecorte.cl/#organization"
  }
};

/**
 * Datos estructurados para el producto principal (Schema.org)
 */
export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.guiadecorte.cl/producto/profix-126#product",
  "name": "Guía de Corte Recto ProFix 126",
  "alternateName": "Guia de aluminio ProFix 126 para sierra circular",
  "image": [
    "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
    "https://www.guiadecorte.cl/guia-imagenes/corte-sierra-circular-profix-126.webp",
    "https://www.guiadecorte.cl/guia-imagenes/ajuste-recto-profix-126.webp"
  ],
  "description":
    "Guia de corte recto ProFix 126 de aluminio para sierra circular y herramientas con base compatible. Ideal para cortar melamina, MDF, terciado y madera con mayor control, repeticion y precision.",
  "keywords": productKeywordList.join(", "),
  "sku": "PROFIX-126",
  "mpn": "PROFIX-126",
  "category": "Guia de corte recto para sierra circular",
  "material": "Aluminio 6061-T6",
  "brand": {
    "@type": "Brand",
    "name": "ProFix"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "GuiaDeCorte.cl"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Longitud de trabajo",
      "value": "1.26 m"
    },
    {
      "@type": "PropertyValue",
      "name": "Uso principal",
      "value": "Guia de corte para sierra circular"
    },
    {
      "@type": "PropertyValue",
      "name": "Materiales recomendados",
      "value": "Melamina, MDF, terciado y madera"
    }
  ],
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
  }
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
  "description":
    "Contacta a GuiaDeCorte.cl para consultar stock, compatibilidad, despacho y compra de la guia de corte recto ProFix 126 para sierra circular.",
  "keywords":
    "contacto guia de corte, comprar profix 126, stock guia de corte recto, compatibilidad sierra circular",
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
  "description":
    "Articulos sobre guia de corte recto, sierra circular, melamina, MDF, madera, compatibilidad y usos reales de la ProFix 126.",
  "keywords":
    "blog guia de corte recto, sierra circular con guia, cortar melamina, cortar MDF, profix 126",
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
  "description":
    "Galeria de imagenes de la guia de corte recto ProFix 126 en usos reales con sierra circular, melamina, MDF, terciado y madera.",
  "keywords":
    "galeria guia de corte recto, guia de aluminio para sierra circular, profix 126 imagenes",
  "publisher": {
    "@id": "https://www.guiadecorte.cl/#organization"
  }
};
