-- Crear función para verificar/crear la tabla de productos
CREATE OR REPLACE FUNCTION create_products_table_if_not_exists()
RETURNS void AS $$
BEGIN
  -- Verificar si la extensión uuid-ossp está instalada
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  
  -- Crear tabla de productos si no existe
  IF NOT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'products'
  ) THEN
    CREATE TABLE public.products (
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
    
    -- Comentarios para la tabla y columnas
    COMMENT ON TABLE public.products IS 'Almacena información de productos';
    COMMENT ON COLUMN public.products.id IS 'Identificador único del producto';
    COMMENT ON COLUMN public.products.name IS 'Nombre del producto';
    COMMENT ON COLUMN public.products.description IS 'Descripción del producto';
    COMMENT ON COLUMN public.products.cash_price IS 'Precio en efectivo (en pesos chilenos)';
    COMMENT ON COLUMN public.products.card_price IS 'Precio con tarjeta (en pesos chilenos)';
    COMMENT ON COLUMN public.products.stock IS 'Cantidad disponible en stock';
    COMMENT ON COLUMN public.products.payment_link IS 'Enlace para pago en línea';
    COMMENT ON COLUMN public.products.payment_provider IS 'Proveedor de pagos (mercadopago, webpay, etc.)';
    COMMENT ON COLUMN public.products.seo_title IS 'Título optimizado para SEO';
    COMMENT ON COLUMN public.products.seo_description IS 'Descripción optimizada para SEO';
    COMMENT ON COLUMN public.products.seo_keywords IS 'Palabras clave para SEO';
    COMMENT ON COLUMN public.products.seo_img_alt IS 'Texto alternativo para imagen principal';
    
    -- Índices para mejorar el rendimiento
    CREATE INDEX idx_products_name ON public.products(name);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Ejecutar la función
SELECT create_products_table_if_not_exists();

-- Crear políticas de seguridad para la tabla products
DO $$
BEGIN
  -- Habilitar RLS en la tabla
  ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
  
  -- Eliminar políticas existentes si las hay
  DROP POLICY IF EXISTS "Permitir SELECT para todos" ON public.products;
  DROP POLICY IF EXISTS "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" ON public.products;
  
  -- Crear políticas
  CREATE POLICY "Permitir SELECT para todos" 
    ON public.products FOR SELECT 
    USING (true);
    
  CREATE POLICY "Permitir INSERT/UPDATE/DELETE para usuarios autenticados" 
    ON public.products FOR ALL 
    USING (auth.role() = 'authenticated');
END
$$;

-- Crear función para migrar el producto hardcodeado
CREATE OR REPLACE FUNCTION migrate_hardcoded_product()
RETURNS void AS $$
BEGIN
  -- Verificar si el producto ya existe
  IF NOT EXISTS (SELECT 1 FROM public.products WHERE id = 'profix-126') THEN
    -- Insertar el producto
    INSERT INTO public.products (
      id, name, description, cash_price, card_price, stock, 
      payment_link, seo_title, seo_description, seo_keywords
    ) VALUES (
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
    );
  END IF;
END;
$$ LANGUAGE plpgsql;