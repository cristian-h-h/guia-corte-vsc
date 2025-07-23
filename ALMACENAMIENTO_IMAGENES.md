# Almacenamiento de Imágenes en Supabase

Este documento explica cómo funciona el nuevo sistema de almacenamiento de imágenes en Supabase.

## Configuración

El sistema está configurado con dos buckets (carpetas) en Supabase Storage:

1. `blog-images`: Para almacenar imágenes de artículos del blog
2. `product-images`: Para almacenar imágenes de productos

## Cómo subir imágenes

### En el panel de administración

1. Al editar o crear un artículo de blog o producto, verás un campo para la imagen
2. Puedes ingresar una URL directamente si la imagen ya está en línea
3. O puedes hacer clic en el botón "Subir" para seleccionar un archivo de tu computadora
4. La imagen se subirá automáticamente a Supabase Storage y se mostrará una vista previa
5. Al guardar el artículo o producto, la URL de la imagen se guardará en la base de datos

### Ventajas del nuevo sistema

- **Almacenamiento centralizado**: Todas las imágenes se almacenan en un solo lugar
- **URLs permanentes**: Las URLs de las imágenes no cambiarán, incluso si cambias de proveedor de hosting
- **Optimización automática**: Supabase optimiza las imágenes para una carga más rápida
- **Seguridad**: Solo usuarios autenticados pueden subir, actualizar o eliminar imágenes

## Limitaciones

- El tamaño máximo de archivo es de 50MB
- Se recomienda usar formatos de imagen optimizados como WebP, JPEG o PNG
- Para imágenes muy grandes, considera comprimirlas antes de subirlas

## Solución de problemas

Si tienes problemas al subir imágenes:

1. Verifica que estás autenticado en el panel de administración
2. Asegúrate de que el archivo no exceda el tamaño máximo
3. Intenta con un formato de imagen diferente
4. Si el problema persiste, contacta al administrador del sistema