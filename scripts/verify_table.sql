-- Script para verificar la estructura actual de la tabla blog_posts

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
  con.contype AS constraint_type,
  pg_get_constraintdef(con.oid) AS constraint_definition
FROM
  pg_constraint con
  JOIN pg_class rel ON rel.oid = con.conrelid
  JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
WHERE
  nsp.nspname = 'public'
  AND rel.relname = 'blog_posts';

-- Verificar los índices
SELECT
  idx.indexname AS index_name,
  pg_get_indexdef(idx.indexrelid) AS index_definition
FROM
  pg_indexes idx
WHERE
  idx.schemaname = 'public'
  AND idx.tablename = 'blog_posts';

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