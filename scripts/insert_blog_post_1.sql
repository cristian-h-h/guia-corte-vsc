-- Insertar primer artículo de blog
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
SELECT 
  'Cómo lograr cortes perfectos con tu guía ProFix 126',
  'como-lograr-cortes-perfectos-guia-profix-126',
  'Descubre las mejores técnicas y consejos para aprovechar al máximo tu guía de corte ProFix 126 y conseguir resultados profesionales en todos tus proyectos de carpintería.',
  E'<h2>Introducción a la Guía ProFix 126</h2><p>La guía de corte ProFix 126 es una herramienta esencial para cualquier carpintero que busque precisión en sus cortes. Con su diseño innovador y materiales de alta calidad, esta guía te permitirá realizar cortes perfectos en una variedad de materiales.</p><h2>Preparación de la guía</h2><p>Antes de comenzar a utilizar tu guía ProFix 126, es importante asegurarte de que esté correctamente ajustada y limpia. Verifica que todas las piezas estén bien apretadas y que la superficie de la guía esté libre de polvo o residuos que puedan afectar la precisión del corte.</p><h2>Técnicas de corte</h2><p>Para lograr cortes perfectos con tu guía ProFix 126, sigue estos pasos:</p><ol><li>Marca claramente la línea de corte en tu material</li><li>Posiciona la guía alineada con la marca</li><li>Asegura la guía firmemente con las abrazaderas incluidas</li><li>Realiza un corte de prueba en un material similar</li><li>Ajusta la profundidad de corte según sea necesario</li><li>Realiza el corte final manteniendo una velocidad constante</li></ol><h2>Mantenimiento de la guía</h2><p>Para mantener tu guía ProFix 126 en óptimas condiciones, límpiala después de cada uso y guárdala en un lugar seco. Revisa periódicamente que todas las piezas estén en buen estado y reemplaza cualquier componente dañado.</p><h2>Conclusión</h2><p>Con estas técnicas y consejos, podrás aprovechar al máximo tu guía de corte ProFix 126 y lograr cortes perfectos en todos tus proyectos de carpintería. Recuerda que la práctica hace al maestro, así que no dudes en experimentar con diferentes materiales y técnicas para mejorar tus habilidades.</p>',
  'https://www.guiadecorte.cl/blog-imagenes/cortes-perfectos-guia.webp',
  NOW() - INTERVAL '2 days',
  'Carlos Martínez',
  ARRAY['carpintería', 'guía de corte', 'técnicas', 'herramientas', 'ProFix 126'],
  'Tutoriales',
  'Guía Completa: Cómo Lograr Cortes Perfectos con la Guía ProFix 126',
  'Aprende técnicas profesionales para realizar cortes precisos con tu guía de corte ProFix 126. Consejos, mantenimiento y proyectos recomendados.',
  true,
  'Guía de corte ProFix 126 en uso para cortes perfectos'
WHERE NOT EXISTS (
  SELECT 1 FROM blog_posts 
  WHERE slug = 'como-lograr-cortes-perfectos-guia-profix-126'
);