import { supabase } from '@/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

/**
 * Sube un archivo a Supabase Storage
 * @param file Archivo a subir
 * @param bucket Nombre del bucket (carpeta) donde se guardará el archivo
 * @param folder Subcarpeta opcional dentro del bucket
 * @returns URL pública del archivo subido o null si hay error
 */
export const uploadFile = async (
  file: File,
  bucket: string = 'public',
  folder: string = ''
): Promise<string | null> => {
  try {
    // Generar un nombre único para el archivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Subir el archivo a Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error al subir archivo:', error);
      return null;
    }

    // Obtener la URL pública del archivo
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    return null;
  }
};

/**
 * Elimina un archivo de Supabase Storage
 * @param url URL pública del archivo a eliminar
 * @param bucket Nombre del bucket donde está el archivo
 * @returns true si se eliminó correctamente, false si hubo error
 */
export const deleteFile = async (
  url: string,
  bucket: string = 'public'
): Promise<boolean> => {
  try {
    // Extraer el path del archivo de la URL
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    const filePath = pathSegments.slice(pathSegments.indexOf(bucket) + 1).join('/');

    // Eliminar el archivo
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Error al eliminar archivo:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error al procesar la eliminación:', error);
    return false;
  }
};