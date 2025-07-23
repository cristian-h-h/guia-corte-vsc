-- Script SQL para crear la tabla gallery_images si no existe

-- Crear la tabla gallery_images
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

-- Crear índice para ordenar por el campo "order"
CREATE INDEX IF NOT EXISTS gallery_images_order_idx ON gallery_images ("order");

-- Crear índice para filtrar por categoría
CREATE INDEX IF NOT EXISTS gallery_images_category_idx ON gallery_images (category);

-- Configurar políticas de seguridad (RLS)
-- Permitir SELECT a todos los usuarios (incluyendo anónimos)
CREATE POLICY IF NOT EXISTS "Allow public read access" 
  ON gallery_images FOR SELECT 
  USING (true);

-- Permitir INSERT, UPDATE, DELETE solo a usuarios autenticados
CREATE POLICY IF NOT EXISTS "Allow authenticated insert" 
  ON gallery_images FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated update" 
  ON gallery_images FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated delete" 
  ON gallery_images FOR DELETE 
  TO authenticated 
  USING (true);

-- Habilitar Row Level Security
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Comentarios para documentación
COMMENT ON TABLE gallery_images IS 'Tabla para almacenar imágenes de la galería del sitio';
COMMENT ON COLUMN gallery_images.src IS 'URL de la imagen';
COMMENT ON COLUMN gallery_images.alt IS 'Texto alternativo para accesibilidad y SEO';
COMMENT ON COLUMN gallery_images.description IS 'Descripción detallada de la imagen';
COMMENT ON COLUMN gallery_images."order" IS 'Orden de visualización de la imagen';
COMMENT ON COLUMN gallery_images.category IS 'Categoría de la imagen (producto, uso, detalle, proyecto)';