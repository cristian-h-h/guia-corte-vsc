import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  MessageSquare,
  Ruler,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { preciosProducto, formatCLP } from "@/data/precioProducto";
import { trackContact, trackInitiateCheckout, getCampaign } from "@/utils/tracking";

const ahorro = preciosProducto.precioTarjeta - preciosProducto.precioEfectivo;
const ahorroPct = Math.round((ahorro / preciosProducto.precioTarjeta) * 100);

const WHATSAPP_PHONE = "56935777727";
const baseWhatsappText = `Hola, quiero comprar la Guía de Corte ProFix 126 pagando en efectivo o transferencia a ${formatCLP(
  preciosProducto.precioEfectivo
)}.`;
const baseWhatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(baseWhatsappText)}`;

/**
 * Agrega el origen de campana al mensaje, para saber de que red viene el
 * visitante (ej. "... (vengo de TikTok / campana-liquidacion)").
 */
const buildWhatsappUrl = () => {
  const { utm_source, utm_campaign } = getCampaign();
  if (!utm_source) return baseWhatsappUrl;
  const origen = utm_campaign ? `${utm_source} / ${utm_campaign}` : utm_source;
  const texto = `${baseWhatsappText} (vengo de ${origen})`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(texto)}`;
};

const marcas = ["Makita", "DeWalt", "Bosch", "Ubermann", "Stanley", "Ingco", "Skil", "Einhell"];

const caracteristicas = [
  {
    icon: Ruler,
    titulo: "1.26 m de largo útil",
    texto: "Cubre la plancha estándar de 1.22 m en una sola pasada, sin cortes intermedios ni desviaciones.",
  },
  {
    icon: ShieldCheck,
    titulo: "Corte recto y repetible",
    texto: "Convierte tu sierra circular en una guía estable: menos desperdicio y piezas iguales una tras otra.",
  },
  {
    icon: Truck,
    titulo: "Envío inmediato en Chile",
    texto: `Despacho a todo Chile mediante ${preciosProducto.envioNacional} y retiro en ${preciosProducto.direccionRetiro}.`,
  },
];

const metodosPago = [
  {
    icon: Banknote,
    titulo: "Efectivo o transferencia",
    precio: preciosProducto.precioEfectivo,
    descripcion: "El mejor precio. Pagas directo, sin recargo por medio de pago.",
    destacado: true,
    detalles: [
      "Ahorras " + formatCLP(ahorro) + " por unidad",
      "Precio final " + formatCLP(preciosProducto.precioEfectivo),
      "Ideal si quieres el menor costo total",
    ],
  },
  {
    icon: CreditCard,
    titulo: "Tarjeta y factura",
    precio: preciosProducto.precioTarjeta,
    descripcion: "Pagas con tarjeta y recibes factura para tu contabilidad.",
    destacado: false,
    detalles: [
      "Incluye boleta o factura",
      "Costo " + formatCLP(ahorro) + " mayor por unidad",
      "Precio con documento " + formatCLP(preciosProducto.precioTarjeta),
    ],
  },
];

const Precio = () => {
  // El href base (sin campana) se usa en el render inicial para no romper la
  // hidratacion; recien tras montar se agrega el origen de campana.
  const [whatsappUrl, setWhatsappUrl] = useState(baseWhatsappUrl);

  useEffect(() => {
    setWhatsappUrl(buildWhatsappUrl());
  }, []);

  return (
    <>
      <Helmet>
        <title>ProFix 126: {formatCLP(preciosProducto.precioEfectivo)} en efectivo o transferencia (ahorra {formatCLP(ahorro)}) | GuiaDeCorte.cl</title>
        <meta
          name="description"
          content={`Guía de corte ProFix 126 de 1.26m. Paga en efectivo o transferencia a ${formatCLP(preciosProducto.precioEfectivo)} y ahorra ${formatCLP(ahorro)} frente al pago con tarjeta y factura a ${formatCLP(preciosProducto.precioTarjeta)}. Envío a todo Chile.`}
        />
        <link rel="canonical" href="https://www.guiadecorte.cl/precio" />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gris-900 via-gris-800 to-taller-800 text-white">
        <div className="container mx-auto px-4 py-14 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-naranja-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                Precio directo del taller
              </span>
              <h1 className="mt-6 text-3xl font-extrabold leading-tight md:text-5xl">
                Paga en <span className="text-naranja-300">efectivo o transferencia</span> y ahorra{" "}
                <span className="text-naranja-300">{formatCLP(ahorro)}</span> en tu ProFix 126
              </h1>
              <p className="mt-5 max-w-xl text-lg text-gris-200">
                Es la misma guía de corte de 1.26 m, con el mismo envío. La única diferencia está en cómo pagas:
                en efectivo o transferencia bajas el precio; con tarjeta y factura pagas el valor con documento.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="relative rounded-2xl border-2 border-naranja-400 bg-white/10 p-5 backdrop-blur">
                  <span className="absolute -top-3 left-4 rounded-full bg-naranja-500 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                    Efectivo / Transferencia
                  </span>
                  <p className="mt-2 text-4xl font-extrabold text-naranja-300">{formatCLP(preciosProducto.precioEfectivo)}</p>
                  <p className="mt-1 text-sm text-gris-200">
                    por unidad · ahorras {formatCLP(ahorro)} (-{ahorroPct}%)
                  </p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-gris-300">Tarjeta / Factura</span>
                  <p className="mt-2 text-3xl font-extrabold text-white">{formatCLP(preciosProducto.precioTarjeta)}</p>
                  <p className="mt-1 text-sm text-gris-300">por unidad · incluye documento</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/producto/profix-126"
                  className="sm:w-auto"
                  onClick={() => trackInitiateCheckout("precio-hero", preciosProducto.precioEfectivo)}
                >
                  <Button className="h-auto w-full whitespace-normal rounded-xl bg-naranja-600 px-6 py-4 text-base font-bold text-white hover:bg-naranja-700 sm:w-auto">
                    Comprar al mejor precio <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:w-auto"
                  onClick={() => trackContact("precio-hero")}
                >
                  <Button
                    variant="outline"
                    className="h-auto w-full whitespace-normal rounded-xl border-2 border-white/40 bg-transparent px-6 py-4 text-base font-bold text-white hover:bg-white/10 sm:w-auto"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" /> Consultar por WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <img
                src="/guia-imagenes/guia-corte-profix-126.webp"
                alt="Guía de corte recto ProFix 126 de 1.26m para sierra circular"
                className="w-full rounded-3xl border border-white/10 shadow-2xl"
                loading="eager"
              />
              <div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-white p-4 text-center shadow-xl">
                <p className="text-[11px] font-bold uppercase tracking-wide text-gris-500">
                  Ahorro pagando en efectivo o transferencia
                </p>
                <p className="text-3xl font-extrabold text-taller-900">{formatCLP(ahorro)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUE CAMBIA EL PRECIO */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-gris-900 md:text-4xl">
              La misma guía. Dos precios según <span className="text-naranja-600">cómo pagas</span>.
            </h2>
            <p className="mt-4 text-lg text-gris-700">
              Cuando pagas en efectivo o transferencia evitamos el costo del medio de pago y del documento tributario,
              y te traspasamos ese ahorro directo. Si necesitas factura o pagar con tarjeta, el valor sube a{" "}
              {formatCLP(preciosProducto.precioTarjeta)}.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            {metodosPago.map((metodo) => {
              const Icon = metodo.icon;
              return (
                <div
                  key={metodo.titulo}
                  className={
                    metodo.destacado
                      ? "relative rounded-2xl border-2 border-naranja-500 bg-naranja-50 p-6 shadow-xl"
                      : "rounded-2xl border border-gris-200 bg-white p-6 shadow-sm"
                  }
                >
                  {metodo.destacado && (
                    <span className="absolute -top-3 left-6 rounded-full bg-naranja-500 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                      Mejor precio
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        metodo.destacado
                          ? "inline-flex h-10 w-10 items-center justify-center rounded-full bg-naranja-600 text-white"
                          : "inline-flex h-10 w-10 items-center justify-center rounded-full bg-gris-100 text-gris-700"
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-bold uppercase tracking-wide text-gris-700">{metodo.titulo}</p>
                  </div>
                  <p
                    className={
                      metodo.destacado
                        ? "mt-4 text-4xl font-extrabold text-naranja-600"
                        : "mt-4 text-4xl font-extrabold text-gris-900"
                    }
                  >
                    {formatCLP(metodo.precio)}
                  </p>
                  <p className="mt-2 text-sm text-gris-600">{metodo.descripcion}</p>
                  <ul className="mt-4 space-y-2">
                    {metodo.detalles.map((detalle) => (
                      <li key={detalle} className="flex items-start gap-2 text-sm text-gris-700">
                        <Check
                          className={
                            metodo.destacado
                              ? "mt-0.5 h-4 w-4 flex-shrink-0 text-naranja-600"
                              : "mt-0.5 h-4 w-4 flex-shrink-0 text-gris-400"
                          }
                        />
                        <span>{detalle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INFORMACION DE LA GUIA */}
      <section className="bg-gris-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-gris-900 md:text-4xl">¿Qué es la Guía de Corte ProFix 126?</h2>
            <p className="mt-4 text-lg text-gris-700">
              Una guía de corte recto de aluminio de 1.26 m pensada para sierra circular y herramientas con base
              compatible. Reemplaza la regla improvisada y el pulso por una referencia estable y repetible.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {caracteristicas.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titulo} className="rounded-2xl border border-gris-200 bg-white p-6 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-naranja-100 text-naranja-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-gris-900">{item.titulo}</h3>
                  <p className="mt-2 text-sm text-gris-700">{item.texto}</p>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-gris-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-gris-700">
              Marcas con las que suele usarse
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {marcas.map((marca) => (
                <span
                  key={marca}
                  className="rounded-full border border-gris-200 bg-gris-50 px-4 py-2 text-sm font-bold text-gris-700"
                >
                  {marca}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-gris-600">
              Antes de comprar puedes validar tu marca y modelo por WhatsApp enviando una foto de la base.
            </p>
          </div>
        </div>
      </section>

      {/* ENVIO Y RETIRO */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gris-200 bg-gris-50 p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-herramienta-100 text-herramienta-600">
                <Truck className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-gris-900">Envío a todo Chile</h3>
              <p className="mt-2 text-sm text-gris-700">
                Despachamos a todo Chile mediante {preciosProducto.envioNacional}, con stock inmediato.
              </p>
            </div>
            <div className="rounded-2xl border border-gris-200 bg-gris-50 p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-naranja-100 text-naranja-700">
                <Store className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-gris-900">Retiro presencial</h3>
              <p className="mt-2 text-sm text-gris-700">
                Retiras en{" "}
                <a
                  href={preciosProducto.mapaRetiroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-naranja-700 underline decoration-dotted underline-offset-2 hover:text-naranja-800"
                >
                  {preciosProducto.direccionRetiro}
                </a>
                . Pagando en el retiro mantienes el precio de {formatCLP(preciosProducto.precioEfectivo)}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-gradient-to-br from-naranja-600 to-taller-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold md:text-4xl">
            Aprovecha el precio en efectivo o transferencia
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-naranja-50">
            Paga {formatCLP(preciosProducto.precioEfectivo)} por unidad y ahorra {formatCLP(ahorro)} frente al valor con
            tarjeta y factura. Envío a todo Chile y retiro en {preciosProducto.direccionRetiro}.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/producto/profix-126"
              className="w-full sm:w-auto"
              onClick={() => trackInitiateCheckout("precio-cta", preciosProducto.precioEfectivo)}
            >
              <Button className="h-auto w-full whitespace-normal rounded-xl bg-white px-8 py-4 text-base font-extrabold text-naranja-700 hover:bg-naranja-50 sm:w-auto">
                Comprar ProFix 126 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              onClick={() => trackContact("precio-cta")}
            >
              <Button
                variant="outline"
                className="h-auto w-full whitespace-normal rounded-xl border-2 border-white/60 bg-transparent px-8 py-4 text-base font-extrabold text-white hover:bg-white/10 sm:w-auto"
              >
                <MessageSquare className="mr-2 h-5 w-5" /> Escribir por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* BARRA CTA FIJA (solo movil, para trafico de TikTok / Instagram) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gris-200 bg-white/95 px-3 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] backdrop-blur md:hidden">
        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-herramienta-600 px-3 py-3 text-sm font-bold text-herramienta-700"
            onClick={() => trackContact("precio-bar")}
          >
            <MessageSquare className="h-5 w-5" /> WhatsApp
          </a>
          <Link
            to="/producto/profix-126"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-naranja-600 px-3 py-3 text-sm font-extrabold text-white"
            onClick={() => trackInitiateCheckout("precio-bar", preciosProducto.precioEfectivo)}
          >
            Comprar a {formatCLP(preciosProducto.precioEfectivo)} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
      {/* Espacio para que la barra fija no tape el contenido */}
      <div className="h-20 md:hidden" />
    </>
  );
};

export default Precio;
