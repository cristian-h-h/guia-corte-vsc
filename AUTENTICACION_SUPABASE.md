# Configuración de Autenticación con Supabase

Este documento describe los pasos para configurar la autenticación en Supabase para el panel de administración.

## Pasos para configurar la autenticación

### 1. Habilitar la autenticación por correo electrónico en Supabase

1. Inicia sesión en tu cuenta de Supabase (https://app.supabase.com)
2. Selecciona tu proyecto "Guia de corte" (ID: rvrxdfgyqgghxecdjwfw)
3. Ve a "Authentication" en el menú lateral
4. En la pestaña "Providers", asegúrate de que "Email" esté habilitado
5. Configura las opciones según tus preferencias (por ejemplo, si quieres requerir confirmación de correo)

### 2. Crear un usuario administrador

1. Ve a la pestaña "Users" en la sección "Authentication"
2. Haz clic en "Invite user" o "Create user"
3. Ingresa el correo electrónico y contraseña del administrador
4. Asegúrate de que el usuario tenga los permisos necesarios

### 3. Configurar la redirección para restablecimiento de contraseña

1. Ve a la pestaña "URL Configuration" en la sección "Authentication"
2. En "Site URL", ingresa la URL de tu sitio (por ejemplo, https://guiadecorte.cl)
3. En "Redirect URLs", añade las URLs permitidas para redirección (por ejemplo, https://guiadecorte.cl/admin)

## Uso del panel de administración

1. Accede a la página de administración en https://guiadecorte.cl/admin
2. Inicia sesión con el correo electrónico y contraseña que configuraste
3. Si olvidas tu contraseña, puedes usar la opción "¿Olvidó su contraseña?" para restablecerla

## Seguridad

- La autenticación se maneja completamente a través de Supabase, lo que proporciona una capa adicional de seguridad
- Las contraseñas nunca se almacenan en texto plano
- Se utilizan tokens JWT para mantener la sesión
- Puedes configurar la duración de la sesión y otras opciones de seguridad en la configuración de Supabase