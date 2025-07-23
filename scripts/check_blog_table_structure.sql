-- Script para verificar la estructura de la tabla blog_posts

-- Listar las columnas de la tabla blog_posts
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

-- Verificar si hay registros en la tabla
SELECT COUNT(*) FROM blog_posts;