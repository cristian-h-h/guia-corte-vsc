-- Script SQL simplificado para configurar la tabla de blog

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