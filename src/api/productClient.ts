import { supabase } from '@/supabaseClient';

// Tipos
export interface ProductImage {
  id?: string;
  product_id: string;
  url: string;
  alt_text?: string;
  position: number;
  is_main: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  cash_price: number;
  card_price: number;
  stock: number;
  payment_link?: string;
  payment_provider?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  seo_img_alt?: string;
  created_at?: string;
  updated_at?: string;
  images?: ProductImage[];
}

// Función para obtener un producto por ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    // Obtener el producto
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error al obtener producto con ID ${id}:`, error);
      return null;
    }
    
    if (!product) {
      return null;
    }
    
    // Obtener las imágenes del producto
    const { data: images, error: imagesError } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', id)
      .order('position', { ascending: true });
    
    if (imagesError) {
      console.error(`Error al obtener imágenes del producto ${id}:`, imagesError);
    }
    
    // Combinar producto e imágenes
    return {
      ...product,
      images: images || []
    };
  } catch (error) {
    console.error(`Error al obtener producto con ID ${id}:`, error);
    return null;
  }
};

// Función para obtener todos los productos
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    // Obtener todos los productos
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error al obtener productos:', error);
      return [];
    }
    
    if (!products || products.length === 0) {
      return [];
    }
    
    // Obtener todas las imágenes
    const { data: allImages, error: imagesError } = await supabase
      .from('product_images')
      .select('*')
      .order('position', { ascending: true });
    
    if (imagesError) {
      console.error('Error al obtener imágenes de productos:', imagesError);
      return products;
    }
    
    // Combinar productos e imágenes
    return products.map(product => ({
      ...product,
      images: allImages?.filter(img => img.product_id === product.id) || []
    }));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

// Función para obtener productos destacados
export const getFeaturedProducts = async (limit: number = 4): Promise<Product[]> => {
  try {
    // Obtener productos destacados (por ahora, simplemente los más recientes)
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error al obtener productos destacados:', error);
      return [];
    }
    
    if (!products || products.length === 0) {
      return [];
    }
    
    // Obtener las imágenes principales de los productos
    const productIds = products.map(p => p.id);
    const { data: mainImages, error: imagesError } = await supabase
      .from('product_images')
      .select('*')
      .in('product_id', productIds)
      .eq('is_main', true);
    
    if (imagesError) {
      console.error('Error al obtener imágenes principales:', imagesError);
      return products;
    }
    
    // Combinar productos e imágenes
    return products.map(product => ({
      ...product,
      images: mainImages?.filter(img => img.product_id === product.id) || []
    }));
  } catch (error) {
    console.error('Error al obtener productos destacados:', error);
    return [];
  }
};