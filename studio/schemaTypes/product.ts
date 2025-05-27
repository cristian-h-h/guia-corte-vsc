export default {
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nombre', type: 'string' },
    { name: 'shortDescription', title: 'Descripción corta', type: 'string' },
    { name: 'description', title: 'Descripción', type: 'text' },
    { name: 'longDescription', title: 'Descripción larga', type: 'text' },
    { name: 'cashPrice', title: 'Precio efectivo', type: 'number' },
    { name: 'cardPrice', title: 'Precio tarjeta', type: 'number' },
    { name: 'features', title: 'Características', type: 'array', of: [{ type: 'string' }] },
    { name: 'specifications', title: 'Especificaciones', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    { name: 'keywords', title: 'Palabras clave', type: 'array', of: [{ type: 'string' }] }
  ]
}