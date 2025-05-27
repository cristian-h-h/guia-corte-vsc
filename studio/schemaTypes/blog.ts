export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'excerpt', title: 'Extracto', type: 'string' },
    { name: 'content', title: 'Contenido', type: 'array', of: [{ type: 'block' }] },
    { name: 'mainImage', title: 'Imagen principal', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime' },
    { name: 'author', title: 'Autor', type: 'string' },
    { name: 'tags', title: 'Etiquetas', type: 'array', of: [{ type: 'string' }] }
  ]
}