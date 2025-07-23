# Integración con Redes Sociales y Galería de Imágenes

Este documento explica cómo configurar y usar las nuevas funcionalidades de integración con redes sociales y galería de imágenes para el blog de GuiaDeCorte.cl.

## 1. Integración con Redes Sociales para Comentarios

Se ha implementado un sistema de autenticación social que permite a los usuarios iniciar sesión con sus cuentas de redes sociales para comentar en los artículos del blog.

### Características

- Inicio de sesión con Facebook, Twitter y GitHub
- Inicio de sesión con enlace mágico por email
- Perfil de usuario con avatar y nombre
- Comentarios asociados a usuarios autenticados

### Configuración

Para habilitar la autenticación social en Supabase:

1. Accede al panel de administración de Supabase
2. Ve a la sección "Authentication" > "Providers"
3. Configura los proveedores sociales que deseas utilizar:

#### Facebook

1. Crea una aplicación en [Facebook Developers](https://developers.facebook.com/)
2. Configura la URL de OAuth Redirect: `https://[TU_PROYECTO].supabase.co/auth/v1/callback`
3. Obtén el App ID y App Secret
4. Activa el proveedor en Supabase y añade las credenciales

#### Twitter

1. Crea una aplicación en [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Configura la URL de OAuth Redirect: `https://[TU_PROYECTO].supabase.co/auth/v1/callback`
3. Obtén la API Key y API Secret
4. Activa el proveedor en Supabase y añade las credenciales

#### GitHub

1. Crea una aplicación en [GitHub Developer Settings](https://github.com/settings/developers)
2. Configura la URL de OAuth Redirect: `https://[TU_PROYECTO].supabase.co/auth/v1/callback`
3. Obtén el Client ID y Client Secret
4. Activa el proveedor en Supabase y añade las credenciales

### Uso

Los usuarios pueden:

1. Hacer clic en "Iniciar sesión para comentar" en la sección de comentarios
2. Seleccionar su proveedor preferido (Facebook, Twitter, GitHub o Email)
3. Autorizar la aplicación
4. Comentar con su perfil social

## 2. Galería de Imágenes para el Editor de Texto

Se ha implementado una galería de imágenes integrada con el editor de texto que permite:

- Ver todas las imágenes subidas
- Subir nuevas imágenes
- Buscar imágenes existentes
- Insertar imágenes desde URL externas
- Eliminar imágenes

### Características

- Interfaz de arrastrar y soltar para subir imágenes
- Vista previa de imágenes
- Búsqueda de imágenes por nombre
- Inserción de imágenes en el editor con un solo clic
- Gestión de imágenes (copiar URL, eliminar)

### Configuración

Para configurar el almacenamiento de imágenes en Supabase:

1. Accede al panel de administración de Supabase
2. Ve a la sección "Storage"
3. Crea un nuevo bucket llamado "blog-images"
4. Configura las políticas de seguridad:

#### Política para permitir SELECT a todos

```sql
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');
```

#### Política para permitir INSERT a usuarios autenticados

```sql
CREATE POLICY "Allow authenticated users to upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-images' AND
    auth.role() = 'authenticated'
  );
```

#### Política para permitir DELETE a usuarios autenticados

```sql
CREATE POLICY "Allow authenticated users to delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-images' AND
    auth.role() = 'authenticated'
  );
```

### Uso

Para usar la galería de imágenes en el editor:

1. Haz clic en el botón "Imagen" en la barra de herramientas del editor
2. Se abrirá la galería de imágenes con tres pestañas:
   - **Galería**: Muestra todas las imágenes subidas
   - **Subir imagen**: Permite subir una nueva imagen
   - **URL externa**: Permite insertar una imagen desde una URL externa
3. Selecciona una imagen existente o sube una nueva
4. Haz clic en "Insertar imagen" para añadirla al contenido

## Próximos Pasos

1. **Panel de Administración de Comentarios**: Implementar un panel para moderar comentarios
2. **Estadísticas de Interacción Social**: Añadir métricas sobre comentarios y compartidos
3. **Integración con Más Redes Sociales**: Añadir soporte para Google, Apple, etc.
4. **Organización de Imágenes por Carpetas**: Permitir organizar las imágenes en carpetas
5. **Editor de Imágenes Integrado**: Añadir funcionalidades básicas de edición de imágenes

## Solución de Problemas

### Problemas con la Autenticación Social

1. Verifica que las URLs de redirección estén correctamente configuradas
2. Asegúrate de que las credenciales de las aplicaciones sean correctas
3. Comprueba que los dominios de tu aplicación estén autorizados en las configuraciones de los proveedores

### Problemas con la Galería de Imágenes

1. Verifica que el bucket "blog-images" exista en Supabase Storage
2. Asegúrate de que las políticas de seguridad estén correctamente configuradas
3. Comprueba los límites de tamaño de archivo (máximo 5MB por defecto)

## Recursos Adicionales

- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentación de Supabase Storage](https://supabase.com/docs/guides/storage)
- [Documentación de TinyMCE](https://www.tiny.cloud/docs/)