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
  /** Empresa de envío a todo Chile. */
  envioNacional: "Starken",
  /** Dirección para retiro presencial. */
  direccionRetiro: "Juan Hus 145, Maipú",
  /** Ubicación del punto de retiro en Google Maps. */
  mapaRetiroUrl:
    "https://www.google.com/maps/place/Guia+de+Corte+ProFIX126/@-33.5268406,-70.7933168,17z/data=!3m1!4b1!4m6!3m5!1s0x9662ddd247f40bb5:0x5dca66f388b5b58e!8m2!3d-33.5268451!4d-70.7907419!16s%2Fg%2F11zwmv8rj1?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D",
};

/** Formatea un número como precio en pesos chilenos, ej. $32.000. */
export const formatCLP = (valor: number): string =>
  "$" + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
