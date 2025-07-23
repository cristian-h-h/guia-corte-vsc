-- Script SQL para migrar las imágenes de la galería a Supabase

-- Crear extensión UUID si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla de imágenes de galería si no existe
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  description TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  category TEXT DEFAULT 'producto',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS gallery_images_order_idx ON gallery_images ("order");
CREATE INDEX IF NOT EXISTS gallery_images_category_idx ON gallery_images (category);

-- Habilitar RLS en la tabla
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad para la tabla gallery_images
DROP POLICY IF EXISTS "Permitir SELECT para todos" ON gallery_images;
CREATE POLICY "Permitir SELECT para todos" 
  ON gallery_images FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" ON gallery_images;
CREATE POLICY "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" 
  ON gallery_images FOR ALL 
  USING (auth.role() = 'authenticated');

-- Crear bucket para imágenes de galería si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Insertar imágenes de galería si no existen
INSERT INTO gallery_images (src, alt, description, "order", category)
SELECT 
  '/guia-imagenes/guia-corte-profix-126.webp',
  'Guía de Corte ProFix 126 - Vista general del producto',
  'Vista general de la Guía de Corte ProFix 126, mostrando su diseño en aluminio aeronáutico y sistema de ajuste rápido.',
  0,
  'producto'
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_images 
  WHERE src = '/guia-imagenes/guia-corte-profix-126.webp'
);

INSERT INTO gallery_images (src, alt, description, "order", category)
SELECT 
  '/guia-imagenes/corte-sierra-circular-profix-126.webp',
  'Guía ProFix 126 en uso con sierra circular para corte recto',
  'Demostración de corte recto con sierra circular utilizando la guía ProFix 126 en tablero de melamina.',
  1,
  'uso'
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_images 
  WHERE src = '/guia-imagenes/corte-sierra-circular-profix-126.webp'
);

INSERT INTO gallery_images (src, alt, description, "order", category)
SELECT 
  '/guia-imagenes/ajuste-recto-profix-126.webp',
  'Sistema de ajuste rápido de la Guía ProFix 126',
  'Detalle del sistema de ajuste rápido Quick-Lock que permite cambios de configuración en segundos.',
  2,
  'detalle'
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_images 
  WHERE src = '/guia-imagenes/ajuste-recto-profix-126.webp'
);

INSERT INTO gallery_images (src, alt, description, "order", category)
SELECT 
  '/guia-imagenes/guia-profix-126.webp',
  'Guía ProFix 126 con sistema de sujeción multidireccional',
  'Vista del sistema de sujeción multidireccional con topes ajustables en acero endurecido.',
  3,
  'producto'
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_images 
  WHERE src = '/guia-imagenes/guia-profix-126.webp'
);

INSERT INTO gallery_images (src, alt, description, "order", category)
SELECT 
  '/guia-imagenes/profix-126-guia-corte-recto.webp',
  'Guía ProFix 126 para cortes rectos de precisión',
  'Guía ProFix 126 preparada para realizar cortes rectos de precisión industrial en diversos materiales.',
  4,
  'producto'
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_images 
  WHERE src = '/guia-imagenes/profix-126-guia-corte-recto.webp'
);

INSERT INTO gallery_images (src, alt, description, "order", category)
SELECT 
  '/guia-imagenes/guia-corte-logo.png',
  'Logo oficial de Guía de Corte ProFix 126',
  'Logo oficial del producto Guía de Corte ProFix 126, símbolo de precisión en carpintería.',
  5,
  'detalle'
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_images 
  WHERE src = '/guia-imagenes/guia-corte-logo.png'
);

INSERT INTO gallery_images (src, alt, description, "order", category)
SELECT 
  '/guia-imagenes/guia-corte-router.webp',
  'Guía ProFix 126 con router para trabajos de precisión',
  'Uso de la guía ProFix 126 con router para realizar ranurados y acabados de precisión.',
  6,
  'uso'
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_images 
  WHERE src = '/guia-imagenes/guia-corte-router.webp'
);

INSERT INTO gallery_images (src, alt, description, "order", category)
SELECT 
  '/guia-imagenes/guia-corte-caladora.webp',
  'Guía ProFix 126 con sierra caladora para cortes rectos',
  'Aplicación de la guía ProFix 126 con sierra caladora para lograr cortes rectos perfectos.',
  7,
  'uso'
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_images 
  WHERE src = '/guia-imagenes/guia-corte-caladora.webp'
);

INSERT INTO gallery_images (src, alt, description, "order", category)
SELECT 
  '/guia-imagenes/guia-corte-materiales.webp',
  'Guía ProFix 126 con diversos materiales compatibles',
  'Demostración de la versatilidad de la guía ProFix 126 con diferentes materiales como madera, melamina y MDF.',
  8,
  'proyecto'
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_images 
  WHERE src = '/guia-imagenes/guia-corte-materiales.webp'
);

-- Crear tabla para videos de galería si no existe
CREATE TABLE IF NOT EXISTS gallery_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  youtube_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para ordenar videos
CREATE INDEX IF NOT EXISTS gallery_videos_order_idx ON gallery_videos ("order");

-- Habilitar RLS en la tabla de videos
ALTER TABLE gallery_videos ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad para la tabla gallery_videos
DROP POLICY IF EXISTS "Permitir SELECT para todos" ON gallery_videos;
CREATE POLICY "Permitir SELECT para todos" 
  ON gallery_videos FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" ON gallery_videos;
CREATE POLICY "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" 
  ON gallery_videos FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insertar videos de galería si no existen
INSERT INTO gallery_videos (youtube_id, title, description, "order")
SELECT 
  'shIy8jqR0tE',
  'Guía de Corte ProFix 126 - Demostración de uso',
  'Video demostrativo del uso de la Guía ProFix 126 para realizar cortes rectos perfectos con sierra circular.',
  0
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_videos 
  WHERE youtube_id = 'shIy8jqR0tE'
);

INSERT INTO gallery_videos (youtube_id, title, description, "order")
SELECT 
  'UHUVFCgoRSc',
  'Sistema Quick-Lock de la Guía ProFix 126',
  'Explicación detallada del sistema de ajuste rápido Quick-Lock que permite cambiar entre herramientas en 15 segundos.',
  1
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_videos 
  WHERE youtube_id = 'UHUVFCgoRSc'
);

INSERT INTO gallery_videos (youtube_id, title, description, "order")
SELECT 
  'JDyfjvraM2I',
  'Versatilidad de la Guía ProFix 126',
  'Demostración de la versatilidad de la Guía ProFix 126 con diferentes herramientas y materiales.',
  2
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_videos 
  WHERE youtube_id = 'JDyfjvraM2I'
);