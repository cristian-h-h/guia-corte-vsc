-- Script para actualizar los artículos de blog existentes

-- Actualizar el primer artículo
UPDATE blog_posts
SET 
  content = '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "La guía de corte ProFix 126 es una herramienta esencial para cualquier carpintero que busque precisión en sus cortes."}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Con su diseño innovador y materiales de alta calidad, esta guía te permitirá realizar cortes perfectos en una variedad de materiales."}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Para lograr cortes perfectos, sigue estos pasos:"}]}, {"type": "bulletList", "content": [{"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Marca claramente la línea de corte"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Posiciona la guía alineada con la marca"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Asegura la guía firmemente"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Realiza el corte manteniendo una velocidad constante"}]}]}]}]}',
  image_alt = 'Guía de corte ProFix 126 en uso para cortes perfectos'
WHERE slug = 'como-lograr-cortes-perfectos-guia-profix-126';

-- Actualizar el segundo artículo
UPDATE blog_posts
SET 
  content = '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "La carpintería puede parecer intimidante para los principiantes, pero con las herramientas adecuadas y proyectos simples, cualquiera puede crear piezas impresionantes."}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Estos cinco proyectos son perfectos para principiantes:"}]}, {"type": "bulletList", "content": [{"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Estante flotante"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Tabla de cortar"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Organizador de escritorio"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Caja decorativa"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Marco de fotos"}]}]}]}]}',
  image_alt = 'Proyectos de carpintería para principiantes con guía de corte'
WHERE slug = '5-proyectos-carpinteria-principiantes-guia-corte';

-- Actualizar el tercer artículo
UPDATE blog_posts
SET 
  content = '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "El mantenimiento adecuado de tus herramientas de carpintería no solo prolonga su vida útil, sino que también garantiza resultados precisos y profesionales en cada proyecto."}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Consejos de mantenimiento:"}]}, {"type": "bulletList", "content": [{"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Limpia tus herramientas después de cada uso"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Verifica regularmente el estado de las cuchillas"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Lubrica las partes móviles"}]}]}, {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Almacena en un lugar seco"}]}]}]}]}',
  image_alt = 'Mantenimiento de herramientas de carpintería'
WHERE slug = 'guia-mantenimiento-herramientas-carpinteria';