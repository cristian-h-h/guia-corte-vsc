-- Script para crear la tabla blog_posts en Supabase si no existe

-- Habilitar la extensión uuid-ossp si no está habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear la tabla blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  excerpt TEXT,
  content JSONB,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  author TEXT,
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  category TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Añadir restricción UNIQUE a slug si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'blog_posts_slug_key' AND conrelid = 'blog_posts'::regclass
  ) THEN
    ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);
  END IF;
END
$$;

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);

-- Crear función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para actualizar automáticamente updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentar la tabla
COMMENT ON TABLE blog_posts IS 'Tabla para almacenar los artículos del blog';
COMMENT ON COLUMN blog_posts.id IS 'Identificador único del artículo';
COMMENT ON COLUMN blog_posts.title IS 'Título del artículo';
COMMENT ON COLUMN blog_posts.slug IS 'Slug único para la URL del artículo';
COMMENT ON COLUMN blog_posts.excerpt IS 'Extracto o resumen del artículo';
COMMENT ON COLUMN blog_posts.content IS 'Contenido del artículo en formato PortableText (JSONB)';
COMMENT ON COLUMN blog_posts.image_url IS 'URL de la imagen principal del artículo';
COMMENT ON COLUMN blog_posts.published_at IS 'Fecha de publicación del artículo';
COMMENT ON COLUMN blog_posts.author IS 'Autor del artículo';
COMMENT ON COLUMN blog_posts.tags IS 'Etiquetas o palabras clave del artículo';
COMMENT ON COLUMN blog_posts.meta_title IS 'Título para SEO';
COMMENT ON COLUMN blog_posts.meta_description IS 'Descripción para SEO';
COMMENT ON COLUMN blog_posts.category IS 'Categoría del artículo';
COMMENT ON COLUMN blog_posts.is_published IS 'Indica si el artículo está publicado';
COMMENT ON COLUMN blog_posts.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN blog_posts.updated_at IS 'Fecha de última actualización del registro';