# Migración de Sanity a Supabase

Este documento describe los pasos para migrar los datos de blogs de Sanity a Supabase.

## Pasos para completar la migración

### 1. Configurar Supabase

1. Inicia sesión en tu cuenta de Supabase (https://app.supabase.com)
2. Selecciona tu proyecto "Guia de corte" (ID: rvrxdfgyqgghxecdjwfw)

### 2. Tabla de blogs

La tabla `blog_posts` ya ha sido creada en Supabase con la siguiente estructura:

### 3. Configurar almacenamiento para imágenes

1. Ve a "Storage" en el menú lateral de Supabase
2. Ejecuta el script `scripts/create_storage_buckets.sql` en el SQL Editor para crear los buckets necesarios:
   - `blog-images`: Para almacenar imágenes de artículos del blog
   - `product-images`: Para almacenar imágenes de productos

Este script también configura las políticas de seguridad para permitir:
- Acceso público para ver las imágenes
- Acceso autenticado para subir, actualizar y eliminar imágenes

```sql
create table blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  image_url text,
  image_alt text,
  author text,
  author_slug text,
  author_avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  published_at timestamp with time zone,
  is_published boolean default false,
  tags text[],
  category text,
  canonical_url text,
  meta_title text,
  meta_description text,
  meta_keywords text,
  og_title text,
  og_description text,
  og_image_url text,
  twitter_title text,
  twitter_description text,
  twitter_image_url text,
  reading_time integer,
  views integer default 0,
  structured_data jsonb
);
```

### 3. Configurar las variables de entorno

1. Edita el archivo `.env` en la raíz del proyecto
2. Asegúrate de que las siguientes variables estén configuradas:
   ```
   VITE_SUPABASE_URL=https://rvrxdfgyqgghxecdjwfw.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   ```

### 4. Migrar los datos

1. Instala las dependencias necesarias:
   ```
   npm install dotenv
   ```

2. Ejecuta el script de migración:
   ```
   node scripts/migrateBlogsToSupabase.js
   ```

### 5. Verificar la migración

1. En Supabase, ve a "Table Editor" y selecciona la tabla "blogs"
2. Verifica que todos los blogs se hayan migrado correctamente

## Cambios en el código

Ya se han realizado los siguientes cambios en el código:

1. Se ha creado un nuevo cliente de Supabase en `src/supabaseClient.ts`
2. Se han creado funciones para interactuar con Supabase en `src/api/supabaseApi.ts`
3. Se han actualizado las páginas `Blog.tsx` y `BlogPost.tsx` para usar Supabase en lugar de Sanity

## Próximos pasos

1. Actualizar la página de administración para gestionar los blogs con Supabase
2. Migrar otros datos como productos y pedidos si es necesario
3. Eliminar las dependencias de Sanity una vez completada la migración