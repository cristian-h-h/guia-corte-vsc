# Limpieza de Sanity Studio

Este documento describe los cambios realizados para eliminar Sanity Studio del proyecto y migrar completamente a Supabase.

## Cambios realizados

1. **Eliminación de archivos y carpetas**:
   - Eliminada la carpeta `studio/` completa
   - Eliminado el archivo `src/sanityClient.ts`
   - Eliminado el archivo `src/api/sanityApi.ts`
   - Eliminado el script `scripts/migrateBlogsToSupabase.js`

2. **Modificación de referencias**:
   - Actualizado `src/pages/Carrito.tsx` para eliminar referencias a Sanity
   - Actualizado `src/components/admin/ProductAdmin.tsx` para eliminar referencias a Sanity
   - Actualizado `src/components/admin/OrdersAdmin.tsx` para eliminar referencias a Sanity
   - Actualizado `src/api/paykunotificacion.ts` para eliminar referencias a Sanity

3. **Componentes UI faltantes**:
   - Creado `src/components/ui/switch.tsx`
   - Creado `src/components/ui/select.tsx`
   - Creado `src/components/ui/radio-group.tsx`
   - Creado `src/components/ui/collapsible.tsx`
   - Creado `src/components/ui/carousel.tsx`
   - Creado `src/lib/utils.ts` para funciones de utilidad

## Dependencias instaladas

Se han instalado las siguientes dependencias:
- `@radix-ui/react-switch`
- `@radix-ui/react-select`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-collapsible`
- `embla-carousel-react`

## Próximos pasos

1. **Implementar funciones de Supabase**:
   - Crear funciones equivalentes en `src/api/supabaseApi.ts` para reemplazar las funcionalidades de Sanity
   - Actualizar los componentes que utilizaban las funciones de Sanity para usar las nuevas funciones de Supabase

2. **Actualizar la integración de pagos**:
   - Implementar `createOrder` con Supabase en `src/api/paykunotificacion.ts`

3. **Probar la aplicación**:
   - Verificar que todas las funcionalidades siguen funcionando correctamente
   - Comprobar que no hay errores en la consola relacionados con Sanity

## Notas adicionales

- Se ha mantenido la estructura de datos compatible con la implementación anterior para minimizar los cambios necesarios en los componentes
- Se han añadido comentarios TODO donde se requiere implementación adicional