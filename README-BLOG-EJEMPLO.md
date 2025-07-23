# Artículos de Blog de Ejemplo para GuiaDeCorte.cl

Este documento proporciona instrucciones sobre cómo utilizar los artículos de blog de ejemplo creados para el sitio web GuiaDeCorte.cl.

## Contenido

Se han creado tres artículos de blog de ejemplo:

1. **Cómo lograr cortes perfectos con tu guía ProFix 126**
   - Un tutorial detallado sobre técnicas de corte
   - Incluye secciones sobre preparación, técnicas y mantenimiento

2. **5 proyectos de carpintería para principiantes con guía de corte**
   - Una lista de proyectos sencillos para principiantes
   - Ideal para inspirar a nuevos usuarios

3. **Guía de mantenimiento para herramientas de carpintería**
   - Consejos sobre el cuidado y mantenimiento de herramientas
   - Enfocado en prolongar la vida útil de las herramientas

## Estructura de los Artículos

Cada artículo incluye:

- Título optimizado para SEO
- Extracto (excerpt) atractivo
- Contenido en formato PortableText para compatibilidad con el componente de renderizado
- URL de imagen principal
- Fecha de publicación
- Autor
- Etiquetas (tags)
- Metadatos para SEO (meta_title, meta_description)
- Categoría

## Cómo Utilizar los Artículos

### Opción 1: Insertar en Supabase

Para insertar los artículos en la base de datos Supabase:

1. Asegúrate de tener configuradas las variables de entorno:
   ```
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install dotenv @supabase/supabase-js
   ```

3. Ejecuta el script de inserción:
   ```bash
   node scripts/insertSampleBlogPosts.js
   ```

### Opción 2: Insertar Manualmente

Si prefieres insertar los artículos manualmente:

1. Accede al panel de administración de Supabase
2. Ve a la tabla `blog_posts`
3. Utiliza la opción "Insert Row" y copia los datos de cada artículo desde el archivo `src/data/sampleBlogPost.ts`

### Opción 3: Usar como Datos de Prueba

Si solo necesitas datos de prueba durante el desarrollo:

1. Importa los artículos de ejemplo en tu componente:
   ```typescript
   import { sampleBlogPosts } from '@/data/sampleBlogPost';
   ```

2. Utiliza los datos importados en lugar de hacer llamadas a la API:
   ```typescript
   const [blogPosts, setBlogPosts] = useState(sampleBlogPosts);
   ```

## Imágenes

Los artículos hacen referencia a imágenes que deberían estar alojadas en:
- `https://www.guiadecorte.cl/blog-imagenes/cortes-perfectos-guia.webp`
- `https://www.guiadecorte.cl/blog-imagenes/proyectos-principiantes.webp`
- `https://www.guiadecorte.cl/blog-imagenes/mantenimiento-herramientas.webp`

Asegúrate de:
1. Crear el directorio `/blog-imagenes/` en tu servidor
2. Subir imágenes relevantes con estos nombres
3. O bien, actualizar las URLs en los datos de los artículos para que apunten a imágenes existentes

## Personalización

Puedes personalizar los artículos editando el archivo `src/data/sampleBlogPost.ts`:

- Modifica el contenido en formato PortableText
- Actualiza las fechas de publicación
- Cambia los autores, etiquetas o categorías
- Ajusta los metadatos SEO

## Próximos Pasos

Una vez que tengas los artículos de ejemplo funcionando:

1. Crea un panel de administración para gestionar los artículos
2. Implementa un editor WYSIWYG para facilitar la creación de contenido
3. Añade funcionalidades de comentarios y compartir en redes sociales
4. Configura un sistema de categorías y etiquetas más robusto
5. Implementa análisis de rendimiento para medir el engagement de los artículos