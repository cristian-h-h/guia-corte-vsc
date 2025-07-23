// Script para verificar la configuración de la tabla gallery_images y los permisos
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Se requieren las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Función para verificar la configuración
async function checkGalleryConfig() {
  try {
    console.log('Verificando la configuración de la galería...');
    
    // 1. Verificar si la tabla gallery_images existe
    console.log('1. Verificando si la tabla gallery_images existe...');
    
    const { data: tableData, error: tableError } = await supabase
      .from('gallery_images')
      .select('count()', { count: 'exact' });
    
    if (tableError) {
      console.error('Error: La tabla gallery_images no existe o no se puede acceder a ella.');
      console.error('Detalles:', tableError.message);
    } else {
      console.log('✓ La tabla gallery_images existe y es accesible.');
      console.log(`  Número de registros: ${tableData[0].count}`);
    }
    
    // 2. Verificar si hay imágenes en la tabla
    console.log('\n2. Verificando si hay imágenes en la tabla...');
    
    const { data: images, error: imagesError } = await supabase
      .from('gallery_images')
      .select('*')
      .limit(5);
    
    if (imagesError) {
      console.error('Error al consultar imágenes:', imagesError.message);
    } else if (!images || images.length === 0) {
      console.log('⚠ No hay imágenes en la tabla gallery_images.');
      console.log('  Puede ejecutar el script insertDefaultGalleryImages.js para agregar imágenes predeterminadas.');
    } else {
      console.log(`✓ Se encontraron ${images.length} imágenes en la tabla.`);
      console.log('  Primeras imágenes:');
      images.forEach((img, i) => {
        console.log(`  ${i + 1}. ${img.alt} (${img.src})`);
      });
    }
    
    // 3. Verificar el bucket de almacenamiento
    console.log('\n3. Verificando el bucket de almacenamiento gallery-images...');
    
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets();
    
    if (bucketsError) {
      console.error('Error al listar buckets:', bucketsError.message);
    } else {
      const galleryBucket = buckets.find(b => b.name === 'gallery-images');
      const blogBucket = buckets.find(b => b.name === 'blog-images');
      
      if (galleryBucket) {
        console.log('✓ El bucket gallery-images existe.');
      } else {
        console.log('⚠ El bucket gallery-images no existe.');
      }
      
      if (blogBucket) {
        console.log('✓ El bucket blog-images existe.');
      } else {
        console.log('⚠ El bucket blog-images no existe.');
      }
    }
    
    // 4. Verificar la sesión actual
    console.log('\n4. Verificando la sesión actual...');
    
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error al verificar la sesión:', sessionError.message);
    } else if (session && session.session) {
      console.log('✓ Hay una sesión activa.');
      console.log(`  Usuario: ${session.session.user.email}`);
      console.log(`  Rol: ${session.session.user.role}`);
    } else {
      console.log('⚠ No hay una sesión activa. Usando rol anónimo.');
    }
    
  } catch (error) {
    console.error('Error general:', error.message);
  }
}

// Ejecutar la función
checkGalleryConfig();