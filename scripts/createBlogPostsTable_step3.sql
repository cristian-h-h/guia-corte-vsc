-- Paso 3: Añadir restricciones e índices

-- Añadir restricción NOT NULL a la columna slug si no tiene
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'blog_posts'
    AND column_name = 'slug'
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE blog_posts ALTER COLUMN slug SET NOT NULL;
    RAISE NOTICE 'Restricción NOT NULL añadida a la columna slug.';
  END IF;
END
$$;

-- Añadir restricción UNIQUE a la columna slug si no tiene
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'blog_posts_slug_key'
    AND conrelid = 'blog_posts'::regclass
  ) THEN
    ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);
    RAISE NOTICE 'Restricción UNIQUE añadida a la columna slug.';
  END IF;
END
$$;

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);