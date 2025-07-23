-- Script para añadir la columna slug a una tabla blog_posts existente

-- Añadir la columna slug si no existe
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug TEXT;

-- Hacer la columna NOT NULL (esto fallará si hay filas existentes con valores NULL)
-- Descomenta la siguiente línea después de asegurarte de que no hay valores NULL
-- ALTER TABLE blog_posts ALTER COLUMN slug SET NOT NULL;

-- Añadir restricción UNIQUE (esto fallará si hay valores duplicados)
-- Descomenta la siguiente línea después de asegurarte de que no hay valores duplicados
-- ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);