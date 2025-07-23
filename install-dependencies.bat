@echo off
echo Instalando dependencias para el blog...

:: Instalar dependencias principales
call npm install @supabase/supabase-js uuid

:: Instalar tipos para TypeScript
call npm install --save-dev @types/uuid

echo.
echo Dependencias instaladas correctamente.
echo.
echo Para habilitar el editor TinyMCE (opcional), ejecuta:
echo npm install @tinymce/tinymce-react
echo.
echo Reinicia la aplicación después de instalar las dependencias:
echo npm run dev

pause