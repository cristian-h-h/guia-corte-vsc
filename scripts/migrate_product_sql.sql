-- Script SQL para migrar el producto hardcodeado a Supabase

-- Crear extensión UUID si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla de productos si no existe
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  cash_price INTEGER NOT NULL,
  card_price INTEGER NOT NULL,
  stock INTEGER DEFAULT 0,
  payment_link TEXT,
  payment_provider TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  seo_img_alt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de imágenes de productos si no existe
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  position INTEGER DEFAULT 0,
  is_main BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_position ON product_images(position);

-- Habilitar RLS en las tablas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad para la tabla products
DROP POLICY IF EXISTS "Permitir SELECT para todos" ON products;
CREATE POLICY "Permitir SELECT para todos" 
  ON products FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" ON products;
CREATE POLICY "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" 
  ON products FOR ALL 
  USING (auth.role() = 'authenticated');

-- Crear políticas de seguridad para la tabla product_images
DROP POLICY IF EXISTS "Permitir SELECT para todos" ON product_images;
CREATE POLICY "Permitir SELECT para todos" 
  ON product_images FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" ON product_images;
CREATE POLICY "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" 
  ON product_images FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insertar el producto si no existe
INSERT INTO products (
  id, name, description, cash_price, card_price, stock, 
  payment_link, seo_title, seo_description, seo_keywords
)
SELECT 
  'profix-126',
  'Guía de Corte ProFix 126 | Sistema Ajustable para Cortes Rectos de 1.26m',
  'Guía de Corte ProFix 126: La solución profesional para cortes rectos milimétricos hasta 1.26m. Compatible con sierras circulares, routers y fresadoras DeWalt, Makita y Bosch, Einhell, Ingco, Total, Skill, Ubermann, etc. ¡Precisión industrial en tu taller! ✔️ Garantía 6 meses.',
  35000,
  38990,
  10,
  'https://www.payku.cl/pagar/profix-126',
  'Guía de Corte ProFix 126 | Herramienta Profesional para Carpintería',
  'Guía de Corte ProFix 126: La solución profesional para cortes rectos milimétricos hasta 1.26m. Compatible con sierras circulares, routers y fresadoras.',
  'carpintería, herramienta, aluminio, corte recto, melamina, guía de corte, profix 126'
WHERE NOT EXISTS (
  SELECT 1 FROM products WHERE id = 'profix-126'
);

-- Insertar imágenes si no existen
INSERT INTO product_images (product_id, url, alt_text, position, is_main)
SELECT 'profix-126', '/guia-imagenes/profix-126-guia-corte-recto.webp', 'Guía de Corte ProFix 126 imagen principal', 0, true
WHERE NOT EXISTS (
  SELECT 1 FROM product_images 
  WHERE product_id = 'profix-126' AND url = '/guia-imagenes/profix-126-guia-corte-recto.webp'
);

INSERT INTO product_images (product_id, url, alt_text, position, is_main)
SELECT 'profix-126', '/guia-imagenes/guia-corte-profix-126.webp', 'Guía de Corte ProFix 126 en uso', 1, false
WHERE NOT EXISTS (
  SELECT 1 FROM product_images 
  WHERE product_id = 'profix-126' AND url = '/guia-imagenes/guia-corte-profix-126.webp'
);

INSERT INTO product_images (product_id, url, alt_text, position, is_main)
SELECT 'profix-126', '/guia-imagenes/corte-sierra-circular-profix-126.webp', 'Detalle de corte con ProFix 126', 2, false
WHERE NOT EXISTS (
  SELECT 1 FROM product_images 
  WHERE product_id = 'profix-126' AND url = '/guia-imagenes/corte-sierra-circular-profix-126.webp'
);

INSERT INTO product_images (product_id, url, alt_text, position, is_main)
SELECT 'profix-126', '/guia-imagenes/ajuste-recto-profix-126.webp', 'Sistema de ajuste rápido ProFix 126', 3, false
WHERE NOT EXISTS (
  SELECT 1 FROM product_images 
  WHERE product_id = 'profix-126' AND url = '/guia-imagenes/ajuste-recto-profix-126.webp'
);

-- Crear bucket para imágenes de productos si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;