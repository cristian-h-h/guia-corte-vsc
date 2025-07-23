// Script para insertar imágenes predeterminadas en la tabla gallery_images de Supabase
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Se requieren las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Imágenes predeterminadas
const defaultGalleryImages = [
  {
    src: "/guia-imagenes/guia-corte-profix-126.webp",
    alt: "Guía de Corte ProFix 126 - Vista general del producto",
    description: "Vista general de la Guía de Corte ProFix 126, mostrando su diseño en aluminio aeronáutico y sistema de ajuste rápido.",
    order: 0,
    category: "producto"
  },
  {
    src: "/guia-imagenes/corte-sierra-circular-profix-126.webp",
    alt: "Guía ProFix 126 en uso con sierra circular para corte recto",
    description: "Demostración de corte recto con sierra circular utilizando la guía ProFix 126 en tablero de melamina.",
    order: 1,
    category: "uso"
  },
  {
    src: "/guia-imagenes/ajuste-recto-profix-126.webp",
    alt: "Sistema de ajuste rápido de la Guía ProFix 126",
    description: "Detalle del sistema de ajuste rápido Quick-Lock que permite cambios de configuración en segundos.",
    order: 2,
    category: "detalle"
  },
  {
    src: "/guia-imagenes/guia-profix-126.webp",
    alt: "Guía ProFix 126 con sistema de sujeción multidireccional",
    description: "Vista del sistema de sujeción multidireccional con topes ajustables en acero endurecido.",
    order: 3,
    category: "producto"
  },
  {
    src: "/guia-imagenes/profix-126-guia-corte-recto.webp",
    alt: "Guía ProFix 126 para cortes rectos de precisión",
    description: "Guía ProFix 126 preparada para realizar cortes rectos de precisión industrial en diversos materiales.",
    order: 4,
    category: "producto"
  },
  {
    src: "/guia-imagenes/guia-corte-logo.png",
    alt: "Logo oficial de Guía de Corte ProFix 126",
    description: "Logo oficial del producto Guía de Corte ProFix 126, símbolo de precisión en carpintería.",
    order: 5,
    category: "detalle"
  },
  {
    src: "/guia-imagenes/guia-corte-router.webp",
    alt: "Guía ProFix 126 con router para trabajos de precisión",
    description: "Uso de la guía ProFix 126 con router para realizar ranurados y acabados de precisión.",
    order: 6,
    category: "uso"
  },
  {
    src: "/guia-imagenes/guia-corte-caladora.webp",
    alt: "Guía ProFix 126 con sierra caladora para cortes rectos",
    description: "Aplicación de la guía ProFix 126 con sierra caladora para lograr cortes rectos perfectos.",
    order: 7,
    category: "uso"
  },
  {
    src: "/guia-imagenes/guia-corte-materiales.webp",
    alt: "Guía ProFix 126 con diversos materiales compatibles",
    description: "Demostración de la versatilidad de la guía ProFix 126 con diferentes materiales como madera, melamina y MDF.",
    order: 8,
    category: "proyecto"
  }
];

// Función para insertar las imágenes en la base de datos
async function insertDefaultImages() {
  try {
    console.log('Verificando si ya existen imágenes en la tabla gallery_images...');
    
    // Verificar si ya hay imágenes en la tabla
    const { data: existingImages, error: countError } = await supabase
      .from('gallery_images')
      .select('id');
    
    if (countError) {
      throw new Error(`Error al verificar imágenes existentes: ${countError.message}`);
    }
    
    if (existingImages && existingImages.length > 0) {
      console.log(`Ya existen ${existingImages.length} imágenes en la tabla. ¿Desea continuar y agregar las imágenes predeterminadas? (s/n)`);
      
      // Aquí normalmente habría una interacción con el usuario, pero como es un script,
      // podemos decidir automáticamente continuar o usar process.stdin para pedir confirmación
      
      // Para este ejemplo, continuaremos automáticamente
      console.log('Continuando con la inserción...');
    }
    
    console.log('Insertando imágenes predeterminadas...');
    
    // Insertar las imágenes predeterminadas
    const { data, error } = await supabase
      .from('gallery_images')
      .insert(defaultGalleryImages);
    
    if (error) {
      throw new Error(`Error al insertar imágenes: ${error.message}`);
    }
    
    console.log('¡Imágenes predeterminadas insertadas correctamente!');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Ejecutar la función
insertDefaultImages();