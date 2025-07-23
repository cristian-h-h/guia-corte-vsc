-- Insertar segundo artículo de blog
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
  '5 proyectos de carpintería para principiantes con guía de corte',
  '5-proyectos-carpinteria-principiantes-guia-corte',
  'Iníciate en el mundo de la carpintería con estos 5 proyectos sencillos pero impresionantes que podrás realizar fácilmente utilizando tu guía de corte ProFix 126.',
  E'<h2>Introducción</h2><p>La carpintería puede parecer intimidante para los principiantes, pero con las herramientas adecuadas y proyectos simples, cualquiera puede crear piezas impresionantes. La guía de corte ProFix 126 es perfecta para principiantes debido a su facilidad de uso y precisión.</p><h2>Proyecto 1: Estante flotante</h2><p>Un estante flotante es un proyecto perfecto para principiantes. Con tu guía ProFix 126, podrás cortar la madera con precisión y crear un estante elegante y funcional para tu hogar.</p><h3>Materiales necesarios:</h3><ul><li>Tabla de madera de 20x120 cm</li><li>Tornillos y tacos</li><li>Lija</li><li>Barniz o pintura</li></ul><h3>Pasos:</h3><ol><li>Mide y marca la longitud deseada para tu estante</li><li>Utiliza la guía ProFix 126 para realizar un corte recto y preciso</li><li>Lija los bordes y la superficie</li><li>Aplica barniz o pintura según tu preferencia</li><li>Instala el estante en la pared utilizando tornillos y tacos</li></ol><h2>Proyecto 2: Tabla de cortar</h2><p>Una tabla de cortar personalizada es útil y sencilla de hacer. Con la guía ProFix 126, podrás cortar la madera con precisión y crear una tabla de cortar única.</p><h3>Materiales necesarios:</h3><ul><li>Bloque de madera dura (como arce o nogal)</li><li>Aceite mineral para madera</li><li>Lija de diferentes granos</li></ul><h3>Pasos:</h3><ol><li>Mide y marca las dimensiones deseadas para tu tabla</li><li>Utiliza la guía ProFix 126 para realizar cortes rectos y precisos</li><li>Lija la superficie y los bordes, comenzando con un grano grueso y terminando con uno fino</li><li>Redondea ligeramente los bordes con la lija</li><li>Aplica varias capas de aceite mineral para proteger la madera</li></ol><h2>Proyecto 3: Organizador de escritorio</h2><p>Un organizador de escritorio es práctico y fácil de construir. Con la guía ProFix 126, podrás cortar las piezas con precisión y crear un organizador funcional.</p><h2>Proyecto 4: Caja decorativa</h2><p>Una caja decorativa es versátil y puede servir para almacenar diversos objetos. Con la guía ProFix 126, podrás cortar las piezas con precisión y ensamblarlas fácilmente.</p><h2>Proyecto 5: Marco de fotos</h2><p>Un marco de fotos personalizado es un proyecto sencillo pero con gran impacto. Con la guía ProFix 126, podrás cortar las piezas con ángulos precisos y crear un marco elegante.</p><h2>Conclusión</h2><p>Estos cinco proyectos son perfectos para principiantes que quieren iniciarse en la carpintería utilizando una guía de corte. La ProFix 126 te ayudará a lograr cortes precisos y profesionales, permitiéndote crear piezas de calidad desde el primer intento.</p>',
  'https://www.guiadecorte.cl/blog-imagenes/proyectos-principiantes.webp',
  NOW() - INTERVAL '7 days',
  'Ana Gómez',
  ARRAY['principiantes', 'proyectos', 'carpintería', 'guía de corte', 'DIY'],
  'Proyectos DIY',
  '5 Proyectos de Carpintería Fáciles para Principiantes con Guía de Corte',
  'Descubre 5 proyectos de carpintería sencillos pero impresionantes que cualquier principiante puede realizar utilizando una guía de corte ProFix 126.',
  true,
  'Proyectos de carpintería para principiantes con guía de corte'
WHERE NOT EXISTS (
  SELECT 1 FROM blog_posts 
  WHERE slug = '5-proyectos-carpinteria-principiantes-guia-corte'
);