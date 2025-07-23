-- Crear función para verificar/crear la tabla de imágenes de productos
CREATE OR REPLACE FUNCTION create_product_images_table_if_not_exists()
RETURNS void AS $$
BEGIN
  -- Verificar si la extensión uuid-ossp está instalada
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  
  -- Crear tabla de imágenes de productos si no existe
  IF NOT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'product_images'
  ) THEN
    CREATE TABLE public.product_images (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      product_id TEXT NOT NULL,
      url TEXT NOT NULL,
      alt_text TEXT,
      position INTEGER DEFAULT 0,
      is_main BOOLEAN DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Comentarios para la tabla y columnas
    COMMENT ON TABLE public.product_images IS 'Almacena metadatos de imágenes de productos';
    COMMENT ON COLUMN public.product_images.id IS 'Identificador único de la imagen';
    COMMENT ON COLUMN public.product_images.product_id IS 'ID del producto al que pertenece la imagen';
    COMMENT ON COLUMN public.product_images.url IS 'URL de la imagen en Supabase Storage';
    COMMENT ON COLUMN public.product_images.alt_text IS 'Texto alternativo para SEO y accesibilidad';
    COMMENT ON COLUMN public.product_images.position IS 'Posición de la imagen en la galería del producto';
    COMMENT ON COLUMN public.product_images.is_main IS 'Indica si es la imagen principal del producto';
    
    -- Índices para mejorar el rendimiento
    CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
    CREATE INDEX idx_product_images_position ON public.product_images(position);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Ejecutar la función
SELECT create_product_images_table_if_not_exists();

-- Crear políticas de seguridad para la tabla product_images
DO $$
BEGIN
  -- Habilitar RLS en la tabla
  ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
  
  -- Eliminar políticas existentes si las hay
  DROP POLICY IF EXISTS "Permitir SELECT para todos" ON public.product_images;
  DROP POLICY IF EXISTS "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" ON public.product_images;
  
  -- Crear políticas
  CREATE POLICY "Permitir SELECT para todos" 
    ON public.product_images FOR SELECT 
    USING (true);
    
  CREATE POLICY "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" 
    ON public.product_images FOR ALL 
    USING (auth.role() = 'authenticated');
END
$$;