import { supabase } from '../supabaseClient';

// Tipos
export interface Blog {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Contenido en formato JSON para PortableText
  main_image_url: string; // Corresponde a image_url en la tabla
  published_at: string;
  author: string;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  category?: string;
}

// Obtener todos los blogs ordenados por fecha de publicación
export async function fetchBlogs() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error al obtener blogs:', error);
    return [];
  }
  
  // Transformar los datos para mantener compatibilidad con el formato anterior
  return data.map(blog => {
    // Procesar el contenido: solo parsear si parece ser JSON válido
    let processedContent = blog.content;
    if (typeof blog.content === 'string' && blog.content.trim()) {
      // Solo intentar parsear si empieza con { o [ (formato JSON)
      const trimmed = blog.content.trim();
      if ((trimmed.startsWith('{') || trimmed.startsWith('[')) && (trimmed.endsWith('}') || trimmed.endsWith(']'))) {
        try {
          processedContent = JSON.parse(blog.content);
        } catch (e) {
          // Si no es JSON válido, mantener como string (será renderizado como HTML)
          processedContent = blog.content;
        }
      } else {
        // Es texto plano o HTML, mantener como string
        processedContent = blog.content;
      }
    }

    return {
      _id: blog.id,
      title: blog.title,
      slug: { current: blog.slug },
      excerpt: blog.excerpt,
      content: processedContent,
      mainImage: { asset: { url: blog.image_url } },
      publishedAt: blog.published_at,
      author: blog.author,
      tags: blog.tags,
      metaTitle: blog.meta_title,
      metaDescription: blog.meta_description
    };
  });
}

// Obtener un blog por su slug
export async function fetchBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error(`Error al obtener blog con slug ${slug}:`, error);
    return null;
  }
  
  // Procesar el contenido: solo parsear si parece ser JSON válido
  let processedContent = data.content;
  if (typeof data.content === 'string' && data.content.trim()) {
    // Solo intentar parsear si empieza con { o [ (formato JSON)
    const trimmed = data.content.trim();
    if ((trimmed.startsWith('{') || trimmed.startsWith('[')) && (trimmed.endsWith('}') || trimmed.endsWith(']'))) {
      try {
        processedContent = JSON.parse(data.content);
      } catch (e) {
        // Si no es JSON válido, mantener como string (será renderizado como HTML)
        processedContent = data.content;
      }
    } else {
      // Es texto plano o HTML, mantener como string
      processedContent = data.content;
    }
  }

  // Transformar los datos para mantener compatibilidad con el formato anterior
  return {
    _id: data.id,
    title: data.title,
    slug: { current: data.slug },
    excerpt: data.excerpt,
    content: processedContent,
    mainImage: { asset: { url: data.image_url } },
    publishedAt: data.published_at,
    author: data.author,
    tags: data.tags,
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
    category: data.category
  };
}

// Obtener blogs relacionados (excluyendo el actual)
export async function fetchRelatedBlogs(currentSlug: string, limit: number = 3) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error al obtener blogs relacionados:', error);
    return [];
  }
  
  // Transformar los datos para mantener compatibilidad con el formato anterior
  return data.map(blog => ({
    _id: blog.id,
    title: blog.title,
    slug: { current: blog.slug },
    mainImage: { asset: { url: blog.image_url } },
    publishedAt: blog.published_at
  }));
}

// Crear un nuevo blog
export async function createBlog(blogData: Blog) {
  // Adaptar los nombres de campos al formato de la tabla blog_posts
  const supabaseBlogData = {
    title: blogData.title,
    slug: blogData.slug,
    excerpt: blogData.excerpt,
    content: blogData.content,
    image_url: blogData.main_image_url,
    published_at: blogData.published_at,
    author: blogData.author,
    tags: blogData.tags,
    meta_title: blogData.meta_title,
    meta_description: blogData.meta_description,
    is_published: true
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([supabaseBlogData])
    .select();
  
  if (error) {
    console.error('Error al crear blog:', error);
    throw error;
  }
  
  return data[0];
}

// Actualizar un blog existente
export async function updateBlog(id: string, blogData: Partial<Blog>) {
  // Adaptar los nombres de campos al formato de la tabla blog_posts
  const supabaseBlogData: any = {};
  
  if (blogData.title) supabaseBlogData.title = blogData.title;
  if (blogData.slug) supabaseBlogData.slug = blogData.slug;
  if (blogData.excerpt) supabaseBlogData.excerpt = blogData.excerpt;
  if (blogData.content) supabaseBlogData.content = blogData.content;
  if (blogData.main_image_url) supabaseBlogData.image_url = blogData.main_image_url;
  if (blogData.published_at) supabaseBlogData.published_at = blogData.published_at;
  if (blogData.author) supabaseBlogData.author = blogData.author;
  if (blogData.tags) supabaseBlogData.tags = blogData.tags;
  if (blogData.meta_title) supabaseBlogData.meta_title = blogData.meta_title;
  if (blogData.meta_description) supabaseBlogData.meta_description = blogData.meta_description;
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update(supabaseBlogData)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error(`Error al actualizar blog ${id}:`, error);
    throw error;
  }
  
  return data[0];
}

// Eliminar un blog
export async function deleteBlog(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error al eliminar blog ${id}:`, error);
    throw error;
  }
  
  return true;
}

// Alias para mantener compatibilidad con el código existente
export const fetchPosts = fetchBlogs;
export const createPost = createBlog;
export const updatePost = updateBlog;
export const deletePost = deleteBlog;