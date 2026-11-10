/**
 * Seguimiento de campanas para Meta (Instagram / Facebook) y TikTok.
 *
 * Los IDs se configuran por variables de entorno de Vite:
 *   VITE_META_PIXEL_ID   -> Pixel de Meta / Instagram
 *   VITE_TIKTOK_PIXEL_ID -> Pixel de TikTok
 *
 * Si una red no tiene ID configurado, simplemente no se inicializa y las
 * llamadas a trackEvent se ignoran sin romper la app. Asi el codigo queda
 * listo y solo hay que pegar los IDs cuando existan.
 */

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim();
const TIKTOK_PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID?.trim();

let initialized = false;

const injectMetaPixel = (w: any, pixelId: string) => {
  if (w.fbq) return;

  const fbq: any = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
    } else {
      fbq.queue.push(args);
    }
  };
  w.fbq = fbq;
  w._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(script, first);

  w.fbq("init", pixelId);
  w.fbq("track", "PageView");
};

const injectTikTokPixel = (w: any, pixelId: string) => {
  if (w.ttq) return;

  const methods = [
    "page",
    "track",
    "identify",
    "instances",
    "debug",
    "on",
    "off",
    "once",
    "ready",
    "alias",
    "group",
    "enableCookie",
    "disableCookie",
  ];

  const ttq: any = [];
  ttq.methods = methods;
  ttq.setAndDefer = (obj: any, method: string) => {
    obj[method] = (...args: unknown[]) => {
      obj.push([method, ...args]);
    };
  };
  for (const method of methods) ttq.setAndDefer(ttq, method);

  ttq.instance = (instanceId: string) => {
    const instance = ttq._i?.[instanceId] || [];
    for (const method of methods) ttq.setAndDefer(instance, method);
    return instance;
  };

  ttq.load = (id: string, options?: Record<string, unknown>) => {
    const url = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[id] = [];
    ttq._i[id]._u = url;
    ttq._t = ttq._t || {};
    ttq._t[id] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[id] = options || {};

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `${url}?sdkid=${id}&lib=ttq`;
    const first = document.getElementsByTagName("script")[0];
    first?.parentNode?.insertBefore(script, first);
  };

  w.TiktokAnalyticsObject = "ttq";
  w.ttq = ttq;
  ttq.load(pixelId);
  ttq.page();
};

/** Inicializa los pixeles configurados. Seguro de llamar varias veces. */
export function initTracking() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const w = window as any;
  if (META_PIXEL_ID) injectMetaPixel(w, META_PIXEL_ID);
  if (TIKTOK_PIXEL_ID) injectTikTokPixel(w, TIKTOK_PIXEL_ID);
}

/** Envia un evento a los pixeles activos. No hace nada si no hay pixeles. */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (typeof w.fbq === "function") w.fbq("track", eventName, params);
  if (w.ttq && typeof w.ttq.track === "function") w.ttq.track(eventName, params);
}

/** Clic en un contacto (WhatsApp). Evento estandar "Contact". */
export function trackContact(origen: string) {
  trackEvent("Contact", { content_name: "Guia de Corte ProFix 126", origen });
}

/** Intencion de compra / avance al producto. Evento estandar "InitiateCheckout". */
export function trackInitiateCheckout(origen: string, valor: number) {
  trackEvent("InitiateCheckout", {
    content_name: "Guia de Corte ProFix 126",
    content_type: "product",
    value: valor,
    currency: "CLP",
    origen,
  });
}
