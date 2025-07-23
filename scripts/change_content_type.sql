-- Script para cambiar el tipo de la columna content de JSONB a TEXT

-- Cambiar el tipo de la columna
ALTER TABLE blog_posts ALTER COLUMN content TYPE TEXT USING content::TEXT;

-- Verificar que el cambio se haya aplicado correctamente
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