#!/bin/bash

# Script para instalar las dependencias necesarias para el blog

echo "Instalando dependencias para el blog..."

# Instalar dependencias principales
npm install @supabase/supabase-js uuid

# Instalar tipos para TypeScript
npm install --save-dev @types/uuid

echo "Dependencias instaladas correctamente."
echo ""
echo "Para habilitar el editor TinyMCE (opcional), ejecuta:"
echo "npm install @tinymce/tinymce-react"
echo ""
echo "Reinicia la aplicación después de instalar las dependencias:"
echo "npm run dev"