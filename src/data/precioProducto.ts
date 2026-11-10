/**
 * Precios vigentes de la Guía de Corte ProFix 126.
 *
 * Fuente única de verdad: los precios y las condiciones de despacho se definen
 * SOLO aquí y se consumen desde la portada, la ficha de producto y los datos
 * estructurados. Para cambiar los precios basta con editar este archivo.
 */

export const preciosProducto = {
  moneda: "CLP",
  /** Precio por unidad con pago en efectivo o transferencia. */
  precioEfectivo: 32000,
  /** Precio por unidad con pago con tarjeta y factura. */
  precioTarjeta: 38990,
  /** Desde cuántas unidades el despacho es gratis. */
  despachoGratisDesde: 2,
  /** Se puede retirar presencialmente en Región Metropolitana. */
  retiroEnRM: true,
};

/** Formatea un número como precio en pesos chilenos, ej. $32.000. */
export const formatCLP = (valor: number): string =>
  "$" + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
