// Script para corregir el formato del archivo .env
// Ejecutar con: node src/utils/fixEnvFile.js

const fs = require('fs');
const path = require('path');

// Ruta al archivo .env
const envPath = path.join(__dirname, '../../.env');

// Función para corregir el archivo .env
function fixEnvFile() {
  console.log('Corrigiendo el formato del archivo .env...');
  
  try {
    // Leer el archivo .env
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // Mostrar el contenido actual
    console.log('Contenido actual del archivo .env:');
    console.log(envContent);
    
    // Buscar las variables de entorno
    const googleMapsApiKeyMatch = envContent.match(/VITE_GOOGLE_MAPS_API_KEY=([^\s#]*)/);
    const supabaseUrlMatch = envContent.match(/VITE_SUPABASE_URL=([^\s#]*)/);
    const supabaseAnonKeyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=([^\s#]*)/);
    
    // Verificar si se encontraron las variables
    if (!googleMapsApiKeyMatch) {
      console.error('No se encontró la variable VITE_GOOGLE_MAPS_API_KEY en el archivo .env');
      return;
    }
    
    if (!supabaseUrlMatch) {
      console.error('No se encontró la variable VITE_SUPABASE_URL en el archivo .env');
      return;
    }
    
    if (!supabaseAnonKeyMatch) {
      console.error('No se encontró la variable VITE_SUPABASE_ANON_KEY en el archivo .env');
      return;
    }
    
    // Extraer los valores
    const googleMapsApiKey = googleMapsApiKeyMatch[1];
    const supabaseUrl = supabaseUrlMatch[1];
    const supabaseAnonKey = supabaseAnonKeyMatch[1];
    
    // Crear el nuevo contenido del archivo .env
    const newEnvContent = `VITE_GOOGLE_MAPS_API_KEY=${googleMapsApiKey}
# Supabase
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseAnonKey}
`;
    
    // Mostrar el nuevo contenido
    console.log('\nNuevo contenido del archivo .env:');
    console.log(newEnvContent);
    
    // Preguntar si se desea guardar los cambios
    console.log('\n¿Deseas guardar los cambios? (s/n)');
    
    // Simular una respuesta afirmativa (en un script real, se usaría readline)
    console.log('Respuesta: s (simulada)');
    
    // Guardar los cambios
    fs.writeFileSync(envPath, newEnvContent);
    
    console.log('\nArchivo .env corregido correctamente.');
    console.log('Por favor, reinicia la aplicación para que los cambios surtan efecto.');
    
  } catch (err) {
    console.error('Error al corregir el archivo .env:', err);
  }
}

// Ejecutar la función
fixEnvFile();