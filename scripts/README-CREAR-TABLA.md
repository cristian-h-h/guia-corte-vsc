# Instrucciones para Crear la Tabla de Blog Posts

Este documento explica cómo crear la tabla `blog_posts` en tu base de datos Supabase utilizando los scripts SQL proporcionados.

## Problema Detectado

Parece que hay un problema al intentar crear la tabla o añadir la restricción UNIQUE a la columna `slug`. Para resolver este problema, hemos dividido el proceso en varios pasos.

## Pasos a Seguir

### Paso 1: Verificar la Estructura Actual

Ejecuta el script `createBlogPostsTable_step1.sql` para:
- Verificar si la tabla `blog_posts` ya existe
- Listar las columnas existentes en la tabla

Este paso te ayudará a entender el estado actual de la tabla en tu base de datos.

### Paso 2: Crear la Tabla o Añadir la Columna Slug

Ejecuta el script `createBlogPostsTable_step2.sql` para:
- Crear la tabla `blog_posts` si no existe
- Añadir la columna `slug` si no existe en la tabla

### Paso 3: Añadir Restricciones e Índices

Ejecuta el script `createBlogPostsTable_step3.sql` para:
- Añadir la restricción NOT NULL a la columna `slug`
- Añadir la restricción UNIQUE a la columna `slug`
- Crear índices para mejorar el rendimiento

### Paso 4: Crear Función y Trigger

Ejecuta el script `createBlogPostsTable_step4.sql` para:
- Crear la función para actualizar automáticamente el timestamp
- Crear el trigger para la actualización automática
- Añadir comentarios para documentar la tabla y sus columnas

## Solución Alternativa

Si sigues teniendo problemas con los scripts, puedes intentar crear la tabla manualmente desde el panel de administración de Supabase:

1. Accede al panel de administración de Supabase
2. Ve a la sección "Table Editor"
3. Haz clic en "New Table"
4. Configura la tabla con las siguientes columnas:
   - `id`: UUID (clave primaria)
   - `title`: texto (no nulo)
   - `slug`: texto (no nulo, único)
   - `excerpt`: texto
   - `content`: JSON
   - `image_url`: texto
   - `published_at`: timestamp con zona horaria
   - `author`: texto
   - `tags`: array de texto
   - `meta_title`: texto
   - `meta_description`: texto
   - `category`: texto
   - `is_published`: booleano
   - `created_at`: timestamp con zona horaria
   - `updated_at`: timestamp con zona horaria

## Verificación

Para verificar que la tabla se ha creado correctamente:

1. Ejecuta el script `createBlogPostsTable_step1.sql` nuevamente
2. Deberías ver un mensaje indicando que la tabla existe y una lista de todas las columnas

Una vez que la tabla esté correctamente creada, puedes proceder a insertar los artículos de ejemplo utilizando el script `insertSampleBlogPosts.sql`.