#!/usr/bin/env node

// Script para generar el sitemap automáticamente mediante una solicitud a la API
const https = require('https');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Configuración
const apiKey = process.env.SITEMAP_API_KEY || 'sitemap-secret-key';
const domain = process.env.DOMAIN || 'www.guiadecorte.cl';
const isProduction = process.env.NODE_ENV === 'production';

// URL de la API
const apiUrl = isProduction
  ? `https://${domain}/api/generate-sitemap`
  : 'http://localhost:3000/api/generate-sitemap';

// Opciones de la solicitud
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey
  }
};

// Función para realizar la solicitud
function makeRequest() {
  return new Promise((resolve, reject) => {
    const req = https.request(apiUrl, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('Sitemap generado correctamente');
          resolve(data);
        } else {
          console.error(`Error: ${res.statusCode} - ${data}`);
          reject(new Error(`Error: ${res.statusCode} - ${data}`));
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('Error al realizar la solicitud:', error);
      reject(error);
    });
    
    req.end();
  });
}

// Ejecutar la solicitud
makeRequest()
  .then(() => {
    console.log('Proceso completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error en el proceso:', error);
    process.exit(1);
  });