-- Paso 2: Crear la tabla o añadir la columna slug si no existe

-- Habilitar la extensión uuid-ossp si no está habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear la tabla si no existe
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
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

-- Añadir la columna slug si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'blog_posts'
    AND column_name = 'slug'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN slug TEXT;
    RAISE NOTICE 'Columna slug añadida a la tabla blog_posts.';
  ELSE
    RAISE NOTICE 'La columna slug ya existe en la tabla blog_posts.';
  END IF;
END
$$;