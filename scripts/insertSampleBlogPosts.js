/**
 * Este script inserta los artículos de ejemplo en la base de datos Supabase
 * Para ejecutarlo, asegúrate de tener configuradas las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
 * Ejecuta: node scripts/insertSampleBlogPosts.js
 */

// Importar dependencias
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY son requeridos.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Artículos de ejemplo
const sampleBlogPosts = [
  {
    title: "Cómo lograr cortes perfectos con tu guía ProFix 126",
    slug: "como-lograr-cortes-perfectos-guia-profix-126",
    excerpt: "Descubre las mejores técnicas y consejos para aprovechar al máximo tu guía de corte ProFix 126 y conseguir resultados profesionales en todos tus proyectos de carpintería.",
    content: require('../src/data/sampleBlogPost').sampleBlogPost.content,
    image_url: "https://www.guiadecorte.cl/blog-imagenes/cortes-perfectos-guia.webp",
    published_at: new Date().toISOString(),
    author: "Carlos Martínez",
    tags: ["carpintería", "guía de corte", "técnicas", "herramientas", "ProFix 126"],
    meta_title: "Guía Completa: Cómo Lograr Cortes Perfectos con la Guía ProFix 126",
    meta_description: "Aprende técnicas profesionales para realizar cortes precisos con tu guía de corte ProFix 126. Consejos, mantenimiento y proyectos recomendados.",
    category: "Tutoriales",
    is_published: true
  },
  {
    title: "5 proyectos de carpintería para principiantes con guía de corte",
    slug: "5-proyectos-carpinteria-principiantes-guia-corte",
    excerpt: "Iníciate en el mundo de la carpintería con estos 5 proyectos sencillos pero impresionantes que podrás realizar fácilmente utilizando tu guía de corte ProFix 126.",
    content: require('../src/data/sampleBlogPost').secondBlogPost.content,
    image_url: "https://www.guiadecorte.cl/blog-imagenes/proyectos-principiantes.webp",
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    author: "Ana Gómez",
    tags: ["principiantes", "proyectos", "carpintería", "guía de corte", "DIY"],
    meta_title: "5 Proyectos de Carpintería Fáciles para Principiantes con Guía de Corte",
    meta_description: "Descubre 5 proyectos de carpintería sencillos pero impresionantes que cualquier principiante puede realizar utilizando una guía de corte ProFix 126.",
    category: "Proyectos DIY",
    is_published: true
  },
  {
    title: "Guía de mantenimiento para herramientas de carpintería",
    slug: "guia-mantenimiento-herramientas-carpinteria",
    excerpt: "Aprende a mantener tus herramientas de carpintería en óptimas condiciones para prolongar su vida útil y garantizar resultados profesionales en cada proyecto.",
    content: require('../src/data/sampleBlogPost').thirdBlogPost.content,
    image_url: "https://www.guiadecorte.cl/blog-imagenes/mantenimiento-herramientas.webp",
    published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    author: "Roberto Sánchez",
    tags: ["mantenimiento", "herramientas", "carpintería", "cuidados", "durabilidad"],
    meta_title: "Guía Completa de Mantenimiento para Herramientas de Carpintería",
    meta_description: "Descubre cómo mantener tus herramientas de carpintería en perfecto estado para prolongar su vida útil y obtener resultados profesionales en cada proyecto.",
    category: "Mantenimiento",
    is_published: true
  }
];

// Función para insertar los artículos
async function insertBlogPosts() {
  console.log('Insertando artículos de ejemplo en la base de datos...');

  for (const post of sampleBlogPosts) {
    // Verificar si el artículo ya existe
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', post.slug)
      .single();

    if (existingPost) {
      console.log(`El artículo "${post.title}" ya existe. Actualizando...`);

      const { error } = await supabase
        .from('blog_posts')
        .update(post)
        .eq('id', existingPost.id);

      if (error) {
        console.error(`Error al actualizar el artículo "${post.title}":`, error);
      } else {
        console.log(`Artículo "${post.title}" actualizado correctamente.`);
      }
    } else {
      console.log(`Insertando nuevo artículo: "${post.title}"...`);

      const { error } = await supabase
        .from('blog_posts')
        .insert([post]);

      if (error) {
        console.error(`Error al insertar el artículo "${post.title}":`, error);
      } else {
        console.log(`Artículo "${post.title}" insertado correctamente.`);
      }
    }
  }

  console.log('Proceso completado.');
}

// Ejecutar la función
insertBlogPosts()
  .catch(error => {
    console.error('Error durante la ejecución:', error);
    process.exit(1);
  });