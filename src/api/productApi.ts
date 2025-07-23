import { supabase } from '@/supabaseClient';

// Tipos
export interface Product {
  id?: string;
  name: string;
  description: string;
  cashPrice: number;
  cardPrice: number;
  stock: number;
  paymentLink?: string;
  paymentProvider?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoImgAlt?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductImage {
  id?: string;
  product_id: string;
  url: string;
  alt_text?: string;
  position: number;
  is_main: boolean;
}

// Función para obtener todos los productos
export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
  
  return data || [];
};

// Función para obtener un producto por ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error al obtener producto con ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

// Función para crear un nuevo producto
export const createProduct = async (product: Product): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
  
  if (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
  
  return data;
};

// Función para actualizar un producto existente
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error al actualizar producto con ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

// Función para eliminar un producto
export const deleteProduct = async (id: string): Promise<void> => {
  // Primero eliminamos las imágenes asociadas
  const { error: imagesError } = await supabase
    .from('product_images')
    .delete()
    .eq('product_id', id);
  
  if (imagesError) {
    console.error(`Error al eliminar imágenes del producto ${id}:`, imagesError);
    throw imagesError;
  }
  
  // Luego eliminamos el producto
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error al eliminar producto con ID ${id}:`, error);
    throw error;
  }
};

// Función para obtener las imágenes de un producto
export const fetchProductImages = async (productId: string): Promise<ProductImage[]> => {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('position', { ascending: true });
  
  if (error) {
    console.error(`Error al obtener imágenes del producto ${productId}:`, error);
    throw error;
  }
  
  return data || [];
};

// Función para añadir una imagen a un producto
export const addProductImage = async (image: ProductImage): Promise<ProductImage> => {
  const { data, error } = await supabase
    .from('product_images')
    .insert([image])
    .select()
    .single();
  
  if (error) {
    console.error('Error al añadir imagen al producto:', error);
    throw error;
  }
  
  return data;
};

// Función para actualizar una imagen de producto
export const updateProductImage = async (id: string, image: Partial<ProductImage>): Promise<ProductImage> => {
  const { data, error } = await supabase
    .from('product_images')
    .update(image)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error al actualizar imagen con ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

// Función para eliminar una imagen de producto
export const deleteProductImage = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error al eliminar imagen con ID ${id}:`, error);
    throw error;
  }
};

// Función para establecer una imagen como principal
export const setMainProductImage = async (productId: string, imageId: string): Promise<void> => {
  // Primero quitamos la marca de principal de todas las imágenes del producto
  const { error: updateError } = await supabase
    .from('product_images')
    .update({ is_main: false })
    .eq('product_id', productId);
  
  if (updateError) {
    console.error(`Error al actualizar imágenes del producto ${productId}:`, updateError);
    throw updateError;
  }
  
  // Luego marcamos la imagen seleccionada como principal
  const { error } = await supabase
    .from('product_images')
    .update({ is_main: true })
    .eq('id', imageId);
  
  if (error) {
    console.error(`Error al establecer imagen ${imageId} como principal:`, error);
    throw error;
  }
};

// Función para migrar un producto desde los datos hardcodeados
export const migrateHardcodedProduct = async (product: any): Promise<Product> => {
  // Primero creamos el producto
  const { data: productData, error: productError } = await supabase
    .from('products')
    .insert([{
      id: product._id,
      name: product.name,
      description: product.description || product.shortDescription,
      cashPrice: product.cashPrice,
      cardPrice: product.cardPrice,
      stock: 10, // Valor por defecto
      paymentLink: product.paymentLink || '',
      seoTitle: product.name,
      seoDescription: product.shortDescription || '',
      seoKeywords: product.keywords ? product.keywords.join(', ') : '',
      seoImgAlt: product.images && product.images[0] ? product.images[0].alt : ''
    }])
    .select()
    .single();
  
  if (productError) {
    console.error('Error al migrar producto:', productError);
    throw productError;
  }
  
  // Luego migramos las imágenes
  if (product.images && product.images.length > 0) {
    const imagePromises = product.images.map(async (image: any, index: number) => {
      const { error: imageError } = await supabase
        .from('product_images')
        .insert([{
          product_id: productData.id,
          url: image.url,
          alt_text: image.alt || '',
          position: index,
          is_main: index === 0 // La primera imagen es la principal
        }]);
      
      if (imageError) {
        console.error(`Error al migrar imagen ${index}:`, imageError);
      }
    });
    
    await Promise.all(imagePromises);
  }
  
  return productData;
};

// Función para crear la tabla de productos si no existe
export const createProductsTableIfNotExists = async (): Promise<void> => {
  const { error } = await supabase.rpc('create_products_table_if_not_exists');
  
  if (error) {
    console.error('Error al crear tabla de productos:', error);
    throw error;
  }
};