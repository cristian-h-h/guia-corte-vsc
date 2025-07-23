-- Script para verificar los artículos insertados en la tabla blog_posts

-- Contar el número total de artículos
SELECT COUNT(*) AS total_articulos FROM blog_posts;

-- Listar los artículos (información básica)
SELECT 
  id,
  title,
  slug,
  author,
  published_at,
  is_published
FROM 
  blog_posts
ORDER BY 
  published_at DESC;