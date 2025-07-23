-- Script SQL para insertar artículos de ejemplo en la tabla blog_posts de Supabase

-- Artículo 1: Cómo lograr cortes perfectos con tu guía ProFix 126
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  image_url,
  published_at,
  author,
  tags,
  meta_title,
  meta_description,
  category,
  is_published
)
VALUES (
  'Cómo lograr cortes perfectos con tu guía ProFix 126',
  'como-lograr-cortes-perfectos-guia-profix-126',
  'Descubre las mejores técnicas y consejos para aprovechar al máximo tu guía de corte ProFix 126 y conseguir resultados profesionales en todos tus proyectos de carpintería.',
  '[{"_type":"block","style":"normal","children":[{"_type":"span","text":"La guía de corte es una herramienta esencial para cualquier carpintero o aficionado al bricolaje que busque realizar cortes precisos y profesionales. En este artículo, exploraremos las mejores técnicas para aprovechar al máximo tu guía de corte ProFix 126 y lograr resultados perfectos en cada proyecto.","marks":[]}],"markDefs":[]},{"_type":"block","style":"h2","children":[{"_type":"span","text":"¿Por qué es importante una buena guía de corte?","marks":[]}],"markDefs":[]},{"_type":"block","style":"normal","children":[{"_type":"span","text":"Un corte preciso es la base de cualquier proyecto de carpintería exitoso. Sin importar si estás construyendo muebles, instalando pisos o realizando trabajos de ebanistería, la precisión en tus cortes determinará la calidad final de tu trabajo. Una guía de corte de calidad como la ProFix 126 te permite:","marks":[]}],"markDefs":[]},{"_type":"block","style":"normal","children":[{"_type":"span","text":"• Realizar cortes perfectamente rectos y precisos","marks":["strong"]}],"markDefs":[]},{"_type":"block","style":"normal","children":[{"_type":"span","text":"• Mantener la misma precisión en cortes repetitivos","marks":["strong"]}],"markDefs":[]},{"_type":"block","style":"normal","children":[{"_type":"span","text":"• Trabajar con mayor seguridad al tener mejor control de la herramienta","marks":["strong"]}],"markDefs":[]},{"_type":"block","style":"normal","children":[{"_type":"span","text":"• Ahorrar tiempo y material al reducir errores","marks":["strong"]}],"markDefs":[]}]',
  'https://www.guiadecorte.cl/blog-imagenes/cortes-perfectos-guia.webp',
  CURRENT_TIMESTAMP,
  'Carlos Martínez',
  ARRAY['carpintería', 'guía de corte', 'técnicas', 'herramientas', 'ProFix 126'],
  'Guía Completa: Cómo Lograr Cortes Perfectos con la Guía ProFix 126',
  'Aprende técnicas profesionales para realizar cortes precisos con tu guía de corte ProFix 126. Consejos, mantenimiento y proyectos recomendados.',
  'Tutoriales',
  TRUE
)
ON CONFLICT (slug) 
DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  image_url = EXCLUDED.image_url,
  author = EXCLUDED.author,
  tags = EXCLUDED.tags,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  category = EXCLUDED.category,
  is_published = EXCLUDED.is_published;

-- Artículo 2: 5 proyectos de carpintería para principiantes con guía de corte
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  image_url,
  published_at,
  author,
  tags,
  meta_title,
  meta_description,
  category,
  is_published
)
VALUES (
  '5 proyectos de carpintería para principiantes con guía de corte',
  '5-proyectos-carpinteria-principiantes-guia-corte',
  'Iníciate en el mundo de la carpintería con estos 5 proyectos sencillos pero impresionantes que podrás realizar fácilmente utilizando tu guía de corte ProFix 126.',
  '[{"_type":"block","style":"normal","children":[{"_type":"span","text":"La carpintería puede parecer intimidante para los principiantes, pero con las herramientas adecuadas como la guía de corte ProFix 126, incluso los novatos pueden crear proyectos impresionantes. En este artículo, te presentamos 5 proyectos perfectos para iniciarte en el mundo de la carpintería.","marks":[]}],"markDefs":[]}]',
  'https://www.guiadecorte.cl/blog-imagenes/proyectos-principiantes.webp',
  CURRENT_TIMESTAMP - INTERVAL '7 days',
  'Ana Gómez',
  ARRAY['principiantes', 'proyectos', 'carpintería', 'guía de corte', 'DIY'],
  '5 Proyectos de Carpintería Fáciles para Principiantes con Guía de Corte',
  'Descubre 5 proyectos de carpintería sencillos pero impresionantes que cualquier principiante puede realizar utilizando una guía de corte ProFix 126.',
  'Proyectos DIY',
  TRUE
)
ON CONFLICT (slug) 
DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  image_url = EXCLUDED.image_url,
  author = EXCLUDED.author,
  tags = EXCLUDED.tags,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  category = EXCLUDED.category,
  is_published = EXCLUDED.is_published;

-- Artículo 3: Guía de mantenimiento para herramientas de carpintería
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  image_url,
  published_at,
  author,
  tags,
  meta_title,
  meta_description,
  category,
  is_published
)
VALUES (
  'Guía de mantenimiento para herramientas de carpintería',
  'guia-mantenimiento-herramientas-carpinteria',
  'Aprende a mantener tus herramientas de carpintería en óptimas condiciones para prolongar su vida útil y garantizar resultados profesionales en cada proyecto.',
  '[{"_type":"block","style":"normal","children":[{"_type":"span","text":"El mantenimiento adecuado de tus herramientas de carpintería es fundamental para garantizar su durabilidad y precisión. En esta guía, te explicamos paso a paso cómo cuidar correctamente cada una de tus herramientas, incluyendo tu guía de corte ProFix 126.","marks":[]}],"markDefs":[]}]',
  'https://www.guiadecorte.cl/blog-imagenes/mantenimiento-herramientas.webp',
  CURRENT_TIMESTAMP - INTERVAL '14 days',
  'Roberto Sánchez',
  ARRAY['mantenimiento', 'herramientas', 'carpintería', 'cuidados', 'durabilidad'],
  'Guía Completa de Mantenimiento para Herramientas de Carpintería',
  'Descubre cómo mantener tus herramientas de carpintería en perfecto estado para prolongar su vida útil y obtener resultados profesionales en cada proyecto.',
  'Mantenimiento',
  TRUE
)
ON CONFLICT (slug) 
DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  image_url = EXCLUDED.image_url,
  author = EXCLUDED.author,
  tags = EXCLUDED.tags,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  category = EXCLUDED.category,
  is_published = EXCLUDED.is_published;