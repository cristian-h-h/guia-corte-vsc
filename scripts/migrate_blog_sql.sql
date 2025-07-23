-- Script SQL para configurar la tabla de blog y migrar los artículos de muestra

-- Crear extensión UUID si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla de artículos de blog si no existe
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Añadir columna image_alt si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'blog_posts' 
    AND column_name = 'image_alt'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN image_alt TEXT;
  END IF;
END
$$;

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);

-- Habilitar RLS en la tabla
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad para la tabla blog_posts
DROP POLICY IF EXISTS "Permitir SELECT para todos" ON blog_posts;
CREATE POLICY "Permitir SELECT para todos" 
  ON blog_posts FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" ON blog_posts;
CREATE POLICY "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" 
  ON blog_posts FOR ALL 
  USING (auth.role() = 'authenticated');

-- Crear bucket para imágenes de blog si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Insertar artículos de blog de muestra si no existen
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
  is_published
)
SELECT 
  'Cómo lograr cortes perfectos con tu guía ProFix 126',
  'como-lograr-cortes-perfectos-guia-profix-126',
  'Descubre las mejores técnicas y consejos para aprovechar al máximo tu guía de corte ProFix 126 y conseguir resultados profesionales en todos tus proyectos de carpintería.',
  '<h2>Introducción a la Guía ProFix 126</h2><p>La guía de corte ProFix 126 es una herramienta esencial para cualquier carpintero que busque precisión en sus cortes. Con su diseño innovador y materiales de alta calidad, esta guía te permitirá realizar cortes perfectos en una variedad de materiales.</p><h2>Preparación de la guía</h2><p>Antes de comenzar a utilizar tu guía ProFix 126, es importante asegurarte de que esté correctamente ajustada y limpia. Verifica que todas las piezas estén bien apretadas y que la superficie de la guía esté libre de polvo o residuos que puedan afectar la precisión del corte.</p><h2>Técnicas de corte</h2><p>Para lograr cortes perfectos con tu guía ProFix 126, sigue estos pasos:</p><ol><li>Marca claramente la línea de corte en tu material</li><li>Posiciona la guía alineada con la marca</li><li>Asegura la guía firmemente con las abrazaderas incluidas</li><li>Realiza un corte de prueba en un material similar</li><li>Ajusta la profundidad de corte según sea necesario</li><li>Realiza el corte final manteniendo una velocidad constante</li></ol><h2>Mantenimiento de la guía</h2><p>Para mantener tu guía ProFix 126 en óptimas condiciones, límpiala después de cada uso y guárdala en un lugar seco. Revisa periódicamente que todas las piezas estén en buen estado y reemplaza cualquier componente dañado.</p><h2>Conclusión</h2><p>Con estas técnicas y consejos, podrás aprovechar al máximo tu guía de corte ProFix 126 y lograr cortes perfectos en todos tus proyectos de carpintería. Recuerda que la práctica hace al maestro, así que no dudes en experimentar con diferentes materiales y técnicas para mejorar tus habilidades.</p>',
  'https://www.guiadecorte.cl/blog-imagenes/cortes-perfectos-guia.webp',
  NOW() - INTERVAL '2 days',
  'Carlos Martínez',
  ARRAY['carpintería', 'guía de corte', 'técnicas', 'herramientas', 'ProFix 126'],
  'Tutoriales',
  'Guía Completa: Cómo Lograr Cortes Perfectos con la Guía ProFix 126',
  'Aprende técnicas profesionales para realizar cortes precisos con tu guía de corte ProFix 126. Consejos, mantenimiento y proyectos recomendados.',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM blog_posts 
  WHERE slug = 'como-lograr-cortes-perfectos-guia-profix-126'
);

-- Actualizar el campo image_alt para el primer artículo
UPDATE blog_posts 
SET image_alt = 'Guía de corte ProFix 126 en uso para cortes perfectos'
WHERE slug = 'como-lograr-cortes-perfectos-guia-profix-126'
AND image_alt IS NULL;

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
  is_published
)
SELECT 
  '5 proyectos de carpintería para principiantes con guía de corte',
  '5-proyectos-carpinteria-principiantes-guia-corte',
  'Iníciate en el mundo de la carpintería con estos 5 proyectos sencillos pero impresionantes que podrás realizar fácilmente utilizando tu guía de corte ProFix 126.',
  '<h2>Introducción</h2><p>La carpintería puede parecer intimidante para los principiantes, pero con las herramientas adecuadas y proyectos simples, cualquiera puede crear piezas impresionantes. La guía de corte ProFix 126 es perfecta para principiantes debido a su facilidad de uso y precisión.</p><h2>Proyecto 1: Estante flotante</h2><p>Un estante flotante es un proyecto perfecto para principiantes. Con tu guía ProFix 126, podrás cortar la madera con precisión y crear un estante elegante y funcional para tu hogar.</p><h3>Materiales necesarios:</h3><ul><li>Tabla de madera de 20x120 cm</li><li>Tornillos y tacos</li><li>Lija</li><li>Barniz o pintura</li></ul><h3>Pasos:</h3><ol><li>Mide y marca la longitud deseada para tu estante</li><li>Utiliza la guía ProFix 126 para realizar un corte recto y preciso</li><li>Lija los bordes y la superficie</li><li>Aplica barniz o pintura según tu preferencia</li><li>Instala el estante en la pared utilizando tornillos y tacos</li></ol><h2>Proyecto 2: Tabla de cortar</h2><p>Una tabla de cortar personalizada es útil y sencilla de hacer. Con la guía ProFix 126, podrás cortar la madera con precisión y crear una tabla de cortar única.</p><h3>Materiales necesarios:</h3><ul><li>Bloque de madera dura (como arce o nogal)</li><li>Aceite mineral para madera</li><li>Lija de diferentes granos</li></ul><h3>Pasos:</h3><ol><li>Mide y marca las dimensiones deseadas para tu tabla</li><li>Utiliza la guía ProFix 126 para realizar cortes rectos y precisos</li><li>Lija la superficie y los bordes, comenzando con un grano grueso y terminando con uno fino</li><li>Redondea ligeramente los bordes con la lija</li><li>Aplica varias capas de aceite mineral para proteger la madera</li></ol><h2>Proyecto 3: Organizador de escritorio</h2><p>Un organizador de escritorio es práctico y fácil de construir. Con la guía ProFix 126, podrás cortar las piezas con precisión y crear un organizador funcional.</p><h2>Proyecto 4: Caja decorativa</h2><p>Una caja decorativa es versátil y puede servir para almacenar diversos objetos. Con la guía ProFix 126, podrás cortar las piezas con precisión y ensamblarlas fácilmente.</p><h2>Proyecto 5: Marco de fotos</h2><p>Un marco de fotos personalizado es un proyecto sencillo pero con gran impacto. Con la guía ProFix 126, podrás cortar las piezas con ángulos precisos y crear un marco elegante.</p><h2>Conclusión</h2><p>Estos cinco proyectos son perfectos para principiantes que quieren iniciarse en la carpintería utilizando una guía de corte. La ProFix 126 te ayudará a lograr cortes precisos y profesionales, permitiéndote crear piezas de calidad desde el primer intento.</p>',
  'https://www.guiadecorte.cl/blog-imagenes/proyectos-principiantes.webp',
  NOW() - INTERVAL '7 days',
  'Ana Gómez',
  ARRAY['principiantes', 'proyectos', 'carpintería', 'guía de corte', 'DIY'],
  'Proyectos DIY',
  '5 Proyectos de Carpintería Fáciles para Principiantes con Guía de Corte',
  'Descubre 5 proyectos de carpintería sencillos pero impresionantes que cualquier principiante puede realizar utilizando una guía de corte ProFix 126.',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM blog_posts 
  WHERE slug = '5-proyectos-carpinteria-principiantes-guia-corte'
);

-- Actualizar el campo image_alt para el segundo artículo
UPDATE blog_posts 
SET image_alt = 'Proyectos de carpintería para principiantes con guía de corte'
WHERE slug = '5-proyectos-carpinteria-principiantes-guia-corte'
AND image_alt IS NULL;

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
  is_published
)
SELECT 
  'Guía de mantenimiento para herramientas de carpintería',
  'guia-mantenimiento-herramientas-carpinteria',
  'Aprende a mantener tus herramientas de carpintería en óptimas condiciones para prolongar su vida útil y garantizar resultados profesionales en cada proyecto.',
  '<h2>Importancia del mantenimiento de herramientas</h2><p>El mantenimiento adecuado de tus herramientas de carpintería no solo prolonga su vida útil, sino que también garantiza resultados precisos y profesionales en cada proyecto. Herramientas bien mantenidas son más seguras y eficientes.</p><h2>Mantenimiento de herramientas de corte</h2><p>Las herramientas de corte, como sierras y cuchillos, requieren un mantenimiento regular para mantener su filo y precisión.</p><h3>Sierras circulares y caladoras</h3><ul><li>Limpia el polvo y los residuos después de cada uso</li><li>Verifica regularmente el estado de las cuchillas y reemplázalas cuando sea necesario</li><li>Lubrica las partes móviles según las recomendaciones del fabricante</li><li>Almacena en un lugar seco para evitar la oxidación</li></ul><h3>Guía de corte ProFix 126</h3><ul><li>Limpia la superficie de la guía después de cada uso para eliminar polvo y residuos</li><li>Verifica que todas las piezas estén bien ajustadas</li><li>Inspecciona regularmente los rieles para asegurarte de que estén rectos y sin daños</li><li>Aplica ocasionalmente un lubricante seco en las partes móviles</li></ul><h2>Mantenimiento de herramientas eléctricas</h2><p>Las herramientas eléctricas requieren un cuidado especial para garantizar su funcionamiento seguro y eficiente.</p><ul><li>Limpia regularmente las rejillas de ventilación para evitar el sobrecalentamiento</li><li>Verifica el estado de los cables y enchufes</li><li>Sigue las recomendaciones del fabricante para la lubricación</li><li>Almacena en un lugar seco y protegido</li></ul><h2>Mantenimiento de herramientas manuales</h2><p>Las herramientas manuales, como martillos, destornilladores y alicates, también necesitan mantenimiento regular.</p><ul><li>Limpia después de cada uso</li><li>Verifica que los mangos estén en buen estado</li><li>Aplica aceite en las partes metálicas para prevenir la oxidación</li><li>Almacena organizadamente para evitar daños</li></ul><h2>Calendario de mantenimiento</h2><p>Establecer un calendario de mantenimiento te ayudará a mantener tus herramientas en óptimas condiciones.</p><ul><li>Diario: Limpieza básica después de cada uso</li><li>Semanal: Inspección visual de todas las herramientas</li><li>Mensual: Lubricación y ajustes necesarios</li><li>Trimestral: Mantenimiento profundo y reemplazo de piezas desgastadas</li></ul><h2>Conclusión</h2><p>El mantenimiento adecuado de tus herramientas de carpintería es una inversión que se traduce en mejores resultados y mayor durabilidad. Dedica tiempo regularmente a cuidar tus herramientas y notarás la diferencia en tus proyectos.</p>',
  'https://www.guiadecorte.cl/blog-imagenes/mantenimiento-herramientas.webp',
  NOW() - INTERVAL '14 days',
  'Roberto Sánchez',
  ARRAY['mantenimiento', 'herramientas', 'carpintería', 'cuidados', 'durabilidad'],
  'Mantenimiento',
  'Guía Completa de Mantenimiento para Herramientas de Carpintería',
  'Descubre cómo mantener tus herramientas de carpintería en perfecto estado para prolongar su vida útil y obtener resultados profesionales en cada proyecto.',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM blog_posts 
  WHERE slug = 'guia-mantenimiento-herramientas-carpinteria'
);

-- Actualizar el campo image_alt para el tercer artículo
UPDATE blog_posts 
SET image_alt = 'Mantenimiento de herramientas de carpintería'
WHERE slug = 'guia-mantenimiento-herramientas-carpinteria'
AND image_alt IS NULL;