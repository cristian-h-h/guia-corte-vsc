import { NextApiRequest, NextApiResponse } from 'next';
import { generateSitemap } from '@/utils/generateSitemap';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar si la solicitud es un POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Verificar la clave API para seguridad
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.SITEMAP_API_KEY || 'sitemap-secret-key';

  if (apiKey !== validApiKey) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    // Generar el sitemap
    const success = await generateSitemap();

    if (success) {
      return res.status(200).json({ message: 'Sitemap generado correctamente' });
    } else {
      return res.status(500).json({ error: 'Error al generar el sitemap' });
    }
  } catch (error) {
    console.error('Error en el endpoint de generación de sitemap:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}