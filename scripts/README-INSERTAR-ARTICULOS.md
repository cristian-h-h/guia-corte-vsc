# Instrucciones para Insertar Artículos de Blog de Ejemplo

Este documento explica cómo insertar los artículos de blog de ejemplo en tu base de datos Supabase.

## Opción 1: Usando el Script SQL

El método más directo es ejecutar el script SQL directamente en el Editor SQL de Supabase:

1. Accede al panel de administración de Supabase
2. Ve a la sección "SQL Editor"
3. Crea un nuevo script
4. Copia y pega el contenido del archivo `insertSampleBlogPosts.sql`
5. Ejecuta el script

Este método es el más sencillo y no requiere configuración adicional.

## Opción 2: Usando el Script JavaScript

Si prefieres usar el script JavaScript, sigue estos pasos:

### Requisitos previos

1. Node.js instalado en tu sistema
2. Paquetes necesarios instalados:
   ```bash
   npm install dotenv @supabase/supabase-js
   ```

### Configuración

1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   ```

   Si quieres insertar o actualizar articulos desde script y tu tabla `blog_posts` tiene RLS activa, agrega tambien:
   ```
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   ```

2. Asegúrate de que la tabla `blog_posts` existe en tu base de datos con la siguiente estructura:
   - `id`: UUID (clave primaria)
   - `title`: texto
   - `slug`: texto (único)
   - `excerpt`: texto
   - `content`: JSON
   - `image_url`: texto
   - `published_at`: timestamp
   - `author`: texto
   - `tags`: array de texto
   - `meta_title`: texto
   - `meta_description`: texto
   - `category`: texto
   - `is_published`: booleano

### Ejecución

Ejecuta el script con Node.js:
```bash
node scripts/insertSampleBlogPosts.js
```

## Opcion 3: Insertar los nuevos borradores SEO redactados

Si quieres cargar las nuevas entradas comerciales y SEO ya redactadas, usa el script:

```bash
npm run blog:drafts
```

Si `blog_posts` tiene RLS activa, este script necesitara `SUPABASE_SERVICE_ROLE_KEY` o `VITE_SUPABASE_SERVICE_ROLE_KEY` para poder escribir.

Este script inserta o actualiza estos articulos:

- `compatibilidad-guia-corte-makita-bosch-dewalt`
- `cuando-una-regla-casera-no-alcanza`
- `sierra-circular-con-guia-o-sierra-de-mesa-para-taller-pequeno`
- `como-cortar-melamina-mdf-y-terciado-con-menos-error`
- `guia-de-corte-para-router-cuando-si-conviene`

Los datos fuente quedan en:

- `scripts/blogDraftPosts.js`
- `scripts/insertSeoBlogDrafts.js`

## Solución de problemas

### Error: "syntax error at or near '//'"

Si ves este error al ejecutar el script SQL, asegúrate de estar usando el archivo `insertSampleBlogPosts.sql` y no el archivo JavaScript.

### Error: "Cannot find module '@supabase/supabase-js'"

Instala las dependencias necesarias:
```bash
npm install @supabase/supabase-js dotenv
```

### Error: "Cannot find module '../src/data/sampleBlogPost'"

Asegúrate de que el archivo `src/data/sampleBlogPost.ts` existe y está correctamente configurado.

## Verificación

Para verificar que los artículos se han insertado correctamente:

1. Accede al panel de administración de Supabase
2. Ve a la sección "Table Editor"
3. Selecciona la tabla `blog_posts`
4. Deberías ver los tres artículos de ejemplo listados

También puedes navegar a la ruta `/blog-preview` en tu aplicación para ver una vista previa de los artículos sin necesidad de insertarlos en la base de datos.
