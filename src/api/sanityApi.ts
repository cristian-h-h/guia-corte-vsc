import client from '../sanityClient'

// Obtener todos los blogs ordenados por fecha de publicación
export async function fetchBlogs() {
  const query = `*[_type == "blog"] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    content,
    mainImage{
      asset->{
        url
      }
    },
    publishedAt,
    author,
    tags,
    metaTitle,
    metaDescription
  }`
  return await client.fetch(query)
}

// Obtener un blog por su slug (para vista individual y SEO)
export async function fetchBlogBySlug(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    content,
    mainImage{
      asset->{
        url
      }
    },
    publishedAt,
    author,
    tags,
    metaTitle,
    metaDescription
  }`
  return await client.fetch(query, { slug })
}

// Obtener todos los productos ordenados por fecha de creación
export async function fetchProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc){
    _id,
    name,
    shortDescription,
    description,
    longDescription,
    cashPrice,
    cardPrice,
    features,
    specifications,
    images[]{asset->{url}},
    keywords
  }`
  const products = await client.fetch(query);
  // Asegura que los campos sean arrays
  return (Array.isArray(products) ? products : []).map(product => ({
    ...product,
    features: Array.isArray(product.features) ? product.features : [],
    specifications: Array.isArray(product.specifications) ? product.specifications : [],
    images: Array.isArray(product.images) ? product.images : [],
    keywords: Array.isArray(product.keywords) ? product.keywords : [],
  }));
}

// Obtener un producto por su ID
export async function fetchProductById(id: string) {
  const query = `*[_type == "product" && _id == $id][0]{
    _id,
    name,
    shortDescription,
    description,
    longDescription,
    cashPrice,
    cardPrice,
    features,
    specifications,
    images[]{asset->{url}},
    keywords
  }`
  const product = await client.fetch(query, { id });
  // Asegura que los campos sean arrays
  return {
    ...product,
    features: Array.isArray(product?.features) ? product.features : [],
    specifications: Array.isArray(product?.specifications) ? product.specifications : [],
    images: Array.isArray(product?.images) ? product.images : [],
    keywords: Array.isArray(product?.keywords) ? product.keywords : [],
  };
}


// Crear una orden en Sanity
export async function createOrder(orderData: any) {
  return await client.create({
    _type: "order",
    ...orderData,
  });
}


// Obtener todas las órdenes ordenadas por fecha de creación
export async function fetchOrders() {
  const query = `*[_type == "order"] | order(_createdAt desc)`;
  return await client.fetch(query);
}

// Crear un post de blog
export async function createPost(postData: any) {
  return await client.create({
    _type: "blog",
    ...postData,
  });
}

// Actualizar un post de blog
export async function updatePost(id: string, postData: any) {
  return await client.patch(id).set(postData).commit();
}

// Eliminar un post de blog
export async function deletePost(id: string) {
  return await client.delete(id);
}

export const fetchPosts = fetchBlogs;

// Crear un producto en Sanity
export async function createProduct(productData: any) {
  return await client.create({
    _type: "product",
    ...productData,
  });
}

// Actualizar un producto en Sanity
export async function updateProduct(id: string, productData: any) {
  return await client.patch(id).set(productData).commit();
}

// Eliminar un producto en Sanity
export async function deleteProduct(id: string) {
  return await client.delete(id);
}

// Eliminar una orden en Sanity
export async function deleteOrder(id: string) {
  return await client.delete(id);
}

// Actualizar el estado de una orden en Sanity
export async function updateOrderStatus(id: string, status: string) {
  return await client.patch(id).set({ status }).commit();
}