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

const PLACEHOLDER_TITLES = new Set(["Título por defecto"]);
const PLACEHOLDER_PATTERNS = [
  /contenido del artículo en desarrollo/i,
  /próximamente publicaremos/i,
];
const IMAGE_URL_REPLACEMENTS: Array<[string, string]> = [
  ["https://www.guiadecorte.cl/blog-imagenes/cortes-perfectos-guia.webp", "https://www.guiadecorte.cl/guia-imagenes/corte-sierra-circular-profix-126.webp"],
  ["https://www.guiadecorte.cl/blog-imagenes/proyectos-principiantes.webp", "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp"],
  ["https://www.guiadecorte.cl/blog-imagenes/mantenimiento-herramientas.webp", "https://www.guiadecorte.cl/guia-imagenes/ajuste-recto-profix-126.webp"],
];

const hasMeaningfulString = (value: unknown, minLength: number = 120) => {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return trimmed.length >= minLength && !PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(trimmed));
};

const hasMeaningfulPortableText = (value: unknown) => {
  if (!Array.isArray(value) || value.length === 0) return false;

  const text = value
    .flatMap((block: any) => Array.isArray(block?.children) ? block.children : [])
    .map((child: any) => child?.text || "")
    .join(" ")
    .trim();

  return hasMeaningfulString(text, 120);
};

const isIndexableBlog = (blog: any) => {
  if (!blog?.slug || !blog?.title || PLACEHOLDER_TITLES.has(blog.title)) {
    return false;
  }

  if (blog.is_published === false) {
    return false;
  }

  return (
    hasMeaningfulPortableText(blog.content) ||
    hasMeaningfulString(blog.content) ||
    hasMeaningfulString(blog.excerpt, 140)
  );
};

const parseBlogContent = (content: unknown) => {
  if (typeof content !== "string" || !content.trim()) {
    return content;
  }

  const trimmed = content.trim();
  if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && (trimmed.endsWith("}") || trimmed.endsWith("]"))) {
    try {
      return JSON.parse(content);
    } catch (e) {
      return content;
    }
  }

  return content;
};

const normalizeImageUrl = (value: unknown) => {
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }

  return IMAGE_URL_REPLACEMENTS.reduce(
    (current, [from, to]) => current === from ? to : current,
    value.trim()
  );
};

const transformBlog = (blog: any) => ({
  _id: blog.id,
  title: blog.title,
  slug: { current: blog.slug },
  excerpt: blog.excerpt,
  content: parseBlogContent(blog.content),
  mainImage: normalizeImageUrl(blog.image_url) ? { asset: { url: normalizeImageUrl(blog.image_url)! } } : undefined,
  publishedAt: blog.published_at,
  author: blog.author,
  tags: blog.tags,
  metaTitle: blog.meta_title,
  metaDescription: blog.meta_description,
  category: blog.category
});

// Obtener todos los blogs ordenados por fecha de publicación
export async function fetchBlogs() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error al obtener blogs:', error);
    return [];
  }
  
  return data.filter(isIndexableBlog).map(transformBlog);
}

export async function fetchBlogSlugs() {
  const blogs = await fetchBlogs();
  return blogs
    .map((blog) => blog.slug?.current)
    .filter((slug): slug is string => Boolean(slug));
}

// Obtener un blog por su slug
export async function fetchBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();
  
  if (error || !data || !isIndexableBlog(data)) {
    console.error(`Error al obtener blog con slug ${slug}:`, error);
    return null;
  }

  return transformBlog(data);
}

// Obtener blogs relacionados (excluyendo el actual)
export async function fetchRelatedBlogs(currentSlug: string, limit: number = 3) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit * 3);
  
  if (error) {
    console.error('Error al obtener blogs relacionados:', error);
    return [];
  }
  
  return data
    .filter(isIndexableBlog)
    .slice(0, limit)
    .map(blog => ({
      _id: blog.id,
      title: blog.title,
      slug: { current: blog.slug },
      mainImage: normalizeImageUrl(blog.image_url) ? { asset: { url: normalizeImageUrl(blog.image_url)! } } : undefined,
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
