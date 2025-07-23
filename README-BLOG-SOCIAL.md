# Funcionalidades Sociales y Editor de Contenido para el Blog

Este documento explica cómo configurar y usar las nuevas funcionalidades sociales y el editor de contenido para el blog de GuiaDeCorte.cl.

## Características Implementadas

### 1. Editor de Texto Enriquecido (WYSIWYG)

Se ha implementado un editor de texto enriquecido basado en TinyMCE que permite:

- Formatear texto (negrita, cursiva, listas, etc.)
- Insertar imágenes
- Insertar enlaces
- Insertar contenido de redes sociales (YouTube, Instagram, Twitter, Facebook, Pinterest)
- Ver una vista previa del contenido

### 2. Botones de Compartir en Redes Sociales

Se han añadido botones para compartir los artículos en:

- Facebook
- Twitter
- LinkedIn
- WhatsApp
- Email
- Copiar enlace

### 3. Sistema de Comentarios

Se ha implementado un sistema de comentarios completo que permite:

- Añadir comentarios
- Responder a comentarios
- Dar "me gusta" a comentarios
- Editar comentarios
- Eliminar comentarios
- Reportar comentarios inapropiados

## Configuración

### 1. Crear la Tabla de Comentarios

Para habilitar el sistema de comentarios, debes crear la tabla `blog_comments` en Supabase:

1. Accede al panel de administración de Supabase
2. Ve a la sección "SQL Editor"
3. Crea un nuevo script
4. Copia y pega el contenido del archivo `scripts/createCommentsTable.sql`
5. Ejecuta el script

### 2. Configurar TinyMCE (opcional)

El editor TinyMCE funciona sin una API key, pero para acceder a todas las funcionalidades, puedes obtener una API key gratuita:

1. Regístrate en [TinyMCE](https://www.tiny.cloud/auth/signup/)
2. Obtén una API key
3. Reemplaza `your-tinymce-api-key` en el archivo `src/components/admin/RichTextEditor.tsx` con tu API key

### 3. Configurar Políticas de Seguridad en Supabase

Para que los comentarios funcionen correctamente, debes configurar las políticas de seguridad en Supabase:

1. Accede al panel de administración de Supabase
2. Ve a la sección "Authentication" > "Policies"
3. Verifica que existan las siguientes políticas para la tabla `blog_comments`:
   - `allow_public_select_blog_comments`: Permite a todos leer los comentarios
   - `allow_public_insert_blog_comments`: Permite a todos añadir comentarios

## Uso

### Editor de Texto Enriquecido

1. Accede al panel de administración (`/admin`)
2. Ve a la pestaña "Blog"
3. Haz clic en "Añadir Artículo" o edita un artículo existente
4. Utiliza el editor de texto enriquecido para crear o editar el contenido

#### Insertar Contenido de Redes Sociales

1. Coloca el cursor donde quieres insertar el contenido
2. Haz clic en el botón "Redes Sociales" en la barra de herramientas
3. Selecciona la red social (YouTube, Instagram, Twitter, Facebook, Pinterest)
4. Introduce la URL del contenido
5. Haz clic en "Aceptar"

### Botones de Compartir

Los botones de compartir aparecen automáticamente en cada artículo del blog. No se requiere configuración adicional.

### Sistema de Comentarios

Los comentarios aparecen automáticamente al final de cada artículo del blog. Los usuarios pueden:

1. Añadir un comentario principal
2. Responder a comentarios existentes
3. Dar "me gusta" a los comentarios
4. Reportar comentarios inapropiados

Como administrador, puedes:
1. Editar cualquier comentario
2. Eliminar cualquier comentario
3. Ver los comentarios reportados (funcionalidad pendiente de implementar)

## Personalización

### Estilos

Puedes personalizar los estilos de los componentes editando los siguientes archivos:

- `src/components/SocialShareButtons.tsx`: Estilos de los botones de compartir
- `src/components/CommentSection.tsx`: Estilos de la sección de comentarios
- `src/components/admin/RichTextEditor.tsx`: Estilos del editor de texto

### Funcionalidades

Puedes añadir o modificar funcionalidades editando los componentes correspondientes:

- `src/components/SocialShareButtons.tsx`: Añadir más redes sociales
- `src/components/CommentSection.tsx`: Modificar el sistema de comentarios
- `src/components/admin/RichTextEditor.tsx`: Añadir más opciones al editor

## Próximos Pasos

1. **Panel de Moderación de Comentarios**: Implementar un panel para que los administradores puedan moderar los comentarios reportados.
2. **Notificaciones por Email**: Enviar notificaciones por email cuando alguien responde a un comentario.
3. **Integración con Redes Sociales**: Permitir iniciar sesión con redes sociales para comentar.
4. **Estadísticas de Compartidos**: Añadir un contador para ver cuántas veces se ha compartido un artículo.
5. **Galería de Imágenes**: Implementar una galería de imágenes para el editor de texto.