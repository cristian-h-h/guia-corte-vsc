-- Script para verificar la estructura actual de la tabla blog_posts

-- Verificar si la tabla existe
SELECT EXISTS (
  SELECT FROM pg_tables
  WHERE schemaname = 'public'
  AND tablename = 'blog_posts'
) AS tabla_existe;

-- Listar todas las columnas de la tabla
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public'
  AND table_name = 'blog_posts'
ORDER BY 
  ordinal_position;

-- Verificar las restricciones (incluyendo PRIMARY KEY y UNIQUE)
SELECT
  con.conname AS constraint_name,
  CASE
    WHEN con.contype = 'p' THEN 'PRIMARY KEY'
    WHEN con.contype = 'u' THEN 'UNIQUE'
    WHEN con.contype = 'f' THEN 'FOREIGN KEY'
    WHEN con.contype = 'c' THEN 'CHECK'
    ELSE con.contype::text
  END AS constraint_type,
  pg_get_constraintdef(con.oid) AS constraint_definition
FROM
  pg_constraint con
  JOIN pg_class rel ON rel.oid = con.conrelid
  JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
WHERE
  nsp.nspname = 'public'
  AND rel.relname = 'blog_posts';

-- Verificar los índices (versión corregida)
SELECT
  indexname AS index_name,
  indexdef AS index_definition
FROM
  pg_indexes
WHERE
  schemaname = 'public'
  AND tablename = 'blog_posts';

-- Verificar los triggers
SELECT
  trig.tgname AS trigger_name,
  pg_get_triggerdef(trig.oid) AS trigger_definition
FROM
  pg_trigger trig
  JOIN pg_class rel ON rel.oid = trig.tgrelid
  JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
WHERE
  nsp.nspname = 'public'
  AND rel.relname = 'blog_posts'
  AND NOT trig.tgisinternal;