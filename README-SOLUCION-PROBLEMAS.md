# Solución de Problemas con el Editor de Texto y Dependencias

Este documento proporciona soluciones para los problemas comunes que pueden surgir con el editor de texto enriquecido y las dependencias del blog.

## Problema: Error 500 al cargar RichTextEditor.tsx

Si estás viendo un error 500 al cargar el componente RichTextEditor, es probable que falten algunas dependencias o que haya un problema con la configuración de TinyMCE.

### Solución 1: Usar el Editor Simple

Hemos implementado un editor de texto simple como alternativa a TinyMCE. Este editor ya está configurado y debería funcionar sin problemas.

El editor simple permite escribir contenido HTML directamente, lo que te da control total sobre el formato del contenido.

### Solución 2: Instalar las Dependencias Correctamente

Si prefieres usar el editor TinyMCE con todas sus funcionalidades, asegúrate de instalar todas las dependencias necesarias:

#### En Windows:
```
install-dependencies.bat
npm install @tinymce/tinymce-react
```

#### En Linux/Mac:
```
chmod +x install-dependencies.sh
./install-dependencies.sh
npm install @tinymce/tinymce-react
```

### Solución 3: Usar CDN para TinyMCE

Si sigues teniendo problemas con TinyMCE, puedes modificar el componente RichTextEditor para usar la versión CDN de TinyMCE:

1. Abre el archivo `src/components/admin/RichTextEditor.tsx`
2. Busca la línea `apiKey="your-tinymce-api-key"`
3. Reemplázala con `apiKey="no-api-key"` (esto usará la versión CDN gratuita)

## Problema: Error al subir imágenes

Si tienes problemas al subir imágenes, verifica lo siguiente:

1. **Configuración de Supabase Storage**: Asegúrate de que el bucket "blog-images" existe y tiene las políticas de seguridad correctas.

2. **Variables de entorno**: Verifica que las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` estén correctamente configuradas en el archivo `.env`.

3. **Tamaño de archivo**: El tamaño máximo por defecto es 5MB. Si necesitas subir imágenes más grandes, modifica el límite en el componente `ImageGallery.tsx`.

## Problema: Error al iniciar sesión con redes sociales

Si tienes problemas con la autenticación social, verifica lo siguiente:

1. **Configuración de proveedores**: Asegúrate de que los proveedores sociales estén correctamente configurados en Supabase.

2. **URLs de redirección**: Verifica que las URLs de redirección estén correctamente configuradas en las aplicaciones de los proveedores.

3. **Dominios autorizados**: Asegúrate de que tu dominio esté autorizado en las configuraciones de los proveedores.

## Problema: Los comentarios no se guardan

Si los comentarios no se guardan correctamente, verifica lo siguiente:

1. **Tabla de comentarios**: Asegúrate de que la tabla `blog_comments` existe en Supabase con la estructura correcta.

2. **Políticas de seguridad**: Verifica que las políticas de seguridad permitan insertar comentarios sin autenticación.

3. **Errores en la consola**: Abre la consola del navegador (F12) y verifica si hay errores al enviar comentarios.

## Contacto para soporte

Si sigues teniendo problemas después de intentar estas soluciones, contacta al equipo de desarrollo para obtener ayuda adicional.