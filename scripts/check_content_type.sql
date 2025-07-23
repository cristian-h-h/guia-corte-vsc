-- Script para verificar el tipo de la columna content

-- Verificar el tipo de la columna content
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public' 
  AND table_name = 'blog_posts'
  AND column_name = 'content';

-- Si la columna es de tipo JSONB, podemos cambiarla a TEXT
-- ALTER TABLE blog_posts ALTER COLUMN content TYPE TEXT USING content::TEXT;