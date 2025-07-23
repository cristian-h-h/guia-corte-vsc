# Configuración de la Galería con Supabase

Este documento describe los pasos para configurar la galería de imágenes en Supabase.

## Pasos para completar la configuración

### 1. Crear la tabla para las imágenes de la galería

1. Inicia sesión en tu cuenta de Supabase (https://app.supabase.com)
2. Selecciona tu proyecto "Guia de corte" (ID: rvrxdfgyqgghxecdjwfw)
3. Ve a "SQL Editor" en el menú lateral
4. Copia el contenido del archivo `scripts/create_gallery_table.sql`
5. Pégalo en el editor SQL de Supabase y ejecuta la consulta

### 2. Crear el bucket de almacenamiento para las imágenes de la galería

1. Ejecuta el script `scripts/create_storage_buckets.sql` en el SQL Editor de Supabase para crear el bucket `gallery-images`

### 3. Acceder al panel de administración de la galería

1. Accede a la página de administración en https://www.guiadecorte.cl/admin
2. Inicia sesión con tus credenciales
3. Selecciona la pestaña "Galería"
4. Desde aquí puedes:
   - Añadir nuevas imágenes
   - Editar imágenes existentes
   - Eliminar imágenes
   - Cambiar el orden de las imágenes

## Gestión de imágenes

### Añadir una nueva imagen

1. Haz clic en el botón "Añadir Imagen"
2. Completa el formulario:
   - **Imagen**: Puedes ingresar una URL o subir un archivo desde tu computadora
   - **Texto Alternativo (Alt)**: Descripción breve para accesibilidad y SEO
   - **Descripción**: Descripción detallada que se mostrará al ampliar la imagen
   - **Categoría**: Selecciona una categoría para la imagen (producto, uso, detalle, proyecto)
3. Haz clic en "Guardar"

### Editar una imagen existente

1. Haz clic en el botón de edición (icono de lápiz) junto a la imagen que deseas editar
2. Modifica los campos necesarios
3. Haz clic en "Guardar"

### Cambiar el orden de las imágenes

1. Usa los botones de flecha hacia arriba y hacia abajo para cambiar el orden de las imágenes
2. El orden se guarda automáticamente

### Eliminar una imagen

1. Haz clic en el botón de eliminación (icono de papelera) junto a la imagen que deseas eliminar
2. Confirma la eliminación

## Visualización en el sitio web

Las imágenes se mostrarán automáticamente en la página de galería (https://www.guiadecorte.cl/galeria) en el orden que hayas establecido en el panel de administración.