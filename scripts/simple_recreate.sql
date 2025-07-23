-- Script simplificado para recrear la tabla blog_posts
-- ADVERTENCIA: Este script eliminará la tabla existente y todos sus datos

-- Eliminar la tabla existente
DROP TABLE IF EXISTS blog_posts;

-- Crear la tabla blog_posts con la estructura correcta
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
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