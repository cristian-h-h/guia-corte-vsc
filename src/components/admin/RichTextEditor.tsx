import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ImageGallery from './ImageGallery';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
}

/**
 * Editor de texto enriquecido basado en TinyMCE
 */
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  height = 500,
  placeholder = 'Escribe tu contenido aquí...'
}) => {
  const editorRef = useRef<any>(null);
  const [showGallery, setShowGallery] = useState(false);

  // Función para abrir la galería de imágenes
  const openGallery = () => {
    setShowGallery(true);
  };

  // Función para insertar una imagen desde la galería
  const handleImageSelect = (imageUrl: string) => {
    if (editorRef.current) {
      editorRef.current.execCommand(
        'mceInsertContent', 
        false, 
        `<img src="${imageUrl}" alt="Imagen" style="max-width: 100%; height: auto;" />`
      );
    }
  };

  // Función para insertar una URL social
  const insertSocialEmbed = (type: string) => {
    let url = '';
    let embedCode = '';
    
    switch (type) {
      case 'youtube':
        url = prompt('Introduce la URL del video de YouTube:', 'https://www.youtube.com/watch?v=');
        if (url) {
          // Extraer el ID del video
          const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
          if (videoId) {
            embedCode = `<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
            editorRef.current?.execCommand('mceInsertContent', false, embedCode);
          } else {
            alert('URL de YouTube no válida');
          }
        }
        break;
        
      case 'instagram':
        url = prompt('Introduce la URL del post de Instagram:', 'https://www.instagram.com/p/');
        if (url) {
          // Extraer el código del post
          const match = url.match(/instagram\.com\/p\/([^\/]+)/i);
          if (match && match[1]) {
            embedCode = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${match[1]}/" style="max-width:540px; min-width:326px; margin: 0 auto;"><a href="https://www.instagram.com/p/${match[1]}/" target="_blank">Ver en Instagram</a></blockquote><script async src="//www.instagram.com/embed.js"></script>`;
            editorRef.current?.execCommand('mceInsertContent', false, embedCode);
          } else {
            alert('URL de Instagram no válida');
          }
        }
        break;
        
      case 'twitter':
        url = prompt('Introduce la URL del tweet:', 'https://twitter.com/');
        if (url) {
          embedCode = `<blockquote class="twitter-tweet"><a href="${url}">Ver Tweet</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;
          editorRef.current?.execCommand('mceInsertContent', false, embedCode);
        }
        break;
        
      case 'facebook':
        url = prompt('Introduce la URL del post de Facebook:', 'https://www.facebook.com/');
        if (url) {
          embedCode = `<div class="fb-post" data-href="${url}" data-width="500"></div><div id="fb-root"></div><script async defer src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v12.0"></script>`;
          editorRef.current?.execCommand('mceInsertContent', false, embedCode);
        }
        break;
        
      case 'pinterest':
        url = prompt('Introduce la URL del pin de Pinterest:', 'https://www.pinterest.com/pin/');
        if (url) {
          embedCode = `<a data-pin-do="embedPin" href="${url}"></a><script async defer src="//assets.pinterest.com/js/pinit.js"></script>`;
          editorRef.current?.execCommand('mceInsertContent', false, embedCode);
        }
        break;
    }
  };

  return (
    <>
      <Editor
        apiKey="your-tinymce-api-key" // Reemplaza con tu API key de TinyMCE o usa la versión sin API key
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={onChange}
        init={{
          height,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | customImage link | code | socialEmbed',
          content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:16px }',
          placeholder,
          setup: (editor) => {
            // Añadir botón para insertar contenido social
            editor.ui.registry.addMenuButton('socialEmbed', {
              text: 'Redes Sociales',
              fetch: (callback) => {
                const items = [
                  {
                    type: 'menuitem',
                    text: 'YouTube',
                    onAction: () => insertSocialEmbed('youtube')
                  },
                  {
                    type: 'menuitem',
                    text: 'Instagram',
                    onAction: () => insertSocialEmbed('instagram')
                  },
                  {
                    type: 'menuitem',
                    text: 'Twitter',
                    onAction: () => insertSocialEmbed('twitter')
                  },
                  {
                    type: 'menuitem',
                    text: 'Facebook',
                    onAction: () => insertSocialEmbed('facebook')
                  },
                  {
                    type: 'menuitem',
                    text: 'Pinterest',
                    onAction: () => insertSocialEmbed('pinterest')
                  }
                ];
                callback(items);
              }
            });
            
            // Reemplazar el botón de imagen por defecto con nuestro botón personalizado
            editor.ui.registry.addButton('customImage', {
              icon: 'image',
              tooltip: 'Insertar imagen',
              onAction: openGallery
            });
          },
          // Desactivar el diálogo de imagen por defecto
          file_picker_callback: undefined,
          image_advtab: false,
          image_uploadtab: false
        }}
      />
      
      {/* Galería de imágenes */}
      <ImageGallery
        open={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelect}
      />
    </>
  );
};

export default RichTextEditor;