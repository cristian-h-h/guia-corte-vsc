// Script para depurar el problema con la carga de artículos del blog
// Ejecutar con: node src/utils/debugBlogIssue.js

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Obtener las variables de entorno
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// Verificar que las variables de entorno estén configuradas
console.log('Variables de entorno:');
console.log(`VITE_SUPABASE_URL: ${supabaseUrl ? '✅ Configurada' : '❌ No configurada'}`);
console.log(`VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅ Configurada' : '❌ No configurada'}`);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY son requeridos.');
  console.error('Por favor, verifica tu archivo .env');
  process.exit(1);
}

// Crear el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para verificar la conexión y la tabla
async function debugBlogIssue() {
  console.log('\n=== Verificando conexión con Supabase ===');
  
  try {
    // Verificar la conexión
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Conexión con Supabase: ✅ Exitosa');
    console.log('Usuario actual:', user ? user.email : 'Anónimo');
    
    // Verificar si la tabla blog_posts existe
    console.log('\n=== Verificando tabla blog_posts ===');
    
    // Listar todas las tablas
    const { data: tables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
    
    if (tablesError) {
      console.error('Error al listar tablas:', tablesError);
      console.log('Intentando verificar la tabla blog_posts directamente...');
    } else {
      console.log('Tablas disponibles:');
      tables.forEach(table => console.log(`- ${table.tablename}`));
      
      const blogPostsExists = tables.some(table => table.tablename === 'blog_posts');
      console.log(`Tabla blog_posts: ${blogPostsExists ? '✅ Existe' : '❌ No existe'}`);
    }
    
    // Intentar consultar la tabla blog_posts
    console.log('\n=== Consultando tabla blog_posts ===');
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*');
    
    if (postsError) {
      console.error('Error al consultar la tabla blog_posts:', postsError);
      
      if (postsError.code === '42P01') {
        console.log('La tabla blog_posts no existe. Debes crearla primero.');
        console.log('Ejecuta el script scripts/createBlogPostsTable.sql en el Editor SQL de Supabase.');
      } else if (postsError.code === '42501') {
        console.log('No tienes permisos para acceder a la tabla blog_posts.');
        console.log('Verifica las políticas de seguridad en Supabase.');
      }
    } else {
      console.log(`Artículos encontrados: ${posts.length}`);
      
      if (posts.length === 0) {
        console.log('No hay artículos en la tabla blog_posts.');
        console.log('Ejecuta el script scripts/insertSampleBlogPosts.sql para insertar artículos de ejemplo.');
      } else {
        console.log('Artículos:');
        posts.forEach(post => {
          console.log(`- ${post.title} (${post.slug})`);
        });
        
        // Verificar la estructura de los datos
        console.log('\n=== Verificando estructura de datos ===');
        const samplePost = posts[0];
        console.log('Estructura de un artículo:');
        console.log(JSON.stringify(samplePost, null, 2));
        
        // Verificar la transformación de datos
        console.log('\n=== Verificando transformación de datos ===');
        const transformedPost = {
          _id: samplePost.id,
          title: samplePost.title,
          slug: { current: samplePost.slug },
          excerpt: samplePost.excerpt,
          content: samplePost.content,
          mainImage: { asset: { url: samplePost.image_url } },
          publishedAt: samplePost.published_at,
          author: samplePost.author,
          tags: samplePost.tags,
          metaTitle: samplePost.meta_title,
          metaDescription: samplePost.meta_description
        };
        console.log('Artículo transformado (como lo espera el componente Blog):');
        console.log(JSON.stringify(transformedPost, null, 2));
      }
    }
    
    // Verificar las políticas de seguridad
    console.log('\n=== Verificando políticas de seguridad ===');
    console.log('Para verificar las políticas de seguridad, accede al panel de administración de Supabase:');
    console.log('1. Ve a la sección "Authentication" > "Policies"');
    console.log('2. Verifica que exista una política que permita SELECT en la tabla blog_posts');
    console.log('3. Si no existe, crea una política con la siguiente configuración:');
    console.log('   - Tipo de política: SELECT');
    console.log('   - Nombre: allow_public_select_blog_posts');
    console.log('   - Expresión: true');
    
  } catch (err) {
    console.error('Error inesperado:', err);
  }
}

// Ejecutar la función
debugBlogIssue()
  .catch(console.error)
  .finally(() => {
    console.log('\n=== Proceso finalizado ===');
  });