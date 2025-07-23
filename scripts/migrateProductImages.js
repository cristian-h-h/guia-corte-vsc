// Script para migrar imágenes de productos a Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Bucket de destino en Supabase
const BUCKET_NAME = 'product-images';

// Imágenes de productos existentes (desde Producto.tsx)
const productImages = [
  { 
    url: "/guia-imagenes/profix-126-guia-corte-recto.webp", 
    alt: "Guía de Corte ProFix 126 imagen principal",
    productId: "profix-126"
  },
  { 
    url: "/guia-imagenes/guia-corte-profix-126.webp", 
    alt: "Guía de Corte ProFix 126 en uso",
    productId: "profix-126"
  },
  { 
    url: "/guia-imagenes/corte-sierra-circular-profix-126.webp", 
    alt: "Detalle de corte con ProFix 126",
    productId: "profix-126"
  },
  { 
    url: "/guia-imagenes/ajuste-recto-profix-126.webp", 
    alt: "Sistema de ajuste rápido ProFix 126",
    productId: "profix-126"
  },
  // Productos externos
  {
    url: "/guia-imagenes/terciado-melamina-15mm.webp",
    alt: "Terciado Melamina 15 mm blanco brillante",
    productId: "terciado-melamina"
  },
  {
    url: "/guia-imagenes/carro-premium.webp",
    alt: "Carro Clasico desmontable eventos",
    productId: "carro-clasico"
  },
  {
    url: "/guia-imagenes/carro-candybar-desmontable.webp",
    alt: "Meson desmontable Candy Bar - Snack",
    productId: "meson-candybar"
  },
  {
    url: "/guia-imagenes/carro-premium-desmontable.webp",
    alt: "Carro Premium Desmontable emprendimientos",
    productId: "carro-premium"
  }
];

// Función para descargar una imagen desde una URL
async function downloadImage(url) {
  try {
    // Si la URL es relativa, convertirla a absoluta
    const baseUrl = 'https://www.guiadecorte.cl';
    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : url;
    
    console.log(`Descargando imagen desde: ${fullUrl}`);
    const response = await fetch(fullUrl);
    
    if (!response.ok) {
      throw new Error(`Error al descargar la imagen: ${response.statusText}`);
    }
    
    const buffer = await response.buffer();
    return buffer;
  } catch (error) {
    console.error(`Error al descargar la imagen ${url}:`, error);
    return null;
  }
}

// Función para subir una imagen a Supabase
async function uploadImageToSupabase(buffer, fileName) {
  try {
    console.log(`Subiendo imagen: ${fileName}`);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType: 'image/webp',
        upsert: true
      });
    
    if (error) {
      throw error;
    }
    
    // Obtener la URL pública
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);
    
    console.log(`Imagen subida exitosamente: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error(`Error al subir la imagen ${fileName}:`, error);
    return null;
  }
}

// Función para guardar los metadatos de la imagen en la base de datos
async function saveImageMetadata(imageData, publicUrl) {
  try {
    const { data, error } = await supabase
      .from('product_images')
      .insert([
        {
          product_id: imageData.productId,
          url: publicUrl,
          alt_text: imageData.alt,
          position: imageData.position || 0,
          is_main: imageData.position === 0 || false
        }
      ]);
    
    if (error) {
      throw error;
    }
    
    console.log(`Metadatos guardados para: ${publicUrl}`);
    return data;
  } catch (error) {
    console.error(`Error al guardar metadatos para ${publicUrl}:`, error);
    return null;
  }
}

// Función principal para migrar todas las imágenes
async function migrateImages() {
  try {
    // Verificar si el bucket existe, si no, crearlo
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      throw bucketsError;
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log(`Creando bucket: ${BUCKET_NAME}`);
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true
      });
      
      if (createError) {
        throw createError;
      }
    }
    
    // Crear tabla para metadatos de imágenes si no existe
    const { error: tableError } = await supabase.rpc('create_product_images_table_if_not_exists');
    
    if (tableError) {
      console.error('Error al verificar/crear tabla de metadatos:', tableError);
      // Intentar crear la tabla manualmente si el RPC falla
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
    }
    
    // Procesar cada imagen
    for (let i = 0; i < productImages.length; i++) {
      const image = productImages[i];
      
      // Asignar posición basada en el índice para cada producto
      const imagesForProduct = productImages.filter(img => img.productId === image.productId);
      const positionInProduct = imagesForProduct.findIndex(img => img.url === image.url);
      image.position = positionInProduct;
      
      // Generar nombre de archivo único
      const fileExt = path.extname(image.url);
      const fileName = `${image.productId}-${i}${fileExt}`;
      
      // Descargar la imagen
      const imageBuffer = await downloadImage(image.url);
      
      if (!imageBuffer) {
        console.error(`No se pudo descargar la imagen: ${image.url}`);
        continue;
      }
      
      // Subir la imagen a Supabase
      const publicUrl = await uploadImageToSupabase(imageBuffer, fileName);
      
      if (!publicUrl) {
        console.error(`No se pudo subir la imagen: ${fileName}`);
        continue;
      }
      
      // Guardar metadatos
      await saveImageMetadata(image, publicUrl);
    }
    
    console.log('Migración de imágenes completada');
  } catch (error) {
    console.error('Error durante la migración:', error);
  }
}

// Ejecutar la migración
migrateImages();