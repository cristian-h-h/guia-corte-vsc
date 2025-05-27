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
  return await client.fetch(query)
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
  return await client.fetch(query, { id })
}