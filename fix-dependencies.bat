@echo off
echo Limpiando caché y reinstalando dependencias...

:: Limpiar caché de npm
call npm cache clean --force

:: Eliminar node_modules y package-lock.json
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

:: Reinstalar dependencias
call npm install --legacy-peer-deps

echo.
echo Dependencias reinstaladas correctamente.
echo Ahora puedes ejecutar: npm run dev

pause