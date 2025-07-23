-- Insertar tercer artículo de blog
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
  'Guía de mantenimiento para herramientas de carpintería',
  'guia-mantenimiento-herramientas-carpinteria',
  'Aprende a mantener tus herramientas de carpintería en óptimas condiciones para prolongar su vida útil y garantizar resultados profesionales en cada proyecto.',
  E'<h2>Importancia del mantenimiento de herramientas</h2><p>El mantenimiento adecuado de tus herramientas de carpintería no solo prolonga su vida útil, sino que también garantiza resultados precisos y profesionales en cada proyecto. Herramientas bien mantenidas son más seguras y eficientes.</p><h2>Mantenimiento de herramientas de corte</h2><p>Las herramientas de corte, como sierras y cuchillos, requieren un mantenimiento regular para mantener su filo y precisión.</p><h3>Sierras circulares y caladoras</h3><ul><li>Limpia el polvo y los residuos después de cada uso</li><li>Verifica regularmente el estado de las cuchillas y reemplázalas cuando sea necesario</li><li>Lubrica las partes móviles según las recomendaciones del fabricante</li><li>Almacena en un lugar seco para evitar la oxidación</li></ul><h3>Guía de corte ProFix 126</h3><ul><li>Limpia la superficie de la guía después de cada uso para eliminar polvo y residuos</li><li>Verifica que todas las piezas estén bien ajustadas</li><li>Inspecciona regularmente los rieles para asegurarte de que estén rectos y sin daños</li><li>Aplica ocasionalmente un lubricante seco en las partes móviles</li></ul><h2>Mantenimiento de herramientas eléctricas</h2><p>Las herramientas eléctricas requieren un cuidado especial para garantizar su funcionamiento seguro y eficiente.</p><ul><li>Limpia regularmente las rejillas de ventilación para evitar el sobrecalentamiento</li><li>Verifica el estado de los cables y enchufes</li><li>Sigue las recomendaciones del fabricante para la lubricación</li><li>Almacena en un lugar seco y protegido</li></ul><h2>Mantenimiento de herramientas manuales</h2><p>Las herramientas manuales, como martillos, destornilladores y alicates, también necesitan mantenimiento regular.</p><ul><li>Limpia después de cada uso</li><li>Verifica que los mangos estén en buen estado</li><li>Aplica aceite en las partes metálicas para prevenir la oxidación</li><li>Almacena organizadamente para evitar daños</li></ul><h2>Calendario de mantenimiento</h2><p>Establecer un calendario de mantenimiento te ayudará a mantener tus herramientas en óptimas condiciones.</p><ul><li>Diario: Limpieza básica después de cada uso</li><li>Semanal: Inspección visual de todas las herramientas</li><li>Mensual: Lubricación y ajustes necesarios</li><li>Trimestral: Mantenimiento profundo y reemplazo de piezas desgastadas</li></ul><h2>Conclusión</h2><p>El mantenimiento adecuado de tus herramientas de carpintería es una inversión que se traduce en mejores resultados y mayor durabilidad. Dedica tiempo regularmente a cuidar tus herramientas y notarás la diferencia en tus proyectos.</p>',
  'https://www.guiadecorte.cl/blog-imagenes/mantenimiento-herramientas.webp',
  NOW() - INTERVAL '14 days',
  'Roberto Sánchez',
  ARRAY['mantenimiento', 'herramientas', 'carpintería', 'cuidados', 'durabilidad'],
  'Mantenimiento',
  'Guía Completa de Mantenimiento para Herramientas de Carpintería',
  'Descubre cómo mantener tus herramientas de carpintería en perfecto estado para prolongar su vida útil y obtener resultados profesionales en cada proyecto.',
  true,
  'Mantenimiento de herramientas de carpintería'
WHERE NOT EXISTS (
  SELECT 1 FROM blog_posts 
  WHERE slug = 'guia-mantenimiento-herramientas-carpinteria'
);