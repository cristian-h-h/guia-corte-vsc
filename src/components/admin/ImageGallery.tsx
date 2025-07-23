import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Upload, 
  Search, 
  Loader2, 
  X, 
  Image as ImageIcon, 
  Trash2, 
  Copy, 
  Check 
} from 'lucide-react';
import { supabase } from '@/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface ImageGalleryProps {
  open: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string, imageId?: string, altText?: string) => void;
  bucketName?: string;
  productId?: string;
  showMetadata?: boolean;
}

interface ImageItem {
  id: string;
  name: string;
  url: string;
  size: number;
  created_at: string;
  alt_text?: string;
  position?: number;
  is_main?: boolean;
  metadata?: {
    alt_text?: string;
    position?: number;
    is_main?: boolean;
    product_id?: string;
  };
}

/**
 * Componente de galería de imágenes para el editor de texto y productos
 */
const ImageGallery: React.FC<ImageGalleryProps> = ({
  open,
  onClose,
  onSelect,
  bucketName = 'blog-images',
  productId,
  showMetadata = false
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('gallery');
  const [urlInput, setUrlInput] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Estado para metadatos de imagen
  const [altText, setAltText] = useState('');
  const [position, setPosition] = useState(0);
  const [isMain, setIsMain] = useState(false);
  
  // Cargar imágenes al abrir la galería
  useEffect(() => {
    if (open) {
      loadImages();
    }
  }, [open, bucketName, productId]);

  // Función para cargar imágenes desde Supabase Storage
  const loadImages = async () => {
    try {
      setLoading(true);
      
      // Listar archivos en el bucket
      const { data, error } = await supabase
        .storage
        .from(bucketName)
        .list();
      
      if (error) {
        throw error;
      }
      
      // Filtrar solo imágenes
      const imageFiles = data.filter(file => 
        !file.id.includes('/') && 
        (file.metadata?.mimetype?.startsWith('image/') || 
         file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
      );
      
      // Obtener URLs públicas para cada imagen
      let imagesWithUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const { data: urlData } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(file.name);
          
          return {
            id: file.id,
            name: file.name,
            url: urlData.publicUrl,
            size: file.metadata?.size || 0,
            created_at: file.created_at
          };
        })
      );
      
      // Si estamos en modo producto y tenemos un productId, cargar metadatos
      if (bucketName === 'product-images' && productId) {
        // Obtener metadatos de imágenes para este producto
        const { data: metadataData, error: metadataError } = await supabase
          .from('product_images')
          .select('*')
          .eq('product_id', productId);
        
        if (metadataError) {
          console.error('Error al cargar metadatos:', metadataError);
        } else if (metadataData) {
          // Combinar metadatos con imágenes
          imagesWithUrls = imagesWithUrls.map(image => {
            const metadata = metadataData.find(m => m.url === image.url);
            if (metadata) {
              return {
                ...image,
                alt_text: metadata.alt_text,
                position: metadata.position,
                is_main: metadata.is_main,
                metadata: {
                  alt_text: metadata.alt_text,
                  position: metadata.position,
                  is_main: metadata.is_main,
                  product_id: metadata.product_id
                }
              };
            }
            return image;
          });
          
          // Filtrar solo imágenes de este producto si tenemos productId
          if (productId) {
            imagesWithUrls = imagesWithUrls.filter(img => 
              img.metadata?.product_id === productId
            );
          }
        }
      }
      
      // Ordenar por posición si es producto, o por fecha si es blog
      const sortedImages = bucketName === 'product-images' && productId
        ? imagesWithUrls.sort((a, b) => (a.position || 0) - (b.position || 0))
        : imagesWithUrls.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      
      setImages(sortedImages);
    } catch (error) {
      console.error('Error al cargar imágenes:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las imágenes',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para subir una imagen
  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      setUploadProgress(0);
      
      // Generar un nombre único para el archivo
      const fileExt = file.name.split('.').pop();
      const fileName = productId 
        ? `${productId}-${uuidv4()}.${fileExt}` 
        : `${uuidv4()}.${fileExt}`;
      
      // Simular progreso de carga
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const next = prev + Math.random() * 10;
          return next > 95 ? 95 : next;
        });
      }, 300);
      
      // Subir el archivo
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      clearInterval(progressInterval);
      
      if (error) {
        throw error;
      }
      
      setUploadProgress(100);
      
      // Obtener la URL pública
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);
      
      // Si es una imagen de producto y tenemos productId, guardar metadatos
      if (bucketName === 'product-images' && productId && urlData) {
        // Determinar la posición (última posición + 1)
        let newPosition = 0;
        const { data: existingImages } = await supabase
          .from('product_images')
          .select('position')
          .eq('product_id', productId)
          .order('position', { ascending: false })
          .limit(1);
        
        if (existingImages && existingImages.length > 0) {
          newPosition = (existingImages[0].position || 0) + 1;
        }
        
        // Determinar si es la imagen principal (solo si es la primera)
        const isMainImage = newPosition === 0;
        
        // Guardar metadatos
        const { error: metadataError } = await supabase
          .from('product_images')
          .insert([{
            product_id: productId,
            url: urlData.publicUrl,
            alt_text: altText || file.name.split('.')[0],
            position: newPosition,
            is_main: isMainImage
          }]);
        
        if (metadataError) {
          console.error('Error al guardar metadatos:', metadataError);
        }
      }
      
      toast({
        title: 'Imagen subida',
        description: 'La imagen se ha subido correctamente'
      });
      
      // Recargar la galería
      loadImages();
      
      // Cambiar a la pestaña de galería
      setActiveTab('gallery');
    } catch (error: any) {
      console.error('Error al subir imagen:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo subir la imagen',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Función para eliminar una imagen
  const deleteImage = async (imageName: string, imageUrl?: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      return;
    }
    
    try {
      // Eliminar el archivo de Storage
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([imageName]);
      
      if (error) {
        throw error;
      }
      
      // Si es una imagen de producto, eliminar también los metadatos
      if (bucketName === 'product-images' && imageUrl) {
        const { error: metadataError } = await supabase
          .from('product_images')
          .delete()
          .eq('url', imageUrl);
        
        if (metadataError) {
          console.error('Error al eliminar metadatos:', metadataError);
        }
      }
      
      toast({
        title: 'Imagen eliminada',
        description: 'La imagen se ha eliminado correctamente'
      });
      
      // Actualizar la lista de imágenes
      setImages(images.filter(img => img.name !== imageName));
      
      // Si la imagen eliminada estaba seleccionada, deseleccionarla
      if (selectedImage === imageName) {
        setSelectedImage(null);
      }
    } catch (error: any) {
      console.error('Error al eliminar imagen:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo eliminar la imagen',
        variant: 'destructive'
      });
    }
  };

  // Función para manejar la selección de archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verificar que sea una imagen
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Tipo de archivo no válido',
          description: 'Por favor, selecciona una imagen',
          variant: 'destructive'
        });
        return;
      }
      
      // Verificar tamaño máximo (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Archivo demasiado grande',
          description: 'El tamaño máximo permitido es 5MB',
          variant: 'destructive'
        });
        return;
      }
      
      uploadImage(file);
    }
  };

  // Función para manejar el arrastre de archivos
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Verificar que sea una imagen
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Tipo de archivo no válido',
          description: 'Por favor, arrastra una imagen',
          variant: 'destructive'
        });
        return;
      }
      
      // Verificar tamaño máximo (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Archivo demasiado grande',
          description: 'El tamaño máximo permitido es 5MB',
          variant: 'destructive'
        });
        return;
      }
      
      uploadImage(file);
    }
  };

  // Función para prevenir el comportamiento por defecto del arrastre
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Función para actualizar metadatos de una imagen
  const updateImageMetadata = async (imageUrl: string, metadata: { alt_text?: string, position?: number, is_main?: boolean }) => {
    try {
      if (!productId) return;
      
      const { error } = await supabase
        .from('product_images')
        .update(metadata)
        .eq('url', imageUrl)
        .eq('product_id', productId);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Metadatos actualizados',
        description: 'Los metadatos de la imagen se han actualizado correctamente'
      });
      
      // Recargar imágenes para reflejar los cambios
      loadImages();
    } catch (error: any) {
      console.error('Error al actualizar metadatos:', error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudieron actualizar los metadatos',
        variant: 'destructive'
      });
    }
  };

  // Función para seleccionar una imagen
  const handleSelectImage = () => {
    if (activeTab === 'gallery' && selectedImage) {
      const image = images.find(img => img.name === selectedImage);
      if (image) {
        // Pasar también el ID y texto alternativo si están disponibles
        onSelect(
          image.url, 
          image.id, 
          image.alt_text || image.metadata?.alt_text || ''
        );
        onClose();
      }
    } else if (activeTab === 'url' && urlInput) {
      onSelect(urlInput);
      onClose();
    }
  };

  // Función para copiar la URL de una imagen
  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: 'URL copiada',
        description: 'La URL de la imagen se ha copiado al portapapeles'
      });
    });
  };

  // Filtrar imágenes por búsqueda
  const filteredImages = searchQuery
    ? images.filter(img => img.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : images;

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Galería de imágenes</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mb-4">
            <TabsTrigger value="gallery">Galería</TabsTrigger>
            <TabsTrigger value="upload">Subir imagen</TabsTrigger>
            <TabsTrigger value="url">URL externa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="flex-1 overflow-hidden flex flex-col">
            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Buscar imágenes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                onClick={loadImages}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Actualizar'}
              </Button>
            </div>
            
            {/* Metadatos de imagen si showMetadata es true y hay una imagen seleccionada */}
            {showMetadata && selectedImage && (
              <div className="mb-4 p-4 border rounded-md bg-gray-50">
                <h3 className="font-medium mb-2">Metadatos de imagen</h3>
                {(() => {
                  const image = images.find(img => img.name === selectedImage);
                  if (!image) return null;
                  
                  return (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Texto alternativo (SEO)
                        </label>
                        <Input
                          value={altText || image.alt_text || image.metadata?.alt_text || ''}
                          onChange={(e) => setAltText(e.target.value)}
                          placeholder="Descripción de la imagen para SEO"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Posición
                          </label>
                          <Input
                            type="number"
                            min="0"
                            value={position !== undefined ? position : image.position || image.metadata?.position || 0}
                            onChange={(e) => setPosition(parseInt(e.target.value))}
                          />
                        </div>
                        
                        <div className="flex items-end">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isMain !== undefined ? isMain : image.is_main || image.metadata?.is_main || false}
                              onChange={(e) => setIsMain(e.target.checked)}
                              className="h-4 w-4"
                            />
                            <span>Imagen principal</span>
                          </label>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => {
                          updateImageMetadata(image.url, {
                            alt_text: altText || image.alt_text || image.metadata?.alt_text,
                            position: position !== undefined ? position : image.position || image.metadata?.position,
                            is_main: isMain !== undefined ? isMain : image.is_main || image.metadata?.is_main
                          });
                        }}
                      >
                        Actualizar metadatos
                      </Button>
                    </div>
                  );
                })()}
              </div>
            )}
            
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : filteredImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ImageIcon className="h-12 w-12 mb-2" />
                  <p>No hay imágenes disponibles</p>
                  {searchQuery && (
                    <Button
                      variant="link"
                      onClick={() => setSearchQuery('')}
                      className="mt-2"
                    >
                      Limpiar búsqueda
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className={`
                        relative group border rounded-md overflow-hidden cursor-pointer
                        ${selectedImage === image.name ? 'ring-2 ring-blue-500' : ''}
                        ${image.is_main || image.metadata?.is_main ? 'border-2 border-green-500' : ''}
                      `}
                      onClick={() => setSelectedImage(image.name)}
                    >
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={image.url}
                          alt={image.alt_text || image.metadata?.alt_text || image.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/150?text=Error';
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyImageUrl(image.url);
                            }}
                          >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteImage(image.name, image.url);
                            }}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate flex justify-between">
                        <span>{formatFileSize(image.size)}</span>
                        {(image.position !== undefined || image.metadata?.position !== undefined) && (
                          <span>Pos: {image.position || image.metadata?.position}</span>
                        )}
                      </div>
                      {(image.is_main || image.metadata?.is_main) && (
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 py-0.5">
                          Principal
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="flex-1">
            <div
              className="border-2 border-dashed rounded-lg p-8 h-full flex flex-col items-center justify-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {uploading ? (
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Subiendo imagen...</p>
                  <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">{Math.round(uploadProgress)}%</p>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Arrastra y suelta una imagen</h3>
                  <p className="text-sm text-gray-500 mb-6 text-center">
                    O haz clic en el botón para seleccionar una imagen de tu dispositivo.<br />
                    Formatos soportados: JPG, PNG, GIF, WEBP. Tamaño máximo: 5MB.
                  </p>
                  <label>
                    <Button as="span">Seleccionar imagen</Button>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="flex-1">
            <div className="space-y-4">
              <div>
                <label htmlFor="image-url" className="block text-sm font-medium mb-1">
                  URL de la imagen
                </label>
                <Input
                  id="image-url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Introduce la URL de una imagen existente en internet
                </p>
              </div>
              
              {urlInput && (
                <div className="border rounded-md p-4">
                  <p className="text-sm font-medium mb-2">Vista previa:</p>
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <img
                      src={urlInput}
                      alt="Vista previa"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x225?text=Error+de+imagen';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSelectImage}
            disabled={(activeTab === 'gallery' && !selectedImage) || (activeTab === 'url' && !urlInput)}
          >
            Insertar imagen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGallery;