-- Script simple para verificar si la tabla blog_posts existe y su estructura

-- Habilitar la extensión uuid-ossp si no está habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Verificar si la tabla blog_posts existe
SELECT EXISTS (
  SELECT FROM pg_tables
  WHERE schemaname = 'public'
  AND tablename = 'blog_posts'
) AS tabla_existe;

-- Listar las columnas de la tabla si existe
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'blog_posts'
ORDER BY ordinal_position;