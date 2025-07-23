-- Insertar artículos de blog con contenido simple

-- Primer artículo
INSERT INTO blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  image_url, 
  published_at, 
  author, 
  tags, 
  category, 
  meta_title, 
  meta_description, 
  is_published,
  image_alt
)
VALUES (
  'Cómo lograr cortes perfectos con tu guía ProFix 126',
  'como-lograr-cortes-perfectos-guia-profix-126',
  'Descubre las mejores técnicas y consejos para aprovechar al máximo tu guía de corte ProFix 126 y conseguir resultados profesionales en todos tus proyectos de carpintería.',
  'Contenido del artículo sobre cómo lograr cortes perfectos con la guía ProFix 126.',
  'https://www.guiadecorte.cl/blog-imagenes/cortes-perfectos-guia.webp',
  NOW() - INTERVAL '2 days',
  'Carlos Martínez',
  ARRAY['carpintería', 'guía de corte', 'técnicas', 'herramientas', 'ProFix 126'],
  'Tutoriales',
  'Guía Completa: Cómo Lograr Cortes Perfectos con la Guía ProFix 126',
  'Aprende técnicas profesionales para realizar cortes precisos con tu guía de corte ProFix 126. Consejos, mantenimiento y proyectos recomendados.',
  true,
  'Guía de corte ProFix 126 en uso para cortes perfectos'
);

-- Segundo artículo
INSERT INTO blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  image_url, 
  published_at, 
  author, 
  tags, 
  category, 
  meta_title, 
  meta_description, 
  is_published,
  image_alt
)
VALUES (
  '5 proyectos de carpintería para principiantes con guía de corte',
  '5-proyectos-carpinteria-principiantes-guia-corte',
  'Iníciate en el mundo de la carpintería con estos 5 proyectos sencillos pero impresionantes que podrás realizar fácilmente utilizando tu guía de corte ProFix 126.',
  'Contenido del artículo sobre 5 proyectos de carpintería para principiantes con guía de corte.',
  'https://www.guiadecorte.cl/blog-imagenes/proyectos-principiantes.webp',
  NOW() - INTERVAL '7 days',
  'Ana Gómez',
  ARRAY['principiantes', 'proyectos', 'carpintería', 'guía de corte', 'DIY'],
  'Proyectos DIY',
  '5 Proyectos de Carpintería Fáciles para Principiantes con Guía de Corte',
  'Descubre 5 proyectos de carpintería sencillos pero impresionantes que cualquier principiante puede realizar utilizando una guía de corte ProFix 126.',
  true,
  'Proyectos de carpintería para principiantes con guía de corte'
);

-- Tercer artículo
INSERT INTO blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  image_url, 
  published_at, 
  author, 
  tags, 
  category, 
  meta_title, 
  meta_description, 
  is_published,
  image_alt
)
VALUES (
  'Guía de mantenimiento para herramientas de carpintería',
  'guia-mantenimiento-herramientas-carpinteria',
  'Aprende a mantener tus herramientas de carpintería en óptimas condiciones para prolongar su vida útil y garantizar resultados profesionales en cada proyecto.',
  'Contenido del artículo sobre mantenimiento de herramientas de carpintería.',
  'https://www.guiadecorte.cl/blog-imagenes/mantenimiento-herramientas.webp',
  NOW() - INTERVAL '14 days',
  'Roberto Sánchez',
  ARRAY['mantenimiento', 'herramientas', 'carpintería', 'cuidados', 'durabilidad'],
  'Mantenimiento',
  'Guía Completa de Mantenimiento para Herramientas de Carpintería',
  'Descubre cómo mantener tus herramientas de carpintería en perfecto estado para prolongar su vida útil y obtener resultados profesionales en cada proyecto.',
  true,
  'Mantenimiento de herramientas de carpintería'
);