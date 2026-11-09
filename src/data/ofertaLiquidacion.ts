/**
 * Oferta de liquidación de la última partida de la Guía de Corte ProFix 126.
 *
 * Fuente única de verdad: los precios, packs y stock de la promoción se definen
 * SOLO aquí y se consumen desde la portada, la ficha de producto y los datos
 * estructurados. Para cambiar la oferta basta con editar este archivo.
 */

export interface PackLiquidacion {
  /** Identificador estable del pack. */
  id: string;
  /** Cantidad de guías incluidas en el pack. */
  unidades: number;
  /** Texto corto mostrado en el selector. */
  etiqueta: string;
  /** A quién apunta este pack (taller, mueblista, etc.). */
  publico: string;
  /** Precio por unidad en efectivo o transferencia. */
  precioUnitario: number;
  /** Precio por unidad con tarjeta. */
  precioUnitarioTarjeta: number;
  /** Pack sugerido visualmente. */
  destacado?: boolean;
  /** Cinta/badge opcional (ej. "Envío gratis"). */
  cinta?: string;
}

export const ofertaLiquidacion = {
  activa: true,
  moneda: "CLP",
  titulo: "Liquidación de inventario",
  titular: "Liquidamos la última partida de la ProFix 126",
  descripcion:
    "Cerramos la última importación de la ProFix 126. Más de 100 guías disponibles a precio de remate, con despacho inmediato en todo Chile y validación de compatibilidad antes de comprar.",
  /** Unidades totales de la partida. */
  stockTotal: 150,
  /** Unidades que quedan disponibles. */
  stockRestante: 118,
  vigencia: "Hasta agotar stock",
  /** Desde cuántas unidades el despacho es gratis. */
  despachoGratisDesde: 2,
  /** Se puede retirar presencialmente en Región Metropolitana. */
  retiroEnRM: true,
  /** Precio normal de referencia (efectivo/transferencia). */
  precioNormalUnitario: 35000,
  /** Precio normal de referencia (tarjeta). */
  precioNormalTarjeta: 38990,
  packs: [
    {
      id: "pack-1",
      unidades: 1,
      etiqueta: "1 unidad",
      publico: "Para probar o reponer",
      precioUnitario: 29900,
      precioUnitarioTarjeta: 33990,
    },
    {
      id: "pack-2",
      unidades: 2,
      etiqueta: "2 unidades",
      publico: "Segunda guía o regalo",
      precioUnitario: 27500,
      precioUnitarioTarjeta: 31500,
      cinta: "Envío gratis",
    },
    {
      id: "pack-3",
      unidades: 3,
      etiqueta: "3 unidades",
      publico: "Taller chico",
      precioUnitario: 26000,
      precioUnitarioTarjeta: 30000,
      destacado: true,
      cinta: "Más elegido",
    },
    {
      id: "pack-5",
      unidades: 5,
      etiqueta: "5 unidades",
      publico: "Mueblista o equipo",
      precioUnitario: 24500,
      precioUnitarioTarjeta: 28500,
      cinta: "Mejor precio",
    },
  ] as PackLiquidacion[],
};

/** Devuelve el pack que calza con una cantidad exacta de unidades. */
export const getPackLiquidacion = (unidades: number): PackLiquidacion | undefined =>
  ofertaLiquidacion.packs.find((pack) => pack.unidades === unidades);

/** Precio unitario de oferta vigente (pack de 1 unidad por defecto). */
export const precioOfertaUnitario = ofertaLiquidacion.packs[0].precioUnitario;

/** Porcentaje de descuento frente al precio normal. */
export const descuentoOfertaPct = (precioNormal: number, precioOferta: number): number =>
  Math.max(0, Math.round(((precioNormal - precioOferta) / precioNormal) * 100));

/** Porcentaje de unidades ya agotadas de la partida. */
export const ofertaAgotadoPct = (): number => {
  const { stockTotal, stockRestante } = ofertaLiquidacion;
  if (!stockTotal) return 0;
  return Math.min(100, Math.max(0, Math.round(((stockTotal - stockRestante) / stockTotal) * 100)));
};

/** Formatea un número como precio en pesos chilenos, ej. $29.900. */
export const formatCLP = (valor: number): string =>
  "$" + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
