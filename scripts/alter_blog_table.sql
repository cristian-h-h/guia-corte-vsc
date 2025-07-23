-- Script para modificar la tabla blog_posts

-- Opción 1: Cambiar el tipo de la columna content de JSONB a TEXT
-- Esto solo funcionará si no hay datos importantes en la columna
ALTER TABLE blog_posts ALTER COLUMN content TYPE TEXT USING content::TEXT;

-- Opción 2: Si la opción 1 no funciona, podemos crear una nueva columna
-- ALTER TABLE blog_posts ADD COLUMN content_text TEXT;

-- Opción 3: Si ninguna de las anteriores funciona, podemos recrear la tabla
-- CREATE TABLE blog_posts_new (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   title TEXT NOT NULL,
--   slug TEXT NOT NULL UNIQUE,
--   excerpt TEXT,
--   content TEXT,
--   image_url TEXT,
--   image_alt TEXT,
--   published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   author TEXT,
--   tags TEXT[] DEFAULT '{}',
--   category TEXT,
--   meta_title TEXT,
--   meta_description TEXT,
--   meta_keywords TEXT,
--   is_published BOOLEAN DEFAULT true,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Verificar la estructura después de los cambios
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public' 
  AND table_name = 'blog_posts'
ORDER BY 
  ordinal_position;