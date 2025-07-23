#!/usr/bin/env node

// Script para migrar el producto hardcodeado a Supabase
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: No se encontraron las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY');
  console.error('Asegúrate de que el archivo .env existe y contiene estas variables');
  process.exit(1);
}

console.log('Conectando a Supabase en:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

// Producto hardcodeado desde Producto.tsx
const producto = {
  _id: "profix-126",
  name: "Guía de Corte ProFix 126 | Sistema Ajustable para Cortes Rectos de 1.26m (Sierras Circulares, Routers y Fresadoras)",
  shortDescription: "Guía de Corte ProFix 126: La solución profesional para cortes rectos milimétricos hasta 1.26m. Compatible con sierras circulares, routers y fresadoras DeWalt, Makita y Bosch, Einhell, Ingco, Total, Skill, Ubermann, etc. ¡Precisión industrial en tu taller! ✔️ Garantía 6 meses.",
  description: `Precisión Industrial en Cada Corte: La Guía ProFix 126

Fabricada en aluminio aeronáutico grado 6061-T6 y reforzada con poliuretano ABS de alta densidad, la Guía ProFix 126 es el accesorio definitivo para talleres profesionales y carpinteros exigentes.

Beneficios Clave:
✔ Cortes rectos perfectos hasta 1.26 metros (el mayor rango del mercado chileno).
✔ Sistema Quick-Lock: Cambio entre herramientas en 15 segundos (sierras circulares, routers, fresadoras).
✔ Resistencia extrema: Soporta hasta 40 kg de presión sin perder sujeción.
✔ Precisión certificada: Margen de error de ±0.3 mm gracias a su escala láser calibrada.

No aceptes imitaciones: La única guía con garantía de por vida en mecanizado y 6 meses en componentes.`,
  cashPrice: 35000,
  cardPrice: 38990,
  features: [
    "Longitud máxima: 126 cm",
    "Cambio de herramienta en 15 segundos",
    "Precisión ±0.3 mm (certificado CNC)",
    "Portabilidad: solo 1.4 kg",
    "Material: ✓ Aluminio Aeronáutico: Resistente a flexiones y vibraciones",
    "✓ Quick-Lock: Ajuste rápido desde 0.5 cm hasta 126 cm.",
    "✓ Multiusos: Cortes, prensado y guía para ensamblaje.",
    "✓ Compatibilidad Universal: No se requieren adaptadores especiales para uso con DeWalt, Makita, Bosch.",
  ],
  specifications: [
    "Materiales Compatibles",
    "Maderas duras (roble, raulí, pino, etc)",
    "Tableros industriales (melamina, MDF, terciado, Trupan, volcanita (yeso carton)",
    "Materiales no ferrosos (aluminio, PVC, mármol artificial"
  ],
  images: [
    { url: "/guia-imagenes/profix-126-guia-corte-recto.webp", alt: "Guía de Corte ProFix 126 imagen principal" },
    { url: "/guia-imagenes/guia-corte-profix-126.webp", alt: "Guía de Corte ProFix 126 en uso" },
    { url: "/guia-imagenes/corte-sierra-circular-profix-126.webp", alt: "Detalle de corte con ProFix 126" },
    { url: "/guia-imagenes/ajuste-recto-profix-126.webp", alt: "Sistema de ajuste rápido ProFix 126" }
  ],
  keywords: [
    "carpintería", "herramienta", "aluminio", "corte recto", "melamina", "guía de corte", "profix 126", "guía de corte para sierra circular", "corte recto preciso 1.26 metros", "guía de aluminio para carpintería", "mejor guía de corte para router DeWalt", "guía de 1.26m para cortar melamina", "profix 126 vs guía festool", "cómo hacer cortes rectos con sierra circular", "guía profesional para fresadora de palma", "guía corte sierra circular Makita", "accesorio para router Bosch GKF 600", "guía ajustable para esmeril angular", "cortar melamina sin astillar", "guía para cortar terciado grueso", "corte preciso en MDF", "guía de corte más larga de Chile", "sistema quick-lock para cambio rápido", "garantía 3 años guía carpintería"
  ],
  paymentLink: "https://www.payku.cl/pagar/profix-126"
};

// Función para crear la tabla de productos si no existe
async function createProductsTableIfNotExists() {
  try {
    console.log('Verificando si la tabla products existe...');

    // Verificar si la tabla existe
    const { data, error } = await supabase
      .from('products')
      .select('count(*)', { count: 'exact', head: true })
      .limit(1);

    if (error && error.code === '42P01') {
      console.log('La tabla products no existe. Creándola...');

      // Crear la tabla
      const { error: createError } = await supabase.rpc('create_products_table_if_not_exists');

      if (createError) {
        console.error('Error al crear la tabla products:', createError);

        // Intentar crear la tabla manualmente
        await supabase.query(`
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
        `);

        console.log('Tabla products creada manualmente.');
      } else {
        console.log('Tabla products creada correctamente.');
      }
    } else {
      console.log('La tabla products ya existe.');
    }
  } catch (error) {
    console.error('Error al verificar/crear la tabla products:', error);
  }
}

// Función para crear la tabla de imágenes de productos si no existe
async function createProductImagesTableIfNotExists() {
  try {
    console.log('Verificando si la tabla product_images existe...');

    // Verificar si la tabla existe
    const { data, error } = await supabase
      .from('product_images')
      .select('count(*)', { count: 'exact', head: true })
      .limit(1);

    if (error && error.code === '42P01') {
      console.log('La tabla product_images no existe. Creándola...');

      // Crear la tabla
      await supabase.query(`
        CREATE TABLE IF NOT EXISTS product_images (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          product_id TEXT NOT NULL,
          url TEXT NOT NULL,
          alt_text TEXT,
          position INTEGER DEFAULT 0,
          is_main BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      console.log('Tabla product_images creada correctamente.');
    } else {
      console.log('La tabla product_images ya existe.');
    }
  } catch (error) {
    console.error('Error al verificar/crear la tabla product_images:', error);
  }
}

// Función para migrar el producto a Supabase
async function migrateProduct() {
  try {
    console.log('Iniciando migración del producto...');

    // Crear tablas si no existen
    await createProductsTableIfNotExists();
    await createProductImagesTableIfNotExists();

    // Verificar si el producto ya existe
    const { data: existingProduct, error: checkError } = await supabase
      .from('products')
      .select('id')
      .eq('id', producto._id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingProduct) {
      console.log(`El producto ${producto._id} ya existe en la base de datos.`);
      return;
    }

    // Insertar el producto
    const { data: productData, error: productError } = await supabase
      .from('products')
      .insert([{
        id: producto._id,
        name: producto.name,
        description: producto.description || producto.shortDescription,
        cash_price: producto.cashPrice,
        card_price: producto.cardPrice,
        stock: 10, // Valor por defecto
        payment_link: producto.paymentLink || '',
        seo_title: producto.name,
        seo_description: producto.shortDescription || '',
        seo_keywords: producto.keywords ? producto.keywords.join(', ') : '',
        seo_img_alt: producto.images && producto.images[0] ? producto.images[0].alt : ''
      }]);

    if (productError) {
      console.error('Error al insertar producto:', productError);
      throw productError;
    }

    console.log('Producto migrado correctamente');

    // Migrar imágenes
    if (producto.images && producto.images.length > 0) {
      console.log(`Migrando ${producto.images.length} imágenes...`);

      for (let i = 0; i < producto.images.length; i++) {
        const image = producto.images[i];

        // Verificar si la imagen ya existe
        const { data: existingImage, error: imageCheckError } = await supabase
          .from('product_images')
          .select('id')
          .eq('product_id', producto._id)
          .eq('url', image.url)
          .single();

        if (imageCheckError && imageCheckError.code !== 'PGRST116') {
          console.error(`Error al verificar imagen ${i}:`, imageCheckError);
          continue;
        }

        if (existingImage) {
          console.log(`La imagen ${i} ya existe en la base de datos.`);
          continue;
        }

        // Insertar la imagen
        const { error: imageError } = await supabase
          .from('product_images')
          .insert([{
            product_id: producto._id,
            url: image.url,
            alt_text: image.alt || '',
            position: i,
            is_main: i === 0 // La primera imagen es la principal
          }]);

        if (imageError) {
          console.error(`Error al migrar imagen ${i}:`, imageError);
          continue;
        }

        console.log(`Imagen ${i} migrada correctamente.`);
      }
    }

    console.log('Migración completada con éxito.');
  } catch (error) {
    console.error('Error durante la migración:', error);
  }
}

// Ejecutar la migración
migrateProduct();