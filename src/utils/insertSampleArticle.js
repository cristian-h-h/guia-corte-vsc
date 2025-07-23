// Script para insertar un artículo de ejemplo directamente desde JavaScript
// Ejecutar con: node src/utils/insertSampleArticle.js

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Obtener las variables de entorno
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// Verificar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY son requeridos.');
  console.error('Por favor, crea un archivo .env en la raíz del proyecto con estas variables.');
  process.exit(1);
}

// Crear el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Artículo de ejemplo simplificado
const sampleArticle = {
  title: 'Artículo de prueba desde JavaScript',
  slug: 'articulo-prueba-javascript',
  excerpt: 'Este es un artículo de prueba insertado directamente desde JavaScript para verificar la conexión con Supabase.',
  content: JSON.stringify([
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Este es un artículo de prueba para verificar que la conexión con Supabase funciona correctamente.',
          marks: []
        }
      ],
      markDefs: []
    }
  ]),
  image_url: 'https://www.guiadecorte.cl/blog-imagenes/articulo-prueba.webp',
  published_at: new Date().toISOString(),
  author: 'Script de prueba',
  tags: ['prueba', 'javascript', 'supabase'],
  meta_title: 'Artículo de prueba',
  meta_description: 'Este es un artículo de prueba para verificar la conexión con Supabase.',
  category: 'Pruebas',
  is_published: true
};

// Función para insertar el artículo
async function insertArticle() {
  console.log('Conectando a Supabase...');
  console.log(`URL: ${supabaseUrl.substring(0, 20)}...`);
  
  try {
    console.log('Insertando artículo de prueba...');
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([sampleArticle])
      .select();
    
    if (error) {
      console.error('Error al insertar el artículo:', error);
    } else {
      console.log('Artículo insertado correctamente:', data);
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  }
}

// Ejecutar la función
insertArticle()
  .catch(console.error)
  .finally(() => {
    console.log('Proceso finalizado.');
  });