-- Paso 1: Verificar si la tabla existe y su estructura actual

-- Habilitar la extensión uuid-ossp si no está habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Verificar si la tabla blog_posts existe
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'blog_posts'
  ) THEN
    RAISE NOTICE 'La tabla blog_posts ya existe.';
  ELSE
    RAISE NOTICE 'La tabla blog_posts no existe y será creada.';
  END IF;
END
$$;

-- Listar las columnas de la tabla si existe
DO $$
DECLARE
  r RECORD;
BEGIN
  IF EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'blog_posts'
  ) THEN
    RAISE NOTICE 'Columnas existentes en la tabla blog_posts:';
    FOR r IN (
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name = 'blog_posts'
      ORDER BY ordinal_position
    ) LOOP
      RAISE NOTICE '% - %', r.column_name, r.data_type;
    END LOOP;
  END IF;
END
$$;