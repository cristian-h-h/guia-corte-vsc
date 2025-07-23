// Script para configurar la galería: crear tabla e insertar datos
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Se requieren las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_SERVICE_KEY o VITE_SUPABASE_ANON_KEY');
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

// Función para ejecutar SQL desde un archivo
async function executeSqlFromFile(filePath) {
  try {
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    
    // Dividir el contenido en declaraciones SQL individuales
    const statements = sqlContent
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    console.log(`Ejecutando ${statements.length} declaraciones SQL desde ${filePath}...`);
    
    // Ejecutar cada declaración
    for (const statement of statements) {
      const { error } = await supabase.rpc('exec_sql', { sql: statement });
      
      if (error) {
        console.warn(`Advertencia al ejecutar SQL: ${error.message}`);
        console.warn('Declaración SQL:', statement);
        // No detenemos la ejecución, continuamos con las siguientes declaraciones
      }
    }
    
    console.log('✓ SQL ejecutado correctamente');
    return true;
  } catch (error) {
    console.error('Error al ejecutar SQL:', error.message);
    return false;
  }
}

// Función para verificar si la tabla existe
async function checkTableExists(tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('count(*)', { count: 'exact', head: true });
    
    if (error && error.code === '42P01') {
      // Error 42P01 significa que la tabla no existe
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error al verificar la tabla:', error.message);
    return false;
  }
}

// Función para crear buckets de almacenamiento
async function createStorageBuckets() {
  try {
    console.log('Verificando buckets de almacenamiento...');
    
    // Listar buckets existentes
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      throw new Error(`Error al listar buckets: ${listError.message}`);
    }
    
    // Verificar y crear bucket gallery-images
    if (!buckets.some(b => b.name === 'gallery-images')) {
      console.log('Creando bucket gallery-images...');
      const { error: createError } = await supabase.storage.createBucket('gallery-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      });
      
      if (createError) {
        console.warn(`Advertencia al crear bucket gallery-images: ${createError.message}`);
      } else {
        console.log('✓ Bucket gallery-images creado correctamente');
      }
    } else {
      console.log('✓ El bucket gallery-images ya existe');
    }
    
    // Verificar y crear bucket blog-images
    if (!buckets.some(b => b.name === 'blog-images')) {
      console.log('Creando bucket blog-images...');
      const { error: createError } = await supabase.storage.createBucket('blog-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      });
      
      if (createError) {
        console.warn(`Advertencia al crear bucket blog-images: ${createError.message}`);
      } else {
        console.log('✓ Bucket blog-images creado correctamente');
      }
    } else {
      console.log('✓ El bucket blog-images ya existe');
    }
    
    return true;
  } catch (error) {
    console.error('Error al crear buckets:', error.message);
    return false;
  }
}

// Función para insertar imágenes predeterminadas
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
      console.log(`Ya existen ${existingImages.length} imágenes en la tabla.`);
      return true;
    }
    
    console.log('Insertando imágenes predeterminadas...');
    
    // Insertar las imágenes predeterminadas
    const { data, error } = await supabase
      .from('gallery_images')
      .insert(defaultGalleryImages);
    
    if (error) {
      throw new Error(`Error al insertar imágenes: ${error.message}`);
    }
    
    console.log('✓ Imágenes predeterminadas insertadas correctamente');
    return true;
  } catch (error) {
    console.error('Error al insertar imágenes:', error.message);
    return false;
  }
}

// Función principal para configurar la galería
async function setupGallery() {
  console.log('=== Configuración de la Galería ===');
  
  // 1. Verificar si la tabla gallery_images existe
  console.log('\n1. Verificando si la tabla gallery_images existe...');
  const tableExists = await checkTableExists('gallery_images');
  
  // 2. Crear la tabla si no existe
  if (!tableExists) {
    console.log('\n2. La tabla gallery_images no existe. Creándola...');
    const sqlFilePath = path.join(__dirname, 'createGalleryTable.sql');
    await executeSqlFromFile(sqlFilePath);
  } else {
    console.log('\n2. La tabla gallery_images ya existe.');
  }
  
  // 3. Crear buckets de almacenamiento
  console.log('\n3. Configurando buckets de almacenamiento...');
  await createStorageBuckets();
  
  // 4. Insertar imágenes predeterminadas si la tabla está vacía
  console.log('\n4. Configurando imágenes predeterminadas...');
  await insertDefaultImages();
  
  console.log('\n=== Configuración completada ===');
}

// Ejecutar la función principal
setupGallery();