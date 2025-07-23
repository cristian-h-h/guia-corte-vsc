import { Blog } from '@/api/supabaseApi';

// Contenido en formato PortableText para el artículo
const portableTextContent = [
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'La guía de corte es una herramienta esencial para cualquier carpintero o aficionado al bricolaje que busque realizar cortes precisos y profesionales. En este artículo, exploraremos las mejores técnicas para aprovechar al máximo tu guía de corte ProFix 126 y lograr resultados perfectos en cada proyecto.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: '¿Por qué es importante una buena guía de corte?',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Un corte preciso es la base de cualquier proyecto de carpintería exitoso. Sin importar si estás construyendo muebles, instalando pisos o realizando trabajos de ebanistería, la precisión en tus cortes determinará la calidad final de tu trabajo. Una guía de corte de calidad como la ProFix 126 te permite:',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '• Realizar cortes perfectamente rectos y precisos',
        marks: ['strong']
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '• Mantener la misma precisión en cortes repetitivos',
        marks: ['strong']
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '• Trabajar con mayor seguridad al tener mejor control de la herramienta',
        marks: ['strong']
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '• Ahorrar tiempo y material al reducir errores',
        marks: ['strong']
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Preparación de la guía de corte',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Antes de comenzar cualquier proyecto, es fundamental preparar adecuadamente tu guía de corte ProFix 126:',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: '1. Inspección y limpieza',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Verifica que tu guía esté limpia y libre de residuos de cortes anteriores. El polvo y las virutas pueden afectar la precisión de tus cortes. Utiliza un cepillo suave o aire comprimido para limpiar los rieles y asegúrate de que los mecanismos de fijación funcionen correctamente.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: '2. Ajuste de la longitud',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'La ProFix 126 permite cortes de hasta 1,26 metros. Ajusta la guía a la longitud necesaria para tu proyecto específico. Recuerda que es mejor trabajar con la longitud exacta que necesitas para mantener la máxima estabilidad durante el corte.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: '3. Fijación segura',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Asegura la guía firmemente al material que vas a cortar. La ProFix 126 cuenta con un sistema de fijación rápida que te permite sujetar la guía sin herramientas adicionales. Verifica que la presión sea uniforme en toda la longitud para evitar movimientos durante el corte.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Técnicas para cortes perfectos',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'image',
    asset: {
      _ref: 'image-1',
      _type: 'reference'
    },
    alt: 'Técnicas de corte con guía ProFix 126',
    caption: 'Corte preciso utilizando la guía ProFix 126 con sierra circular'
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Cortes con sierra circular',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'La sierra circular es una de las herramientas más comunes para usar con la guía de corte ProFix 126. Para obtener los mejores resultados:',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '1. Ajusta la profundidad de corte: ',
        marks: ['strong']
      },
      {
        _type: 'span',
        text: 'Configura la sierra para que la hoja sobresalga aproximadamente 3-5 mm por debajo del material a cortar. Esto minimiza el astillado y proporciona un corte más limpio.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '2. Mantén un avance constante: ',
        marks: ['strong']
      },
      {
        _type: 'span',
        text: 'Mueve la sierra a lo largo de la guía con un ritmo constante. Demasiado lento puede causar quemaduras en la madera, mientras que demasiado rápido puede forzar el motor y producir un corte irregular.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '3. Utiliza la banda antiastillas: ',
        marks: ['strong']
      },
      {
        _type: 'span',
        text: 'La ProFix 126 incluye una banda antiastillas que previene el desgarramiento de la superficie durante el corte. Asegúrate de que esté correctamente instalada para obtener bordes limpios.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Cortes con router',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'El router o fresadora es otra herramienta versátil que se beneficia enormemente del uso de una guía de corte:',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '1. Selecciona la fresa adecuada: ',
        marks: ['strong']
      },
      {
        _type: 'span',
        text: 'Dependiendo del trabajo, elige la fresa apropiada y asegúrate de que esté afilada para obtener cortes limpios.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '2. Realiza múltiples pasadas: ',
        marks: ['strong']
      },
      {
        _type: 'span',
        text: 'Para trabajos profundos, es mejor hacer varias pasadas incrementando gradualmente la profundidad, en lugar de intentar un solo corte profundo.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '3. Dirección de avance: ',
        marks: ['strong']
      },
      {
        _type: 'span',
        text: 'Mueve el router de izquierda a derecha cuando trabajes en el borde exterior de una pieza, y de derecha a izquierda cuando trabajes en un borde interior.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Mantenimiento de tu guía de corte',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Para garantizar la longevidad y precisión de tu guía ProFix 126, es importante realizar un mantenimiento regular:',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '• Limpia la guía después de cada uso para evitar la acumulación de residuos',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '• Verifica periódicamente que los componentes de fijación estén ajustados correctamente',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '• Aplica ocasionalmente un lubricante seco en las partes móviles para mantener un funcionamiento suave',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '• Almacena la guía en un lugar seco y protegido para evitar deformaciones o daños',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Proyectos recomendados',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Con tu guía de corte ProFix 126, puedes realizar una amplia variedad de proyectos con precisión profesional:',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '1. Estanterías flotantes',
        marks: ['strong']
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '2. Mesas de centro personalizadas',
        marks: ['strong']
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '3. Instalación de encimeras de cocina',
        marks: ['strong']
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '4. Puertas a medida',
        marks: ['strong']
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '5. Paneles decorativos',
        marks: ['strong']
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Conclusión',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Una guía de corte de calidad como la ProFix 126 es una inversión que elevará significativamente la calidad de tus proyectos de carpintería. Con la preparación adecuada, las técnicas correctas y un mantenimiento regular, podrás aprovechar al máximo esta herramienta y lograr resultados profesionales en cada trabajo.',
        marks: []
      }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Recuerda que la práctica hace al maestro. No tengas miedo de experimentar con diferentes materiales y técnicas para descubrir todo el potencial de tu guía de corte ProFix 126.',
        marks: []
      }
    ],
    markDefs: []
  }
];

// Datos del artículo de ejemplo
export const sampleBlogPost: Blog = {
  title: "Cómo lograr cortes perfectos con tu guía ProFix 126",
  slug: "como-lograr-cortes-perfectos-guia-profix-126",
  excerpt: "Descubre las mejores técnicas y consejos para aprovechar al máximo tu guía de corte ProFix 126 y conseguir resultados profesionales en todos tus proyectos de carpintería.",
  content: portableTextContent,
  main_image_url: "https://www.guiadecorte.cl/blog-imagenes/cortes-perfectos-guia.webp",
  published_at: new Date().toISOString(),
  author: "Carlos Martínez",
  tags: ["carpintería", "guía de corte", "técnicas", "herramientas", "ProFix 126"],
  meta_title: "Guía Completa: Cómo Lograr Cortes Perfectos con la Guía ProFix 126",
  meta_description: "Aprende técnicas profesionales para realizar cortes precisos con tu guía de corte ProFix 126. Consejos, mantenimiento y proyectos recomendados.",
  category: "Tutoriales"
};

// Datos para un segundo artículo de ejemplo
export const secondBlogPost: Blog = {
  title: "5 proyectos de carpintería para principiantes con guía de corte",
  slug: "5-proyectos-carpinteria-principiantes-guia-corte",
  excerpt: "Iníciate en el mundo de la carpintería con estos 5 proyectos sencillos pero impresionantes que podrás realizar fácilmente utilizando tu guía de corte ProFix 126.",
  content: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'La carpintería puede parecer intimidante para los principiantes, pero con las herramientas adecuadas como la guía de corte ProFix 126, incluso los novatos pueden crear proyectos impresionantes. En este artículo, te presentamos 5 proyectos perfectos para iniciarte en el mundo de la carpintería.',
          marks: []
        }
      ],
      markDefs: []
    }
  ],
  main_image_url: "https://www.guiadecorte.cl/blog-imagenes/proyectos-principiantes.webp",
  published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Una semana atrás
  author: "Ana Gómez",
  tags: ["principiantes", "proyectos", "carpintería", "guía de corte", "DIY"],
  meta_title: "5 Proyectos de Carpintería Fáciles para Principiantes con Guía de Corte",
  meta_description: "Descubre 5 proyectos de carpintería sencillos pero impresionantes que cualquier principiante puede realizar utilizando una guía de corte ProFix 126.",
  category: "Proyectos DIY"
};

// Datos para un tercer artículo de ejemplo
export const thirdBlogPost: Blog = {
  title: "Guía de mantenimiento para herramientas de carpintería",
  slug: "guia-mantenimiento-herramientas-carpinteria",
  excerpt: "Aprende a mantener tus herramientas de carpintería en óptimas condiciones para prolongar su vida útil y garantizar resultados profesionales en cada proyecto.",
  content: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'El mantenimiento adecuado de tus herramientas de carpintería es fundamental para garantizar su durabilidad y precisión. En esta guía, te explicamos paso a paso cómo cuidar correctamente cada una de tus herramientas, incluyendo tu guía de corte ProFix 126.',
          marks: []
        }
      ],
      markDefs: []
    }
  ],
  main_image_url: "https://www.guiadecorte.cl/blog-imagenes/mantenimiento-herramientas.webp",
  published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // Dos semanas atrás
  author: "Roberto Sánchez",
  tags: ["mantenimiento", "herramientas", "carpintería", "cuidados", "durabilidad"],
  meta_title: "Guía Completa de Mantenimiento para Herramientas de Carpintería",
  meta_description: "Descubre cómo mantener tus herramientas de carpintería en perfecto estado para prolongar su vida útil y obtener resultados profesionales en cada proyecto.",
  category: "Mantenimiento"
};

// Exportar un array con todos los artículos de ejemplo
export const sampleBlogPosts: Blog[] = [
  sampleBlogPost,
  secondBlogPost,
  thirdBlogPost
];