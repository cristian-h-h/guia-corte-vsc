// Script para generar el sitemap.xml completo
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Se requieren las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// URL base del sitio
const BASE_URL = 'https://www.guiadecorte.cl';

// Función para obtener la fecha actual en formato ISO
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Función para formatear fecha ISO
const formatDate = (date) => {
  if (!date) return getCurrentDate();
  return new Date(date).toISOString().split('T')[0];
};

// Función para asegurar URL completa
const ensureFullUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/')) {
    return `${BASE_URL}${url}`;
  }
  return `${BASE_URL}/${url}`;
};

// Función para generar el sitemap
async function generateSitemap() {
  try {
    console.log('🔄 Generando sitemap.xml...');
    
    // ============================================
    // 1. OBTENER DATOS DE SUPABASE
    // ============================================
    
    console.log('📦 Obteniendo productos...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, updated_at');
    
    if (productsError) {
      console.error('❌ Error al obtener productos:', productsError);
    }
    
    console.log('📝 Obteniendo artículos de blog...');
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('slug, title, image_url, updated_at, published_at')
      .eq('is_published', true);
    
    if (blogError) {
      console.error('❌ Error al obtener artículos de blog:', blogError);
    }
    
    console.log('🖼️ Obteniendo imágenes de productos...');
    const { data: productImages, error: productImagesError } = await supabase
      .from('product_images')
      .select('product_id, url, alt_text, is_main');
    
    if (productImagesError) {
      console.error('❌ Error al obtener imágenes de productos:', productImagesError);
    }
    
    console.log('🖼️ Obteniendo imágenes de galería...');
    const { data: galleryImages, error: galleryImagesError } = await supabase
      .from('gallery_images')
      .select('src, alt, description');
    
    if (galleryImagesError) {
      console.error('❌ Error al obtener imágenes de galería:', galleryImagesError);
    }
    
    console.log('🎥 Obteniendo videos de galería...');
    const { data: galleryVideos, error: galleryVideosError } = await supabase
      .from('gallery_videos')
      .select('youtube_id, title, description, updated_at')
      .order('order', { ascending: true });
    
    if (galleryVideosError) {
      console.error('❌ Error al obtener videos de galería:', galleryVideosError);
    }
    
    // Crear mapa de imágenes por producto
    const imagesByProduct = {};
    if (productImages && productImages.length > 0) {
      productImages.forEach(img => {
        if (!imagesByProduct[img.product_id]) {
          imagesByProduct[img.product_id] = [];
        }
        imagesByProduct[img.product_id].push({
          url: img.url,
          alt: img.alt_text || img.product_id,
          is_main: img.is_main
        });
      });
    }
    
    // ============================================
    // 2. GENERAR XML DEL SITEMAP
    // ============================================
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;
    
    // ============================================
    // 3. PÁGINAS WEB (ESTÁTICAS)
    // ============================================
    
    console.log('🌐 Agregando páginas web...');
    
    // Página principal
    sitemap += `  <!-- Página principal -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${BASE_URL}/guia-imagenes/profix-126-logo.webp</image:loc>
      <image:title>Guía de Corte Recto ProFix 126 para Sierra Circular</image:title>
      <image:caption>Guía de corte recto profesional para carpintería y bricolaje</image:caption>
    </image:image>
  </url>
`;
    
    // Página de blog
    sitemap += `  <!-- Blog -->
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    
    // Página de galería (con imágenes y videos)
    sitemap += `  <!-- Galería -->
  <url>
    <loc>${BASE_URL}/galeria</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
`;
    
    // Agregar imágenes de galería a la página de galería
    if (galleryImages && galleryImages.length > 0) {
      galleryImages.slice(0, 10).forEach(img => { // Máximo 10 imágenes por página
        const imgUrl = ensureFullUrl(img.src);
        if (imgUrl) {
          sitemap += `    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:title>${(img.alt || 'Imagen de galería').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
      <image:caption>${(img.description || img.alt || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:caption>
    </image:image>
`;
        }
      });
    }
    
    // Agregar videos de galería a la página de galería
    if (galleryVideos && galleryVideos.length > 0) {
      galleryVideos.forEach(video => {
        const videoUrl = `https://www.youtube.com/watch?v=${video.youtube_id}`;
        const thumbnailUrl = `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`;
        
        sitemap += `    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>${(video.title || 'Video').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</video:title>
      <video:description>${(video.description || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</video:description>
      <video:content_loc>${videoUrl}</video:content_loc>
      <video:publication_date>${formatDate(video.updated_at)}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
    </video:video>
`;
      });
    }
    
    sitemap += `  </url>
`;
    
    // Página de contacto
    sitemap += `  <!-- Contacto -->
  <url>
    <loc>${BASE_URL}/contacto</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    
    // Página de carrito
    sitemap += `  <!-- Carrito -->
  <url>
    <loc>${BASE_URL}/carrito</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;
    
    // ============================================
    // 4. PRODUCTOS (CON IMÁGENES)
    // ============================================
    
    console.log('🛍️ Agregando productos...');
    
    if (products && products.length > 0) {
      products.forEach(product => {
        const lastmod = formatDate(product.updated_at);
        const productUrl = `${BASE_URL}/producto/${product.id}`;
        
        sitemap += `  <!-- Producto: ${(product.name || product.id).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')} -->
  <url>
    <loc>${productUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
`;
        
        // Agregar imágenes del producto
        if (imagesByProduct[product.id] && imagesByProduct[product.id].length > 0) {
          imagesByProduct[product.id].forEach(img => {
            const imgUrl = ensureFullUrl(img.url);
            if (imgUrl) {
              sitemap += `    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:title>${(img.alt || product.name || product.id).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
      <image:caption>${(product.name || product.id).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:caption>
    </image:image>
`;
            }
          });
        }
        
        sitemap += `  </url>
`;
      });
    }
    
    // ============================================
    // 5. BLOGS (CON IMÁGENES)
    // ============================================
    
    console.log('📰 Agregando artículos de blog...');
    
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach(post => {
        const lastmod = formatDate(post.updated_at || post.published_at);
        const blogUrl = `${BASE_URL}/blog/${post.slug}`;
        const postTitle = (post.title || post.slug).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        sitemap += `  <!-- Blog: ${postTitle} -->
  <url>
    <loc>${blogUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
`;
        
        // Agregar imagen del blog
        const blogImage = post.image_url;
        if (blogImage) {
          const imgUrl = ensureFullUrl(blogImage);
          if (imgUrl) {
            sitemap += `    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:title>${postTitle}</image:title>
      <image:caption>${postTitle}</image:caption>
    </image:image>
`;
          }
        }
        
        sitemap += `  </url>
`;
      });
    }
    
    // ============================================
    // 6. CERRAR SITEMAP
    // ============================================
    
    sitemap += `</urlset>
`;
    
    // ============================================
    // 7. GUARDAR ARCHIVO
    // ============================================
    
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
    
    console.log('✅ Sitemap generado correctamente en:', sitemapPath);
    console.log(`📊 Estadísticas:`);
    console.log(`   - Páginas web: 5`);
    console.log(`   - Productos: ${products?.length || 0}`);
    console.log(`   - Blogs: ${blogPosts?.length || 0}`);
    console.log(`   - Imágenes de productos: ${productImages?.length || 0}`);
    console.log(`   - Imágenes de galería: ${galleryImages?.length || 0}`);
    console.log(`   - Videos: ${galleryVideos?.length || 0}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error al generar el sitemap:', error);
    return false;
  }
}

// Ejecutar la función
generateSitemap();