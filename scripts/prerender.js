import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, "..", "dist");
const serverDistDir = path.join(__dirname, "..", "dist-server");
const serverEntryPath = path.join(serverDistDir, "entry-server.js");
const templatePath = path.join(distDir, "index.html");
const debugEnvPath = path.join(__dirname, "..", ".dbg", "vercel-prerender-fail.env");
const BASE_URL = "https://www.guiadecorte.cl";
const DEFAULT_SOCIAL_IMAGE = `${BASE_URL}/social/profix-126-share.jpg`;
const DEFAULT_APP_ICON = `${BASE_URL}/icons/apple-touch-icon.png`;
const pendingDebugRequests = [];

const queueDebugLog = (payload) => {
  let debugUrl = "http://127.0.0.1:7777/event";
  let sessionId = "vercel-prerender-fail";

  try {
    const envFile = fs.readFileSync(debugEnvPath, "utf8");
    debugUrl = envFile.match(/DEBUG_SERVER_URL=(.+)/)?.[1] || debugUrl;
    sessionId = envFile.match(/DEBUG_SESSION_ID=(.+)/)?.[1] || sessionId;
  } catch {}

  const request = fetch(debugUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      sessionId,
      ts: payload.ts || Date.now(),
    }),
  }).catch(() => {});

  pendingDebugRequests.push(request);
  return request;
};

const flushDebugLogs = async () => {
  if (pendingDebugRequests.length === 0) {
    return;
  }

  const queuedRequests = pendingDebugRequests.splice(0, pendingDebugRequests.length);
  await Promise.allSettled(queuedRequests);
};

const toDebuggableError = (phase, error, extra = {}) => {
  const detailText = Object.entries(extra)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}=${typeof value === "string" ? value : JSON.stringify(value)}`)
    .join(", ");
  const baseMessage = error?.message || String(error);
  const suffix = detailText ? ` | ${detailText}` : "";

  return new Error(`[prerender:${phase}] ${baseMessage}${suffix}`, {
    cause: error,
  });
};

const routeMetaFallbacks = {
  "/": {
    title:
      "Guia de Corte Recto ProFix 126 para Sierra Circular | Guia de Aluminio para Cortes con Herramientas Electricas",
    description:
      "Guia de corte recto ProFix 126 para sierra circular y herramientas con base compatible. Ideal para melamina, MDF, terciado y trabajos de carpinteria con precision, portabilidad y ajuste rapido.",
    canonical: `${BASE_URL}/`,
    keywords:
      "guia de corte recto, guia para sierra circular, profix 126, guia de aluminio para carpinteria, guia para melamina, guia para MDF, guia para router",
    type: "website",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/producto/profix-126": {
    title: "Guia de Corte Recto ProFix 126 para Sierra Circular y Router | GuiaDeCorte.cl",
    description:
      "ProFix 126 es una guia de corte recto de 1.26 metros para sierra circular, router y herramientas con base compatible. Ideal para melamina, MDF, terciado y carpinteria de precision.",
    canonical: `${BASE_URL}/producto/profix-126`,
    keywords:
      "guia de corte recto, profix 126, guia para sierra circular, guia para router, guia para melamina, guia de aluminio",
    type: "product",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/contacto": {
    title: "Contacto y Compatibilidad ProFix 126 | GuiaDeCorte.cl",
    description:
      "Consulta compatibilidad, stock, despacho y uso real de la guia de corte ProFix 126 para tu taller, obra o proyecto de carpinteria.",
    canonical: `${BASE_URL}/contacto`,
    keywords:
      "contacto profix 126, compatibilidad sierra circular, consultas guia de corte, despacho guia profix",
    type: "website",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/guias": {
    title: "Guias de Corte, Compatibilidad y Usos Reales | GuiaDeCorte.cl",
    description:
      "Centro de guias sobre compatibilidad de herramientas, cortes rectos, uso en melamina, MDF, terciado y criterios reales para sacar mayor provecho a la ProFix 126.",
    canonical: `${BASE_URL}/guias`,
    keywords:
      "guias de corte, compatibilidad sierra circular, guia para router, cortar melamina recto, cortar MDF recto, profix 126 usos",
    type: "website",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/guias/compatibilidad-herramientas": {
    title: "Compatibilidad de la guia de corte ProFix 126 con herramientas y bases | GuiaDeCorte.cl",
    description:
      "Aprende que revisar antes de usar la ProFix 126 con sierra circular, router, fresadora u otras herramientas con base compatible.",
    canonical: `${BASE_URL}/guias/compatibilidad-herramientas`,
    keywords:
      "compatibilidad guia de corte, guia de corte para sierra circular, guia de corte para router, profix 126 compatibilidad",
    type: "article",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/guias/compatibilidad-por-modelo-de-herramienta": {
    title: "Compatibilidad ProFix 126 por marca, tipo y modelo de herramienta | GuiaDeCorte.cl",
    description:
      "Revisa como evaluar compatibilidad de la ProFix 126 por marca, tipo de herramienta y modelo. Incluye orientacion para consultas sobre Makita, Bosch, DeWalt, Stanley, Skil, Einhell, Ingco, Ubermann y Milwaukee.",
    canonical: `${BASE_URL}/guias/compatibilidad-por-modelo-de-herramienta`,
    keywords:
      "compatibilidad profix 126 por modelo, profix 126 makita, profix 126 bosch, profix 126 dewalt, compatibilidad sierra circular con guia de corte",
    type: "article",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/guias/compatibilidad-por-marcas-frecuentes": {
    title: "Compatibilidad ProFix 126 con marcas frecuentes: Makita, Bosch, DeWalt, Stanley, Skil, Einhell, Ingco, Ubermann y Milwaukee | GuiaDeCorte.cl",
    description:
      "Guia comercial para responder consultas sobre compatibilidad ProFix 126 con marcas frecuentes como Makita, Bosch, DeWalt, Stanley, Skil, Einhell, Ingco, Ubermann y Milwaukee.",
    canonical: `${BASE_URL}/guias/compatibilidad-por-marcas-frecuentes`,
    keywords:
      "profix 126 makita, profix 126 bosch, profix 126 dewalt, profix 126 stanley, profix 126 skil, profix 126 einhell, compatibilidad guia de corte por marcas",
    type: "article",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/guias/cortes-en-melamina-mdf-terciado": {
    title: "Como mejorar cortes en melamina, MDF y terciado con una guia recta | GuiaDeCorte.cl",
    description:
      "Conoce como una guia de corte recto ayuda a trabajar melamina, MDF y terciado con mejor referencia, menos desperdicio y mejor terminacion.",
    canonical: `${BASE_URL}/guias/cortes-en-melamina-mdf-terciado`,
    keywords:
      "cortar melamina con sierra circular, cortar mdf recto, cortar terciado sin desviarse, guia de corte para tableros",
    type: "article",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/guias/como-hacer-cortes-rectos-con-sierra-circular": {
    title: "Como hacer cortes rectos con sierra circular y una guia de corte | GuiaDeCorte.cl",
    description:
      "Aprende por que una guia de corte recto mejora el trabajo con sierra circular en tableros, muebles y proyectos donde la precision es clave.",
    canonical: `${BASE_URL}/guias/como-hacer-cortes-rectos-con-sierra-circular`,
    keywords:
      "como hacer cortes rectos con sierra circular, guia de corte para sierra circular, como cortar derecho con sierra circular",
    type: "article",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/guias/guia-de-corte-para-router": {
    title: "Guia de corte para router: cuando tiene sentido y que revisar antes de usarla | GuiaDeCorte.cl",
    description:
      "Descubre en que escenarios una guia recta puede ayudar al router o fresadora, que revisar en la base y cuando conviene validar compatibilidad.",
    canonical: `${BASE_URL}/guias/guia-de-corte-para-router`,
    keywords:
      "guia de corte para router, guia para fresadora, router con guia recta, compatibilidad router con guia de corte",
    type: "article",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/guias/profix-126-vs-regla-casera": {
    title: "ProFix 126 vs regla casera: cuando una guia dedicada realmente marca diferencia | GuiaDeCorte.cl",
    description:
      "Compara la ProFix 126 con una regla casera o referencia improvisada para entender cuando una guia dedicada aporta mas precision, repetibilidad y velocidad.",
    canonical: `${BASE_URL}/guias/profix-126-vs-regla-casera`,
    keywords:
      "profix 126 vs regla casera, guia de corte vs regla, vale la pena una guia de corte, sierra circular con regla casera",
    type: "article",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/guias/sierra-circular-con-guia-vs-sierra-de-mesa": {
    title: "Sierra circular con guia vs sierra de mesa: cual conviene segun espacio, portabilidad y tipo de trabajo | GuiaDeCorte.cl",
    description:
      "Compara una sierra circular con guia recta frente a una sierra de mesa para decidir segun taller, tableros grandes, portabilidad y ritmo de trabajo.",
    canonical: `${BASE_URL}/guias/sierra-circular-con-guia-vs-sierra-de-mesa`,
    keywords:
      "sierra circular con guia vs sierra de mesa, que conviene para cortar tableros, guia de corte o sierra de mesa, cortes rectos portables",
    type: "article",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/galeria": {
    title: "Galeria de Uso de la Guia ProFix 126 | GuiaDeCorte.cl",
    description:
      "Revisa imagenes y aplicaciones reales de la guia de corte ProFix 126 en sierra circular, ajuste rapido y trabajo sobre tableros.",
    canonical: `${BASE_URL}/galeria`,
    keywords:
      "galeria profix 126, fotos guia de corte, videos sierra circular, aplicaciones carpinteria, demostracion profix",
    type: "website",
    image: DEFAULT_SOCIAL_IMAGE,
  },
};

const manualPrerenderPages = {
  "/guias": `
    <div class="container mx-auto px-4 py-12">
      <header class="text-center max-w-4xl mx-auto mb-12">
        <p class="text-sm font-semibold uppercase tracking-wide text-naranja-600 mb-3">Centro de contenido</p>
        <h1 class="text-3xl md:text-4xl font-bold mb-4">Guias, comparativas y compatibilidad por herramienta</h1>
        <p class="text-gris-600 text-lg">
          Esta seccion responde preguntas reales sobre compatibilidad con herramientas, marcas o modelos,
          comparativas, cortes rectos, uso en melamina, MDF, terciado y escenarios donde la ProFix 126 agrega valor.
        </p>
      </header>
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        <article class="bg-white border border-gris-200 rounded-xl p-6 shadow-sm">
          <p class="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">compatibilidad guia de corte con herramientas</p>
          <h2 class="text-2xl font-bold mb-3">Compatibilidad de herramientas</h2>
          <p class="text-gris-600 mb-4">Aprende que revisar antes de usar la ProFix 126 con sierra circular, router, fresadora u otras herramientas con base compatible.</p>
          <a href="/guias/compatibilidad-herramientas" class="text-naranja-600 font-medium hover:text-naranja-700">Abrir guia</a>
        </article>
        <article class="bg-white border border-gris-200 rounded-xl p-6 shadow-sm">
          <p class="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">cortes rectos en melamina MDF y terciado</p>
          <h2 class="text-2xl font-bold mb-3">Melamina, MDF y terciado</h2>
          <p class="text-gris-600 mb-4">Conoce como una guia recta ayuda a trabajar tableros con mejor referencia, menos desperdicio y mejor terminacion.</p>
          <a href="/guias/cortes-en-melamina-mdf-terciado" class="text-naranja-600 font-medium hover:text-naranja-700">Abrir guia</a>
        </article>
        <article class="bg-white border border-gris-200 rounded-xl p-6 shadow-sm">
          <p class="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">como hacer cortes rectos con sierra circular</p>
          <h2 class="text-2xl font-bold mb-3">Cortes rectos con sierra circular</h2>
          <p class="text-gris-600 mb-4">Descubre por que una guia recta mejora la repetibilidad, el control y la terminacion en tableros y piezas largas.</p>
          <a href="/guias/como-hacer-cortes-rectos-con-sierra-circular" class="text-naranja-600 font-medium hover:text-naranja-700">Abrir guia</a>
        </article>
        <article class="bg-white border border-gris-200 rounded-xl p-6 shadow-sm">
          <p class="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">guia de corte para router</p>
          <h2 class="text-2xl font-bold mb-3">Guia de corte para router</h2>
          <p class="text-gris-600 mb-4">Revisa cuando tiene sentido usar una guia recta con router o fresadora y que revisar antes de validar compatibilidad.</p>
          <a href="/guias/guia-de-corte-para-router" class="text-naranja-600 font-medium hover:text-naranja-700">Abrir guia</a>
        </article>
        <article class="bg-white border border-gris-200 rounded-xl p-6 shadow-sm">
          <p class="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">compatibilidad ProFix 126 por modelo de herramienta</p>
          <h2 class="text-2xl font-bold mb-3">Compatibilidad por marca o modelo</h2>
          <p class="text-gris-600 mb-4">Orienta consultas sobre Makita, Bosch, DeWalt, Stanley, Skil, Einhell, Ingco, Ubermann y Milwaukee sin prometer compatibilidad ciega.</p>
          <a href="/guias/compatibilidad-por-modelo-de-herramienta" class="text-naranja-600 font-medium hover:text-naranja-700">Abrir guia</a>
        </article>
        <article class="bg-white border border-gris-200 rounded-xl p-6 shadow-sm">
          <p class="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">compatibilidad ProFix 126 con marcas frecuentes</p>
          <h2 class="text-2xl font-bold mb-3">Compatibilidad por marcas frecuentes</h2>
          <p class="text-gris-600 mb-4">Responde consultas comerciales sobre Makita, Bosch, DeWalt, Stanley, Skil, Einhell, Ingco, Ubermann y Milwaukee con criterio responsable.</p>
          <a href="/guias/compatibilidad-por-marcas-frecuentes" class="text-naranja-600 font-medium hover:text-naranja-700">Abrir guia</a>
        </article>
        <article class="bg-white border border-gris-200 rounded-xl p-6 shadow-sm">
          <p class="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">ProFix 126 vs regla casera</p>
          <h2 class="text-2xl font-bold mb-3">Comparativa vs regla casera</h2>
          <p class="text-gris-600 mb-4">Aclara cuando una guia dedicada realmente gana en repetibilidad, velocidad y orden de trabajo.</p>
          <a href="/guias/profix-126-vs-regla-casera" class="text-naranja-600 font-medium hover:text-naranja-700">Abrir guia</a>
        </article>
        <article class="bg-white border border-gris-200 rounded-xl p-6 shadow-sm">
          <p class="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">sierra circular con guia vs sierra de mesa</p>
          <h2 class="text-2xl font-bold mb-3">Comparativa vs sierra de mesa</h2>
          <p class="text-gris-600 mb-4">Ayuda a decidir segun espacio, portabilidad, tableros grandes y ritmo real de trabajo.</p>
          <a href="/guias/sierra-circular-con-guia-vs-sierra-de-mesa" class="text-naranja-600 font-medium hover:text-naranja-700">Abrir guia</a>
        </article>
      </section>
      <section class="bg-madera-50 border border-madera-200 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-3">Como usar estas guias para decidir mejor</h2>
        <p class="text-gris-700 mb-4">
          Si todavia estas comparando, parte por compatibilidad. Si ya tienes herramienta, revisa primero la guia de
          cortes rectos y la de materiales. Si comparas alternativas, mira las comparativas. Si el caso depende del modelo, cierra el recorrido con contacto.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="/producto/profix-126" class="inline-flex items-center justify-center bg-herramienta-600 hover:bg-herramienta-700 text-white px-5 py-3 rounded-md font-medium">Ver ProFix 126</a>
          <a href="/galeria" class="inline-flex items-center justify-center border border-gris-300 px-5 py-3 rounded-md font-medium">Ver galeria</a>
          <a href="/contacto" class="inline-flex items-center justify-center border border-gris-300 px-5 py-3 rounded-md font-medium">Resolver compatibilidad</a>
        </div>
      </section>
    </div>
  `,
  "/guias/compatibilidad-herramientas": `
    <article class="container mx-auto px-4 py-12">
      <nav class="text-sm text-gris-500 mb-6"><a href="/">Inicio</a> / <a href="/guias">Guias</a> / <span>Compatibilidad de herramientas</span></nav>
      <header class="max-w-4xl mb-10">
        <p class="text-sm font-semibold uppercase tracking-wide text-naranja-600 mb-3">compatibilidad guia de corte con herramientas</p>
        <h1 class="text-3xl md:text-5xl font-bold mb-4">Compatibilidad de la guia de corte ProFix 126 con herramientas y bases</h1>
        <p class="text-xl text-gris-600 mb-5">Aprende que revisar antes de usar la ProFix 126 con sierra circular, router, fresadora u otras herramientas con base compatible.</p>
      </header>
      <section class="bg-gris-50 border border-gris-200 rounded-xl p-6 mb-10">
        <h2 class="text-2xl font-bold mb-3">Problema que resuelve</h2>
        <p class="text-gris-700">El error mas comun es asumir que una guia sirve con cualquier herramienta. El criterio correcto es revisar base, apoyo, recorrido y tipo de trabajo.</p>
      </section>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Que revisar primero</h2>
        <p class="text-gris-700 text-lg leading-relaxed mb-4">La compatibilidad depende de la geometria de la base, del area de apoyo y de la forma en que la herramienta se desplaza contra la guia.</p>
        <ul class="list-disc pl-6 text-gris-700 space-y-2">
          <li>Superficie de apoyo suficiente y estable.</li>
          <li>Recorrido recto sin interferencias.</li>
          <li>Peso y profundidad acordes al trabajo real.</li>
          <li>Facilidad para repetir la misma referencia.</li>
        </ul>
      </section>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Uso principal y usos complementarios</h2>
        <p class="text-gris-700 text-lg leading-relaxed mb-4">La recomendacion principal sigue siendo sierra circular. Router y fresadora pueden funcionar muy bien cuando la base acompana y el apoyo es suficiente.</p>
      </section>
      <section class="bg-madera-50 border border-madera-200 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-3">Siguiente paso recomendado</h2>
        <p class="text-gris-700 mb-4">Si tu caso depende del modelo, conviene cerrar compatibilidad por contacto antes de comprar.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="/producto/profix-126" class="inline-flex items-center justify-center bg-herramienta-600 hover:bg-herramienta-700 text-white px-5 py-3 rounded-md font-medium">Ver ProFix 126</a>
          <a href="/contacto" class="inline-flex items-center justify-center border border-gris-300 px-5 py-3 rounded-md font-medium">Resolver compatibilidad</a>
        </div>
      </section>
    </article>
  `,
  "/guias/cortes-en-melamina-mdf-terciado": `
    <article class="container mx-auto px-4 py-12">
      <nav class="text-sm text-gris-500 mb-6"><a href="/">Inicio</a> / <a href="/guias">Guias</a> / <span>Melamina, MDF y terciado</span></nav>
      <header class="max-w-4xl mb-10">
        <p class="text-sm font-semibold uppercase tracking-wide text-naranja-600 mb-3">cortes rectos en melamina MDF y terciado</p>
        <h1 class="text-3xl md:text-5xl font-bold mb-4">Como mejorar cortes en melamina, MDF y terciado con una guia recta</h1>
        <p class="text-xl text-gris-600 mb-5">Conoce como una guia recta ayuda a trabajar tableros con mejor referencia, menos desperdicio y mejor terminacion.</p>
      </header>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Por que una guia recta ayuda tanto en tableros</h2>
        <p class="text-gris-700 text-lg leading-relaxed mb-4">En melamina, MDF y terciado una desviacion pequena puede arruinar una pieza, afectar el encastre o aumentar desperdicio. La guia mejora apoyo, repetibilidad y control.</p>
      </section>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Cada material cambia el trabajo</h2>
        <p class="text-gris-700 text-lg leading-relaxed mb-4">La melamina exige buena terminacion, el MDF exige medidas consistentes y el terciado se beneficia de una referencia estable cuando la pieza es larga o repetitiva.</p>
      </section>
      <section class="bg-madera-50 border border-madera-200 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-3">Apoyo comercial y tecnico</h2>
        <p class="text-gris-700 mb-4">Esta es una de las mejores rutas para hablarle a mueblistas, instaladores y talleres pequenos que trabajan tableros todos los dias.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="/producto/profix-126" class="inline-flex items-center justify-center bg-herramienta-600 hover:bg-herramienta-700 text-white px-5 py-3 rounded-md font-medium">Ver ProFix 126</a>
          <a href="/galeria" class="inline-flex items-center justify-center border border-gris-300 px-5 py-3 rounded-md font-medium">Ver galeria</a>
        </div>
      </section>
    </article>
  `,
  "/guias/como-hacer-cortes-rectos-con-sierra-circular": `
    <article class="container mx-auto px-4 py-12">
      <nav class="text-sm text-gris-500 mb-6"><a href="/">Inicio</a> / <a href="/guias">Guias</a> / <span>Cortes rectos con sierra circular</span></nav>
      <header class="max-w-4xl mb-10">
        <p class="text-sm font-semibold uppercase tracking-wide text-naranja-600 mb-3">como hacer cortes rectos con sierra circular</p>
        <h1 class="text-3xl md:text-5xl font-bold mb-4">Como hacer cortes rectos con sierra circular y una guia de corte</h1>
        <p class="text-xl text-gris-600 mb-5">Aprende por que una guia de corte recto mejora el trabajo con sierra circular en tableros, muebles y proyectos donde la precision es clave.</p>
      </header>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Que cambia cuando agregas una guia recta</h2>
        <p class="text-gris-700 text-lg leading-relaxed mb-4">La guia convierte un corte improvisado en un proceso mas repetible y menos dependiente del pulso. Eso reduce desviacion y mejora el resultado en piezas largas.</p>
      </section>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Errores comunes que ayuda a reducir</h2>
        <ul class="list-disc pl-6 text-gris-700 space-y-2">
          <li>Desviacion al final del recorrido.</li>
          <li>Repeticiones con medidas distintas.</li>
          <li>Perdida de tiempo por referencias mal armadas.</li>
          <li>Desperdicio por correcciones posteriores.</li>
        </ul>
      </section>
      <section class="bg-madera-50 border border-madera-200 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-3">Cuando esta pagina convierte mejor</h2>
        <p class="text-gris-700 mb-4">Esta ruta funciona muy bien para usuarios que ya tienen sierra circular y solo necesitan entender por que una guia recta si cambia el resultado.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="/producto/profix-126" class="inline-flex items-center justify-center bg-herramienta-600 hover:bg-herramienta-700 text-white px-5 py-3 rounded-md font-medium">Ver ProFix 126</a>
          <a href="/contacto" class="inline-flex items-center justify-center border border-gris-300 px-5 py-3 rounded-md font-medium">Resolver compatibilidad</a>
        </div>
      </section>
    </article>
  `,
  "/guias/guia-de-corte-para-router": `
    <article class="container mx-auto px-4 py-12">
      <nav class="text-sm text-gris-500 mb-6"><a href="/">Inicio</a> / <a href="/guias">Guias</a> / <span>Guia para router</span></nav>
      <header class="max-w-4xl mb-10">
        <p class="text-sm font-semibold uppercase tracking-wide text-naranja-600 mb-3">guia de corte para router</p>
        <h1 class="text-3xl md:text-5xl font-bold mb-4">Guia de corte para router: cuando tiene sentido y que revisar antes de usarla</h1>
        <p class="text-xl text-gris-600 mb-5">Descubre en que escenarios una guia recta puede ayudar al router o fresadora y que revisar antes de validar compatibilidad.</p>
      </header>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Cuando una guia recta si aporta al router</h2>
        <p class="text-gris-700 text-lg leading-relaxed mb-4">Es util cuando necesitas recorridos rectos, apoyo mas estable y una referencia consistente en tableros o piezas largas.</p>
      </section>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Que revisar en la base</h2>
        <ul class="list-disc pl-6 text-gris-700 space-y-2">
          <li>Tamano y forma de la base.</li>
          <li>Apoyo suficiente sobre la superficie.</li>
          <li>Seguridad y control del avance.</li>
          <li>Tipo de operacion que quieres realizar.</li>
        </ul>
      </section>
      <section class="bg-madera-50 border border-madera-200 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-3">Recomendacion comercial correcta</h2>
        <p class="text-gris-700 mb-4">Conviene comunicar sierra circular como uso principal y router como uso complementario validable. Eso genera confianza y reduce objeciones posteriores.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="/producto/profix-126" class="inline-flex items-center justify-center bg-herramienta-600 hover:bg-herramienta-700 text-white px-5 py-3 rounded-md font-medium">Ver ProFix 126</a>
          <a href="/contacto" class="inline-flex items-center justify-center border border-gris-300 px-5 py-3 rounded-md font-medium">Resolver compatibilidad</a>
        </div>
      </section>
    </article>
  `,
  "/guias/compatibilidad-por-modelo-de-herramienta": `
    <article class="container mx-auto px-4 py-12">
      <nav class="text-sm text-gris-500 mb-6"><a href="/">Inicio</a> / <a href="/guias">Guias</a> / <span>Compatibilidad por marca o modelo</span></nav>
      <header class="max-w-4xl mb-10">
        <p class="text-sm font-semibold uppercase tracking-wide text-naranja-600 mb-3">compatibilidad ProFix 126 por modelo de herramienta</p>
        <h1 class="text-3xl md:text-5xl font-bold mb-4">Compatibilidad ProFix 126 por marca, tipo y modelo de herramienta</h1>
        <p class="text-xl text-gris-600 mb-5">Revisa como evaluar compatibilidad por marca, tipo de herramienta y modelo sin prometer compatibilidad ciega.</p>
      </header>
      <section class="bg-gris-50 border border-gris-200 rounded-xl p-6 mb-10">
        <h2 class="text-2xl font-bold mb-3">Que datos conviene pedir</h2>
        <ul class="list-disc pl-6 text-gris-700 space-y-2">
          <li>Marca y modelo exacto.</li>
          <li>Foto de la base o del apoyo.</li>
          <li>Material a trabajar.</li>
          <li>Tipo de tarea: corte recto, guiado o rebaje.</li>
          <li>Si el trabajo es en taller, en obra o ambos.</li>
        </ul>
      </section>
      <section class="max-w-5xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Marcas que suelen consultar</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article class="bg-white border border-gris-200 rounded-xl p-5"><h3 class="text-lg font-bold mb-2">Makita</h3><p class="text-gris-700">Frecuente en sierras circulares y routers. Conviene revisar base, apoyo y tipo de trabajo.</p></article>
          <article class="bg-white border border-gris-200 rounded-xl p-5"><h3 class="text-lg font-bold mb-2">Bosch</h3><p class="text-gris-700">Suele resolverse revisando estabilidad de base y recorrido sobre tablero.</p></article>
          <article class="bg-white border border-gris-200 rounded-xl p-5"><h3 class="text-lg font-bold mb-2">DeWalt y Stanley</h3><p class="text-gris-700">La validacion depende del modelo y del uso real, especialmente en trabajos repetitivos.</p></article>
          <article class="bg-white border border-gris-200 rounded-xl p-5"><h3 class="text-lg font-bold mb-2">Skil, Einhell, Ingco, Ubermann y Milwaukee</h3><p class="text-gris-700">Aqui es aun mas importante revisar la base y el nivel de exigencia del trabajo antes de recomendar.</p></article>
        </div>
      </section>
      <section class="bg-madera-50 border border-madera-200 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-3">Cierre recomendado</h2>
        <p class="text-gris-700 mb-4">Si la consulta depende del modelo, lo mejor es enviar esos datos por contacto o WhatsApp para una respuesta mas util.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="/contacto" class="inline-flex items-center justify-center bg-herramienta-600 hover:bg-herramienta-700 text-white px-5 py-3 rounded-md font-medium">Resolver compatibilidad</a>
          <a href="/guias/compatibilidad-herramientas" class="inline-flex items-center justify-center border border-gris-300 px-5 py-3 rounded-md font-medium">Ver compatibilidad general</a>
        </div>
      </section>
    </article>
  `,
  "/guias/compatibilidad-por-marcas-frecuentes": `
    <article class="container mx-auto px-4 py-12">
      <nav class="text-sm text-gris-500 mb-6"><a href="/">Inicio</a> / <a href="/guias">Guias</a> / <span>Compatibilidad por marcas frecuentes</span></nav>
      <header class="max-w-4xl mb-10">
        <p class="text-sm font-semibold uppercase tracking-wide text-naranja-600 mb-3">compatibilidad ProFix 126 con marcas frecuentes</p>
        <h1 class="text-3xl md:text-5xl font-bold mb-4">Compatibilidad ProFix 126 con marcas frecuentes: Makita, Bosch, DeWalt, Stanley, Skil, Einhell, Ingco, Ubermann y Milwaukee</h1>
        <p class="text-xl text-gris-600 mb-5">Guia comercial para responder consultas por marca sin prometer compatibilidad ciega y con un cierre claro hacia la validacion final.</p>
      </header>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Por que conviene responder por marca</h2>
        <p class="text-gris-700 text-lg leading-relaxed mb-4">Cuando alguien busca su marca exacta en Google suele estar mas cerca de comprar. Esta pagina captura esa intencion y la convierte en una consulta mejor orientada.</p>
      </section>
      <section class="max-w-5xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Marcas que mas vale la pena cubrir</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article class="bg-white border border-gris-200 rounded-xl p-5"><h3 class="text-lg font-bold mb-2">Makita y Bosch</h3><p class="text-gris-700">Muy buscadas por usuarios que comparan antes de comprar y quieren claridad sobre sierra circular o router.</p></article>
          <article class="bg-white border border-gris-200 rounded-xl p-5"><h3 class="text-lg font-bold mb-2">DeWalt y Stanley</h3><p class="text-gris-700">Frecuentes en instalacion, trabajo portable y talleres que necesitan una respuesta rapida antes de decidir.</p></article>
          <article class="bg-white border border-gris-200 rounded-xl p-5"><h3 class="text-lg font-bold mb-2">Skil, Einhell, Ingco y Ubermann</h3><p class="text-gris-700">Claves para captar trafico de gama media o entrada, siempre validando modelo y base.</p></article>
          <article class="bg-white border border-gris-200 rounded-xl p-5"><h3 class="text-lg font-bold mb-2">Milwaukee</h3><p class="text-gris-700">Marca valiosa para perfiles portables y usuarios que comparan soluciones de trabajo mas profesionales.</p></article>
        </div>
      </section>
      <section class="bg-gris-50 border border-gris-200 rounded-xl p-6 mb-10">
        <h2 class="text-2xl font-bold mb-3">Que conviene enviar para validar rapido</h2>
        <ul class="list-disc pl-6 text-gris-700 space-y-2">
          <li>Marca y modelo exacto.</li>
          <li>Foto de la base o apoyo.</li>
          <li>Uso principal: sierra circular o router.</li>
          <li>Material a trabajar y contexto de uso.</li>
        </ul>
      </section>
      <section class="bg-madera-50 border border-madera-200 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-3">Cierre recomendado</h2>
        <p class="text-gris-700 mb-4">Si tu consulta ya es por marca o modelo, el mejor siguiente paso es enviar esos datos para una respuesta util y responsable.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="/contacto" class="inline-flex items-center justify-center bg-herramienta-600 hover:bg-herramienta-700 text-white px-5 py-3 rounded-md font-medium">Resolver compatibilidad</a>
          <a href="/guias/compatibilidad-por-modelo-de-herramienta" class="inline-flex items-center justify-center border border-gris-300 px-5 py-3 rounded-md font-medium">Ver compatibilidad por modelo</a>
        </div>
      </section>
    </article>
  `,
  "/guias/profix-126-vs-regla-casera": `
    <article class="container mx-auto px-4 py-12">
      <nav class="text-sm text-gris-500 mb-6"><a href="/">Inicio</a> / <a href="/guias">Guias</a> / <span>ProFix 126 vs regla casera</span></nav>
      <header class="max-w-4xl mb-10">
        <p class="text-sm font-semibold uppercase tracking-wide text-naranja-600 mb-3">ProFix 126 vs regla casera</p>
        <h1 class="text-3xl md:text-5xl font-bold mb-4">ProFix 126 vs regla casera: cuando una guia dedicada realmente marca diferencia</h1>
        <p class="text-xl text-gris-600 mb-5">Compara una guia dedicada con una referencia improvisada para entender cuando la inversion se nota en tiempo, repetibilidad y orden.</p>
      </header>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">La regla casera sirve, pero no siempre escala bien</h2>
        <p class="text-gris-700 text-lg leading-relaxed mb-4">En trabajos puntuales puede resolver, pero cuando hay piezas repetidas, tableros grandes o necesidad de flujo estable, una guia dedicada suele ganar mucho terreno.</p>
      </section>
      <section class="max-w-5xl mb-10 overflow-x-auto border border-gris-200 rounded-xl">
        <table class="w-full text-left">
          <thead class="bg-gris-50">
            <tr><th class="px-4 py-3 font-semibold">Factor</th><th class="px-4 py-3 font-semibold">ProFix 126</th><th class="px-4 py-3 font-semibold">Regla casera</th></tr>
          </thead>
          <tbody>
            <tr class="border-t border-gris-200"><td class="px-4 py-3 font-medium">Repetibilidad</td><td class="px-4 py-3">Alta y mas consistente.</td><td class="px-4 py-3">Variable segun montaje.</td></tr>
            <tr class="border-t border-gris-200"><td class="px-4 py-3 font-medium">Tiempo de preparacion</td><td class="px-4 py-3">Mas ordenado en flujo repetido.</td><td class="px-4 py-3">Puede exigir rearmar la referencia varias veces.</td></tr>
            <tr class="border-t border-gris-200"><td class="px-4 py-3 font-medium">Control en piezas largas</td><td class="px-4 py-3">Mejor apoyo y mas confianza.</td><td class="px-4 py-3">Mas expuesta a desviacion.</td></tr>
          </tbody>
        </table>
      </section>
      <section class="bg-madera-50 border border-madera-200 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-3">Cuando esta comparativa convierte mejor</h2>
        <p class="text-gris-700 mb-4">Funciona muy bien para usuarios que ya cortan con soluciones improvisadas y sienten que el proceso ya quedo corto.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="/producto/profix-126" class="inline-flex items-center justify-center bg-herramienta-600 hover:bg-herramienta-700 text-white px-5 py-3 rounded-md font-medium">Ver ProFix 126</a>
          <a href="/guias/como-hacer-cortes-rectos-con-sierra-circular" class="inline-flex items-center justify-center border border-gris-300 px-5 py-3 rounded-md font-medium">Ver tecnica de corte</a>
        </div>
      </section>
    </article>
  `,
  "/guias/sierra-circular-con-guia-vs-sierra-de-mesa": `
    <article class="container mx-auto px-4 py-12">
      <nav class="text-sm text-gris-500 mb-6"><a href="/">Inicio</a> / <a href="/guias">Guias</a> / <span>Guia vs sierra de mesa</span></nav>
      <header class="max-w-4xl mb-10">
        <p class="text-sm font-semibold uppercase tracking-wide text-naranja-600 mb-3">sierra circular con guia vs sierra de mesa</p>
        <h1 class="text-3xl md:text-5xl font-bold mb-4">Sierra circular con guia vs sierra de mesa: cual conviene segun espacio, portabilidad y tipo de trabajo</h1>
        <p class="text-xl text-gris-600 mb-5">Compara una solucion portable frente a una estacionaria para decidir mejor segun taller, tableros grandes y ritmo real de trabajo.</p>
      </header>
      <section class="max-w-4xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">No compiten en todo, pero si se cruzan en muchas decisiones de compra</h2>
        <p class="text-gris-700 text-lg leading-relaxed mb-4">La sierra de mesa tiene sentido en flujo fijo e intensivo. La sierra circular con guia gana cuando importa el espacio, la portabilidad y el trabajo sobre tableros grandes.</p>
      </section>
      <section class="max-w-5xl mb-10 overflow-x-auto border border-gris-200 rounded-xl">
        <table class="w-full text-left">
          <thead class="bg-gris-50">
            <tr><th class="px-4 py-3 font-semibold">Factor</th><th class="px-4 py-3 font-semibold">Sierra circular + ProFix 126</th><th class="px-4 py-3 font-semibold">Sierra de mesa</th></tr>
          </thead>
          <tbody>
            <tr class="border-t border-gris-200"><td class="px-4 py-3 font-medium">Espacio requerido</td><td class="px-4 py-3">Bajo a medio.</td><td class="px-4 py-3">Medio a alto.</td></tr>
            <tr class="border-t border-gris-200"><td class="px-4 py-3 font-medium">Trabajo en obra</td><td class="px-4 py-3">Muy favorable.</td><td class="px-4 py-3">Poco practico en muchos casos.</td></tr>
            <tr class="border-t border-gris-200"><td class="px-4 py-3 font-medium">Volumen alto fijo</td><td class="px-4 py-3">Buena opcion flexible, no siempre la mejor.</td><td class="px-4 py-3">Mas fuerte en produccion fija.</td></tr>
          </tbody>
        </table>
      </section>
      <section class="bg-madera-50 border border-madera-200 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-3">Perfil ideal</h2>
        <p class="text-gris-700 mb-4">La combinacion sierra circular mas guia tiene mucha logica para talleres pequenos, instaladores y usuarios que no quieren sobredimensionar su compra desde el inicio.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="/producto/profix-126" class="inline-flex items-center justify-center bg-herramienta-600 hover:bg-herramienta-700 text-white px-5 py-3 rounded-md font-medium">Ver ProFix 126</a>
          <a href="/guias/cortes-en-melamina-mdf-terciado" class="inline-flex items-center justify-center border border-gris-300 px-5 py-3 rounded-md font-medium">Ver materiales</a>
        </div>
      </section>
    </article>
  `,
};

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripQueryParams = (value = "") => String(value).split("?")[0];
const isSocialFriendlyImage = (value = "") => /\.(png|jpe?g)$/i.test(stripQueryParams(value));
const resolveSocialImage = (value = "") => (isSocialFriendlyImage(value) ? value : DEFAULT_SOCIAL_IMAGE);
const normalizeHelmetMarkup = (value = "") => String(value).replace(/\sdata-rh="true"/gi, "");

const stripManagedHead = (template) =>
  template
    .replace(/<!--app-head-->\s*/gi, "")
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta[^>]*data-rh="true"[^>]*>/gi, "")
    .replace(/<meta[^>]+(?:name|property)=["'](?:description|keywords|author|robots|viewport|theme-color|twitter:[^"']+|msapplication-TileColor|msapplication-TileImage)["'][^>]*>/gi, "")
    .replace(/<meta[^>]+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/<link[^>]*data-rh="true"[^>]*>/gi, "")
    .replace(/<link[^>]+rel=["'](?:canonical|manifest|apple-touch-icon|icon|shortcut icon)["'][^>]*>/gi, "")
    .replace(/<script[^>]*data-rh="true"[\s\S]*?<\/script>/gi, "");

const buildHead = (route, helmet) => {
  const meta = routeMetaFallbacks[route] || routeMetaFallbacks["/"];
  const socialImage = resolveSocialImage(meta.image);
  const usesDefaultSocialImage = socialImage === DEFAULT_SOCIAL_IMAGE;
  const schema = normalizeHelmetMarkup(helmet?.script?.toString() || "");

  return `
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    ${meta.keywords ? `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />` : ""}
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#FF6600" />
    <link rel="canonical" href="${escapeHtml(meta.canonical)}" />
    <meta property="og:type" content="${escapeHtml(meta.type || "website")}" />
    <meta property="og:url" content="${escapeHtml(meta.canonical)}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:image" content="${escapeHtml(socialImage)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(socialImage)}" />
    ${usesDefaultSocialImage ? '<meta property="og:image:type" content="image/jpeg" />' : ""}
    ${usesDefaultSocialImage ? '<meta property="og:image:width" content="1200" />' : ""}
    ${usesDefaultSocialImage ? '<meta property="og:image:height" content="630" />' : ""}
    <meta property="og:image:alt" content="${escapeHtml(meta.title)}" />
    <meta property="og:site_name" content="GuiaDeCorte.cl" />
    <meta property="og:locale" content="es_CL" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${escapeHtml(meta.canonical)}" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${escapeHtml(socialImage)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:creator" content="@guiadecorte" />
    <meta name="twitter:site" content="@guiadecorte" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="GuiaDeCorte" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
    <meta name="msapplication-TileImage" content="${escapeHtml(DEFAULT_APP_ICON)}" />
    <meta name="msapplication-TileColor" content="#FF6600" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    ${schema}
  `;
};

const applyHelmet = (template, helmet, route) => {
  const htmlAttributes = normalizeHelmetMarkup(helmet?.htmlAttributes?.toString() || "");
  const bodyAttributes = normalizeHelmetMarkup(helmet?.bodyAttributes?.toString() || "");
  const headContent = buildHead(route, helmet);

  let page = stripManagedHead(template).replace("</head>", `${headContent}\n  </head>`);

  if (htmlAttributes) {
    page = page.replace(/<html[^>]*>/, `<html ${htmlAttributes}>`);
  }

  if (bodyAttributes) {
    page = page.replace(/<body[^>]*>/, `<body ${bodyAttributes}>`);
  }

  return page;
};

const writePrerenderedPage = (route, html) => {
  const normalizedRoute = route === "/" ? "" : route.replace(/^\/+/, "");
  const targetDir = normalizedRoute ? path.join(distDir, normalizedRoute) : distDir;
  ensureDir(targetDir);
  const targetFile = path.join(targetDir, "index.html");
  fs.writeFileSync(targetFile, html, "utf-8");
};

const findServerEntry = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    return null;
  }

  const directCandidates = [
    path.join(dirPath, "entry-server.js"),
    path.join(dirPath, "entry-server.mjs"),
    path.join(dirPath, "src", "entry-server.js"),
    path.join(dirPath, "src", "entry-server.mjs"),
  ];

  for (const candidate of directCandidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  const stack = [dirPath];

  while (stack.length > 0) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (/^entry-server\.(?:js|mjs|cjs)$/i.test(entry.name)) {
        return fullPath;
      }
    }
  }

  return null;
};

const ensureServerEntry = async () => {
  const existingEntry = findServerEntry(serverDistDir);
  if (existingEntry) {
    // #region debug-point A:existing-server-entry
    await queueDebugLog({runId:"pre-fix",hypothesisId:"A",location:"scripts/prerender.js:ensureServerEntry",msg:"[DEBUG] SSR entry encontrado antes de reconstruir",data:{existingEntry}});
    // #endregion
    return existingEntry;
  }

  console.log("SSR entry no encontrado. Reconstruyendo dist-server...");
  execSync("npx vite build --ssr src/entry-server.tsx --outDir dist-server", {
    stdio: "inherit",
  });

  const rebuiltEntry = findServerEntry(serverDistDir);
  if (rebuiltEntry) {
    // #region debug-point A:rebuilt-server-entry
    await queueDebugLog({runId:"pre-fix",hypothesisId:"A",location:"scripts/prerender.js:ensureServerEntry",msg:"[DEBUG] SSR entry encontrado despues de reconstruir",data:{rebuiltEntry}});
    // #endregion
    return rebuiltEntry;
  }

  // #region debug-point A:server-entry-missing
  await queueDebugLog({runId:"pre-fix",hypothesisId:"A",location:"scripts/prerender.js:ensureServerEntry",msg:"[DEBUG] No se encontro SSR entry tras reconstruir",data:{serverDistDir,expectedServerEntryPath:serverEntryPath}});
  // #endregion
  throw new Error(
    `No se pudo localizar el entry SSR despues de reconstruir dist-server. Ruta esperada inicial: ${serverEntryPath}`
  );
};

const rebuildServerEntry = () => {
  console.log("Reconstruyendo dist-server para prerender...");
  execSync("npx vite build --ssr src/entry-server.tsx --outDir dist-server", {
    stdio: "inherit",
  });
};

const loadServerRenderer = async () => {
  const initialEntry = await ensureServerEntry();

  try {
    // #region debug-point B:import-initial-entry
    await queueDebugLog({runId:"pre-fix",hypothesisId:"B",location:"scripts/prerender.js:loadServerRenderer",msg:"[DEBUG] Intentando importar SSR entry inicial",data:{initialEntry}});
    // #endregion
    return await import(pathToFileURL(initialEntry).href);
  } catch (error) {
    // #region debug-point B:initial-entry-import-failed
    await queueDebugLog({runId:"pre-fix",hypothesisId:"B",location:"scripts/prerender.js:loadServerRenderer",msg:"[DEBUG] Fallo import del SSR entry inicial",data:{initialEntry,errorName:error?.name||null,errorMessage:error?.message||String(error)}});
    // #endregion
    console.warn("Fallo al importar el entry SSR inicial. Se reintentara tras reconstruir dist-server.");
    rebuildServerEntry();
    const rebuiltEntry = await ensureServerEntry();
    // #region debug-point B:import-rebuilt-entry
    await queueDebugLog({runId:"pre-fix",hypothesisId:"B",location:"scripts/prerender.js:loadServerRenderer",msg:"[DEBUG] Reintentando import del SSR entry reconstruido",data:{rebuiltEntry}});
    // #endregion
    return await import(pathToFileURL(rebuiltEntry).href);
  }
};

async function prerender() {
  if (!fs.existsSync(templatePath)) {
    throw new Error("No se encontró dist/index.html para prerenderizar.");
  }

  let render;
  let getPrerenderRoutes;

  try {
    ({ render, getPrerenderRoutes } = await loadServerRenderer());
  } catch (error) {
    throw toDebuggableError("load-server-renderer", error, { serverDistDir });
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  let prerenderRoutes;

  try {
    prerenderRoutes = [...new Set([...(await getPrerenderRoutes()), ...Object.keys(manualPrerenderPages)])];
  } catch (error) {
    throw toDebuggableError("get-prerender-routes", error);
  }

  // #region debug-point D:prerender-routes-loaded
  await queueDebugLog({runId:"pre-fix",hypothesisId:"D",location:"scripts/prerender.js:prerender",msg:"[DEBUG] Rutas de prerender cargadas",data:{prerenderRoutes}});
  // #endregion

  for (const route of prerenderRoutes) {
    try {
      // #region debug-point D:route-start
      await queueDebugLog({runId:"pre-fix",hypothesisId:"D",location:"scripts/prerender.js:route-loop",msg:"[DEBUG] Iniciando prerender de ruta",data:{route,isManual:Boolean(manualPrerenderPages[route])}});
      // #endregion
      let finalHtml;

      if (manualPrerenderPages[route]) {
        const hydratedTemplate = template.replace(
          /<div id="root"><\/div>/,
          `<div id="root">${manualPrerenderPages[route]}</div>`
        );
        finalHtml = applyHelmet(hydratedTemplate, null, route);
      } else {
        const { appHtml, helmet } = await render(route);
        const hydratedTemplate = template.replace(
          /<div id="root"><\/div>/,
          `<div id="root">${appHtml}</div>`
        );
        finalHtml = applyHelmet(hydratedTemplate, helmet, route);
      }

      writePrerenderedPage(route, finalHtml);
      console.log(`Prerender OK: ${route}`);
    } catch (error) {
      // #region debug-point D:route-failed
      await queueDebugLog({runId:"pre-fix",hypothesisId:"D",location:"scripts/prerender.js:route-loop",msg:"[DEBUG] Fallo prerender de ruta",data:{route,errorName:error?.name||null,errorMessage:error?.message||String(error),stack:error?.stack||null}});
      // #endregion
      await flushDebugLogs();
      throw toDebuggableError("route-render", error, { route });
    }
  }

  await flushDebugLogs();
}

try {
  await prerender();
} catch (error) {
  await flushDebugLogs();
  console.error("Error al prerenderizar rutas:", error);
  process.exit(1);
}
