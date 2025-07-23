-- Crear buckets para almacenar imágenes
-- Ejecutar este script en el SQL Editor de Supabase

-- Bucket para imágenes de blog
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para imágenes de productos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para imágenes de la galería
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de seguridad para permitir acceso público a las imágenes
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id IN ('blog-images', 'product-images', 'gallery-images'));

-- Políticas para permitir a usuarios autenticados subir archivos
CREATE POLICY "Authenticated Users Can Upload" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id IN ('blog-images', 'product-images', 'gallery-images'));

-- Políticas para permitir a usuarios autenticados actualizar sus propios archivos
CREATE POLICY "Authenticated Users Can Update Own Files" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner AND bucket_id IN ('blog-images', 'product-images', 'gallery-images'));

-- Políticas para permitir a usuarios autenticados eliminar sus propios archivos
CREATE POLICY "Authenticated Users Can Delete Own Files" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner AND bucket_id IN ('blog-images', 'product-images', 'gallery-images'));