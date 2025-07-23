# Configuración de Supabase para el Blog

Este documento explica cómo configurar Supabase para el blog de GuiaDeCorte.cl.

## 1. Configuración de Variables de Entorno

Para que la aplicación pueda conectarse a Supabase, necesitas configurar las variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto (copia el archivo `.env.example` como punto de partida)
2. Completa las variables con los valores de tu proyecto Supabase:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-anonima-muy-larga
   ```

Puedes encontrar estos valores en el panel de administración de Supabase:
- Ve a la sección "Settings" (Configuración)
- Selecciona "API"
- Copia la "URL" y la "anon public" key

## 2. Verificar la Conexión

Para verificar que la conexión con Supabase funciona correctamente:

1. Instala las dependencias necesarias:
   ```bash
   npm install dotenv @supabase/supabase-js
   ```

2. Ejecuta el script de verificación:
   ```bash
   node src/utils/checkSupabaseConnection.js
   ```

Este script verificará si la conexión con Supabase es exitosa y mostrará los artículos existentes en la tabla `blog_posts`.

## 3. Insertar un Artículo de Prueba

Para insertar un artículo de prueba directamente desde JavaScript:

```bash
node src/utils/insertSampleArticle.js
```

Este script insertará un artículo de prueba en la tabla `blog_posts` y mostrará el resultado.

## 4. Insertar los Artículos de Ejemplo

Para insertar los tres artículos de ejemplo:

1. Accede al panel de administración de Supabase
2. Ve a la sección "SQL Editor"
3. Crea un nuevo script
4. Copia y pega el contenido del archivo `scripts/insertSampleBlogPosts.sql`
5. Ejecuta el script

## 5. Solución de Problemas

### No se muestran los artículos en la ruta `/blog`

Si no se muestran los artículos en la ruta `/blog`, verifica:

1. **Variables de entorno**: Asegúrate de que las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` estén correctamente configuradas.

2. **Estructura de la tabla**: Verifica que la tabla `blog_posts` tenga la estructura correcta ejecutando el script `scripts/verify_table_fixed.sql` en el Editor SQL de Supabase.

3. **Artículos insertados**: Verifica que los artículos se hayan insertado correctamente ejecutando el script `scripts/check_blog_posts.sql` en el Editor SQL de Supabase.

4. **Consola del navegador**: Abre la consola del navegador (F12) y verifica si hay errores al cargar la página `/blog`.

### Error al insertar artículos

Si tienes errores al insertar artículos, verifica:

1. **Estructura de la tabla**: Asegúrate de que la tabla `blog_posts` tenga la estructura correcta.

2. **Formato de los datos**: Verifica que los datos que estás intentando insertar tengan el formato correcto.

3. **Permisos**: Asegúrate de que las políticas de seguridad de Supabase permitan insertar datos en la tabla `blog_posts`.