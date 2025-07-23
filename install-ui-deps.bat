@echo off
echo Instalando dependencias de UI...

:: Instalar dependencias de Radix UI
call npm install @radix-ui/react-switch @radix-ui/react-select @radix-ui/react-radio-group @radix-ui/react-collapsible embla-carousel-react --legacy-peer-deps

echo.
echo Dependencias instaladas correctamente.
echo.
echo Reinicia la aplicación después de instalar las dependencias:
echo npm run dev

pause