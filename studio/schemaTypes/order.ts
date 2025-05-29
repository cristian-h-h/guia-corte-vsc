const order = {
  name: 'order',
  title: 'Orden',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Fecha',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'customer',
      title: 'Cliente',
      type: 'object',
      fields: [
        { name: 'nombre', type: 'string', title: 'Nombre' },
        { name: 'apellido', type: 'string', title: 'Apellido' },
        { name: 'rut', type: 'string', title: 'RUT' },
        { name: 'telefono', type: 'string', title: 'Teléfono' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'direccion', type: 'string', title: 'Dirección' },
        { name: 'comuna', type: 'string', title: 'Comuna' },
        { name: 'region', type: 'string', title: 'Región' },
        { name: 'detalles', type: 'string', title: 'Detalles' },
      ],
    },
    { name: 'tipoEntrega', title: 'Tipo de Entrega', type: 'string' },
    {
      name: 'items',
      title: 'Productos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'ID Producto' },
            { name: 'name', type: 'string', title: 'Nombre' },
            { name: 'quantity', type: 'number', title: 'Cantidad' },
            { name: 'price', type: 'number', title: 'Precio' },
          ],
        },
      ],
    },
    { name: 'total', title: 'Total', type: 'number' },
    { name: 'paymentMethod', title: 'Método de Pago', type: 'string' },
    { name: 'paymentUrl', title: 'URL de Pago', type: 'url' },
  ],
};

export default order;