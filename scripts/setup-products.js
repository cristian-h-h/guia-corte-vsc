#!/usr/bin/env node

// Script simplificado para configurar productos en Supabase
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Cargar variables de entorno
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

// Producto hardcodeado
const producto = {
  id: "profix-126",
  name: "Guía de Corte ProFix 126 | Sistema Ajustable para Cortes Rectos de 1.26m",
  description: "Guía de Corte ProFix 126: La solución profesional para cortes rectos milimétricos hasta 1.26m. Compatible con sierras circulares, routers y fresadoras DeWalt, Makita y Bosch, Einhell, Ingco, Total, Skill, Ubermann, etc. ¡Precisión industrial en tu taller! ✔️ Garantía 6 meses.",
  cash_price: 35000,
  card_price: 38990,
  stock: 10,
  payment_link: "https://www.payku.cl/pagar/profix-126",
  seo_title: "Guía de Corte ProFix 126 | Herramienta Profesional para Carpintería",
  seo_description: "Guía de Corte ProFix 126: La solución profesional para cortes rectos milimétricos hasta 1.26m. Compatible con sierras circulares, routers y fresadoras.",
  seo_keywords: "carpintería, herramienta, aluminio, corte recto, melamina, guía de corte, profix 126"
};

// Imágenes del producto
const imagenes = [
  {
    url: "/guia-imagenes/profix-126-guia-corte-recto.webp",
    alt_text: "Guía de Corte ProFix 126 imagen principal",
    position: 0,
    is_main: true
  },
  {
    url: "/guia-imagenes/guia-corte-profix-126.webp",
    alt_text: "Guía de Corte ProFix 126 en uso",
    position: 1,
    is_main: false
  },
  {
    url: "/guia-imagenes/corte-sierra-circular-profix-126.webp",
    alt_text: "Detalle de corte con ProFix 126",
    position: 2,
    is_main: false
  },
  {
    url: "/guia-imagenes/ajuste-recto-profix-126.webp",
    alt_text: "Sistema de ajuste rápido ProFix 126",
    position: 3,
    is_main: false
  }
];

// Función para ejecutar SQL desde un archivo
async function executeSqlFromFile(filePath) {
  try {
    console.log(`Ejecutando SQL desde ${filePath}...`);
    
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    const { error } = await supabase.rpc('exec_sql', { sql: sqlContent });
    
    if (error) {
      console.error('Error al ejecutar SQL:', error);
      return false;
    }
    
    console.log('SQL ejecutado correctamente');
    return true;
  } catch (error) {
    console.error('Error al leer o ejecutar SQL:', error);
    return false;
  }
}

// Función para insertar el producto
async function insertarProducto() {
  try {
    console.log('Verificando si el producto ya existe...');
    
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .eq('id', producto.id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error al verificar producto:', error);
    }
    
    if (data) {
      console.log('El producto ya existe, actualizando...');
      
      const { error: updateError } = await supabase
        .from('products')
        .update(producto)
        .eq('id', producto.id);
      
      if (updateError) {
        console.error('Error al actualizar producto:', updateError);
      } else {
        console.log('Producto actualizado correctamente');
      }
    } else {
      console.log('Insertando nuevo producto...');
      
      const { error: insertError } = await supabase
        .from('products')
        .insert([producto]);
      
      if (insertError) {
        console.error('Error al insertar producto:', insertError);
      } else {
        console.log('Producto insertado correctamente');
      }
    }
  } catch (error) {
    console.error('Error al procesar producto:', error);
  }
}

// Función para insertar imágenes
async function insertarImagenes() {
  try {
    console.log('Insertando imágenes...');
    
    for (const imagen of imagenes) {
      console.log(`Procesando imagen: ${imagen.url}`);
      
      // Verificar si la imagen ya existe
      const { data, error } = await supabase
        .from('product_images')
        .select('id')
        .eq('product_id', producto.id)
        .eq('url', imagen.url)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error al verificar imagen:', error);
        continue;
      }
      
      if (data) {
        console.log('La imagen ya existe, actualizando...');
        
        const { error: updateError } = await supabase
          .from('product_images')
          .update({
            alt_text: imagen.alt_text,
            position: imagen.position,
            is_main: imagen.is_main
          })
          .eq('id', data.id);
        
        if (updateError) {
          console.error('Error al actualizar imagen:', updateError);
        } else {
          console.log('Imagen actualizada correctamente');
        }
      } else {
        console.log('Insertando nueva imagen...');
        
        const { error: insertError } = await supabase
          .from('product_images')
          .insert([{
            product_id: producto.id,
            url: imagen.url,
            alt_text: imagen.alt_text,
            position: imagen.position,
            is_main: imagen.is_main
          }]);
        
        if (insertError) {
          console.error('Error al insertar imagen:', insertError);
        } else {
          console.log('Imagen insertada correctamente');
        }
      }
    }
  } catch (error) {
    console.error('Error al procesar imágenes:', error);
  }
}

// Función principal
async function main() {
  try {
    console.log('=== Configuración de productos en Supabase ===');
    
    // 1. Ejecutar SQL para crear tablas
    console.log('\n1. Creando tablas necesarias...');
    const sqlPath = path.join(__dirname, 'migrate_product_sql.sql');
    
    if (fs.existsSync(sqlPath)) {
      await executeSqlFromFile(sqlPath);
    } else {
      console.log('Archivo SQL no encontrado, continuando con la inserción directa...');
      
      // Crear bucket para imágenes de productos
      console.log('Creando bucket para imágenes de productos...');
      const { error: bucketError } = await supabase.storage.createBucket('product-images', {
        public: true
      });
      
      if (bucketError) {
        console.error('Error al crear bucket (puede que ya exista):', bucketError);
      }
    }
    
    // 2. Insertar producto
    console.log('\n2. Insertando producto...');
    await insertarProducto();
    
    // 3. Insertar imágenes
    console.log('\n3. Insertando imágenes...');
    await insertarImagenes();
    
    console.log('\n=== Configuración completada ===');
  } catch (error) {
    console.error('Error general:', error);
  }
}

// Ejecutar función principal
main();