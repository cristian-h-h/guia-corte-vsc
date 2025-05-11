// filepath: c:\Users\trabajo\guia-corte-webshop-main\src\sanityClient.ts
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'bohp27ug', // Reemplaza con tu Project ID de Sanity
  dataset: 'production', // Dataset configurado en Sanity
  apiVersion: '2023-01-01', // Fecha de la API (puedes ajustarla según sea necesario)
  useCdn: true, // Usa el CDN para obtener datos más rápido
});

export default client;