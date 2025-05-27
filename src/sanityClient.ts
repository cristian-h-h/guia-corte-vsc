import sanityClient from '@sanity/client';

// Usa variables de entorno para el token en producción
const client = sanityClient({
  projectId: 'bohp27ug',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false, // false si usas token o necesitas datos frescos
  token: import.meta.env.VITE_SANITY_TOKEN // o process.env.SANITY_TOKEN si usas Node
});

export default client;