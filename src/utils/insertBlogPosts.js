// Script para insertar artículos de blog directamente desde JavaScript
// Ejecutar con: node src/utils/insertBlogPosts.js

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Obtener las variables de entorno
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// Verificar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY son requeridos.');
  console.error('Por favor, verifica tu archivo .env');
  process.exit(1);
}

// Crear el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Artículos de ejemplo
const sampleBlogPosts = [
  {
    title: "Cómo lograr cortes perfectos con tu guía ProFix 126",
    slug: "como-lograr-cortes-perfectos-guia-profix-126",
    excerpt: "Descubre las mejores técnicas y consejos para aprovechar al máximo tu guía de corte ProFix 126 y conseguir resultados profesionales en todos tus proyectos de carpintería.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'La guía de corte es una herramienta esencial para cualquier carpintero o aficionado al bricolaje que busque realizar cortes precisos y profesionales. En este artículo, exploraremos las mejores técnicas para aprovechar al máximo tu guía de corte ProFix 126 y lograr resultados perfectos en cada proyecto.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '¿Por qué es importante una buena guía de corte?',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Un corte preciso es la base de cualquier proyecto de carpintería exitoso. Sin importar si estás construyendo muebles, instalando pisos o realizando trabajos de ebanistería, la precisión en tus cortes determinará la calidad final de tu trabajo. Una guía de corte de calidad como la ProFix 126 te permite:',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Realizar cortes perfectamente rectos y precisos',
            marks: ['strong']
          }
        ],
        markDefs: []
      }
    ],
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
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'La carpintería puede parecer intimidante para los principiantes, pero con las herramientas adecuadas como la guía de corte ProFix 126, incluso los novatos pueden crear proyectos impresionantes. En este artículo, te presentamos 5 proyectos perfectos para iniciarte en el mundo de la carpintería.',
            marks: []
          }
        ],
        markDefs: []
      }
    ],
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
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'El mantenimiento adecuado de tus herramientas de carpintería es fundamental para garantizar su durabilidad y precisión. En esta guía, te explicamos paso a paso cómo cuidar correctamente cada una de tus herramientas, incluyendo tu guía de corte ProFix 126.',
            marks: []
          }
        ],
        markDefs: []
      }
    ],
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
  
  try {
    // Verificar si la tabla blog_posts existe
    const { error: tableError } = await supabase
      .from('blog_posts')
      .select('count(*)', { count: 'exact', head: true });
    
    if (tableError) {
      console.error('Error al verificar la tabla blog_posts:', tableError);
      console.log('Es posible que la tabla blog_posts no exista. Ejecuta el script scripts/createBlogPostsTable.sql primero.');
      return;
    }
    
    console.log('Tabla blog_posts verificada correctamente.');
    
    // Insertar los artículos
    for (const post of sampleBlogPosts) {
      console.log(`Insertando artículo: "${post.title}"...`);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .upsert([post], { onConflict: 'slug' })
        .select();
      
      if (error) {
        console.error(`Error al insertar el artículo "${post.title}":`, error);
      } else {
        console.log(`Artículo "${post.title}" insertado correctamente.`);
      }
    }
    
    console.log('Proceso completado.');
  } catch (error) {
    console.error('Error durante la ejecución:', error);
  }
}

// Ejecutar la función
insertBlogPosts();