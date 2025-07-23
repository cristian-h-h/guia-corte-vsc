// Script para verificar la conexión con Supabase
// Ejecutar con: node src/utils/checkSupabaseConnection.js

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

// Función para verificar la conexión
async function checkConnection() {
  console.log('Verificando conexión con Supabase...');
  console.log(`URL: ${supabaseUrl.substring(0, 20)}...`);
  
  try {
    // Verificar si la tabla blog_posts existe
    const { data: tableExists, error: tableError } = await supabase
      .from('blog_posts')
      .select('count(*)', { count: 'exact', head: true });
    
    if (tableError) {
      console.error('Error al verificar la tabla blog_posts:', tableError);
      return;
    }
    
    console.log('Conexión exitosa. La tabla blog_posts existe.');
    
    // Contar los artículos
    const { count, error: countError } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error al contar los artículos:', countError);
      return;
    }
    
    console.log(`Número de artículos en la tabla: ${count}`);
    
    // Listar los artículos
    const { data: articles, error: articlesError } = await supabase
      .from('blog_posts')
      .select('id, title, slug, author, published_at')
      .order('published_at', { ascending: false });
    
    if (articlesError) {
      console.error('Error al obtener los artículos:', articlesError);
      return;
    }
    
    console.log('Artículos encontrados:');
    if (articles.length === 0) {
      console.log('No hay artículos en la tabla.');
    } else {
      articles.forEach(article => {
        console.log(`- ${article.title} (${article.slug}) por ${article.author}`);
      });
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  }
}

// Ejecutar la función
checkConnection()
  .catch(console.error)
  .finally(() => {
    console.log('Proceso finalizado.');
  });