// Script para generar el sitemap.xml
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Se requieren las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Función para obtener la fecha actual en formato ISO
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Función para generar el sitemap
async function generateSitemap() {
  try {
    console.log('Generando sitemap.xml...');
    
    // Obtener productos
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, updated_at');
    
    if (productsError) {
      console.error('Error al obtener productos:', productsError);
      return;
    }
    
    // Obtener artículos de blog
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('is_published', true);
    
    if (blogError) {
      console.error('Error al obtener artículos de blog:', blogError);
      return;
    }
    
    // Obtener imágenes de galería
    const { data: galleryImages, error: galleryError } = await supabase
      .from('gallery_images')
      .select('id, updated_at');
    
    if (galleryError) {
      console.error('Error al obtener imágenes de galería:', galleryError);
      return;
    }
    
    // Iniciar el contenido del sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Página principal -->
  <url>
    <loc>https://www.guiadecorte.cl/</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp</image:loc>
      <image:title>Guía de Corte ProFix 126</image:title>
      <image:caption>Guía de corte recto profesional para carpintería</image:caption>
    </image:image>
  </url>
`;
    
    // Añadir productos
    if (products && products.length > 0) {
      products.forEach(product => {
        const lastmod = product.updated_at ? new Date(product.updated_at).toISOString().split('T')[0] : getCurrentDate();
        
        sitemap += `
  <!-- Página de producto -->
  <url>
    <loc>https://www.guiadecorte.cl/producto/${product.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
      });
    }
    
    // Añadir página de blog
    sitemap += `
  <!-- Blog -->
  <url>
    <loc>https://www.guiadecorte.cl/blog</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    
    // Añadir artículos de blog
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach(post => {
        const lastmod = post.updated_at ? new Date(post.updated_at).toISOString().split('T')[0] : getCurrentDate();
        
        sitemap += `
  <!-- Artículo de blog -->
  <url>
    <loc>https://www.guiadecorte.cl/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }
    
    // Añadir página de galería
    sitemap += `
  <!-- Galería -->
  <url>
    <loc>https://www.guiadecorte.cl/galeria</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    
    // Añadir página de contacto
    sitemap += `
  <!-- Contacto -->
  <url>
    <loc>https://www.guiadecorte.cl/contacto</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    
    // Añadir página de carrito
    sitemap += `
  <!-- Carrito -->
  <url>
    <loc>https://www.guiadecorte.cl/carrito</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
    
    // Cerrar el sitemap
    sitemap += `
</urlset>`;
    
    // Escribir el sitemap en el archivo
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    
    console.log('Sitemap generado correctamente');
    return true;
  } catch (error) {
    console.error('Error al generar el sitemap:', error);
    return false;
  }
}

// Ejecutar la función
generateSitemap();