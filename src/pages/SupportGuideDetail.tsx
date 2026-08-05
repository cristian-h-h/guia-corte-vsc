import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, MessageSquare, ShoppingCart, Ruler, ShieldCheck, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { supportGuides } from "@/data/supportGuides";

const SupportGuideDetail = () => {
  const { slug } = useParams();
  const guide = supportGuides.find((item) => item.slug === slug);
  const relatedGuides = guide?.relatedGuideSlugs
    ?.map((relatedSlug) => supportGuides.find((item) => item.slug === relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Guia no encontrada</h1>
        <p className="text-gris-600 mb-6">
          La pagina que buscas no existe o fue movida dentro del centro de guias.
        </p>
        <Link to="/guias">
          <Button>Volver al centro de guias</Button>
        </Link>
      </div>
    );
  }

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      author: {
        "@type": "Organization",
        name: "GuiaDeCorte.cl",
      },
      publisher: {
        "@type": "Organization",
        name: "GuiaDeCorte.cl",
      },
      mainEntityOfPage: `https://www.guiadecorte.cl${guide.path}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  const trustBadges = [
    {
      icon: <Ruler className="h-6 w-6" />,
      label: "1.26m para planchas completas",
      color: "bg-herramienta-600 text-white",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      label: "Compatible con bases planas",
      color: "bg-taller-800 text-white",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      label: "Envio inmediato en Chile",
      color: "bg-naranja-600 text-white",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      label: "Stock disponible",
      color: "bg-herramienta-300 text-black",
    },
  ];

  return (
    <>
      <SEO
        title={guide.title}
        description={guide.description}
        keywords={guide.keywords}
        url={`https://www.guiadecorte.cl${guide.path}`}
        type="article"
        schema={schema}
      />

      <article className="pb-12">
        <section className="relative overflow-hidden bg-gradient-to-b from-madera-200 to-madera-100 border-b-4 border-herramienta-300">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-16 left-16 w-48 h-48 rounded-full bg-herramienta-600 blur-3xl"></div>
            <div className="absolute bottom-12 right-20 w-56 h-56 rounded-full bg-taller-600 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-madera-500 blur-3xl opacity-30"></div>
          </div>
          <div className="absolute inset-0 z-0 opacity-10 pattern-tools"></div>

          <div className="container relative z-10 mx-auto px-4 py-14 md:py-16">
            <nav className="text-sm text-madera-700 mb-6">
              <Link to="/" className="hover:text-naranja-700 font-medium">Inicio</Link>
              {" / "}
              <Link to="/guias" className="hover:text-naranja-700 font-medium">Guias</Link>
              {" / "}
              <span className="text-madera-800 font-semibold">{guide.shortTitle}</span>
            </nav>

            <header className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-2 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="inline-block bg-herramienta-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                    {guide.primaryKeyword}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-madera-800 shadow-sm border border-madera-200">
                    {guide.categoryLabel}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-madera-800 leading-tight mb-5">
                  {guide.title}
                </h1>
                <p className="text-xl md:text-2xl text-madera-700 mb-6 font-medium leading-relaxed">
                  {guide.summary}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-madera-800 mb-8">
                  <div className="bg-white/80 rounded-xl border border-madera-200 p-4 shadow-sm">
                    <p className="text-sm font-semibold text-naranja-700 mb-1 uppercase tracking-wide">
                      Intencion de busqueda
                    </p>
                    <p className="font-medium">{guide.searchIntent}</p>
                  </div>
                  <div className="bg-white/80 rounded-xl border border-madera-200 p-4 shadow-sm">
                    <p className="text-sm font-semibold text-naranja-700 mb-1 uppercase tracking-wide">
                      Publico principal
                    </p>
                    <p className="font-medium">{guide.audience}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to="/producto/profix-126">
                    <Button className="bg-herramienta-600 hover:bg-herramienta-700 text-white flex items-center gap-2 px-7 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white text-lg">
                      <ShoppingCart className="h-5 w-5" /> Ver ProFix 126
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/56935777727?text=Hola,%20tenemos%20stock%20para%20envio%20inmediato%20en%20Chile%20y%20somos%20los%20unicos%20con%201.26m%20de%20largo.%20Vine%20de%20la%20guia%20para%20validar%20compatibilidad%20de%20la%20guia%20de%20corte%20ProFix%20126."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-2 border-taller-600 text-taller-700 hover:bg-taller-100 px-7 py-6 rounded-xl shadow-md hover:shadow-lg text-lg flex items-center gap-2 bg-white">
                      <MessageSquare className="h-5 w-5" /> Validar por WhatsApp
                    </Button>
                  </a>
                  <Link to="/guias">
                    <Button variant="outline" className="border-2 border-herramienta-600 text-herramienta-700 hover:bg-herramienta-100 px-7 py-6 rounded-xl shadow-md hover:shadow-lg text-lg bg-white">
                      Volver a guias
                    </Button>
                  </Link>
                </div>
              </div>

              <aside className="bg-white rounded-2xl shadow-2xl border border-madera-200 p-6 space-y-5">
                <div className="bg-gradient-to-br from-naranja-500 to-taller-700 rounded-xl p-4 text-white">
                  <p className="text-xs uppercase tracking-wide font-semibold mb-1 opacity-90">
                    Ventaja comercial principal
                  </p>
                  <h3 className="text-xl font-bold mb-1">1.26m sobre planchas de 1.22m</h3>
                  <p className="text-sm opacity-95">
                    La ProFix 126 cubre la plancha estandar de una sola pasada, a diferencia de opciones mas cortas en Sodimac o Imperial.
                  </p>
                </div>
                <ul className="grid grid-cols-1 gap-3">
                  {trustBadges.map((badge) => (
                    <li
                      key={badge.label}
                      className="flex items-center gap-3 rounded-xl border border-gris-200 bg-gris-50 px-4 py-3 shadow-sm"
                    >
                      <span className={`rounded-full p-2 ${badge.color} shadow-md`}>
                        {badge.icon}
                      </span>
                      <span className="font-semibold text-gris-800">{badge.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-madera-50 rounded-xl border border-madera-200 p-4 text-madera-800">
                  <p className="text-sm font-semibold mb-2 text-naranja-700">Precio efectivo en Chile</p>
                  <p className="text-2xl font-extrabold">$35.000 transferencia</p>
                  <p className="text-sm text-gris-600 mt-1">
                    Ahorras vs opciones de $43.990+ que solo llegan a 1.00-1.22m.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Link to="/producto/profix-126" className="w-full">
                    <Button className="w-full bg-naranja-600 hover:bg-naranja-700 text-white rounded-xl py-6 text-lg shadow-md">
                      Ir a ficha de compra
                    </Button>
                  </Link>
                  <Link to="/contacto" className="w-full">
                    <Button variant="outline" className="w-full border-naranja-600 text-naranja-700 hover:bg-naranja-50 rounded-xl py-6 text-lg">
                      Resolver dudas antes de comprar
                    </Button>
                  </Link>
                </div>
              </aside>
            </header>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <section className="bg-gris-50 border border-gris-200 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gris-800 border border-gris-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-naranja-600 animate-pulse" />
                Contenido orientado a taller y obra real
              </span>
              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gris-800 border border-gris-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-herramienta-600 animate-pulse" />
                Enfocado en uso con herramienta que ya tienes
              </span>
              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gris-800 border border-gris-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-taller-700 animate-pulse" />
                Busquedas que realmente llegan a tu carrito
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-4 flex items-center gap-3">
              <span className="bg-herramienta-600 text-white rounded-full px-4 py-1 text-base shadow-sm">
                Problema que resuelve
              </span>
            </h2>
            <p className="text-gris-700 text-lg leading-relaxed mb-6 max-w-4xl">{guide.problemStatement}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="bg-white rounded-xl border border-gris-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-herramienta-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-sm">
                    ESCENARIOS
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gris-900 mb-3">Escenarios de uso</h3>
                <ul className="space-y-3">
                  {guide.useCases.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gris-700">
                      <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-naranja-100 text-naranja-700 p-1 border border-naranja-200 shadow-sm">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="bg-white rounded-xl border border-gris-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-taller-800 text-white rounded-full px-3 py-1 text-xs font-bold shadow-sm">
                    HERRAMIENTAS
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gris-900 mb-3">Herramientas relacionadas</h3>
                <ul className="space-y-3">
                  {guide.toolFocus.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gris-700">
                      <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-herramienta-100 text-herramienta-700 p-1 border border-herramienta-200 shadow-sm">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <div className="space-y-12 mb-14">
            {guide.sections.map((section, sectionIndex) => (
              <section key={section.title} className="max-w-4xl">
                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-gradient-to-r from-herramienta-600 to-taller-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-md">
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gris-900">{section.title}</h2>
                </div>
                <div className="bg-white rounded-2xl border border-gris-200 p-6 md:p-8 shadow-sm space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-gris-700 text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {section.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex items-start gap-3 rounded-xl border border-madera-200 bg-madera-50 px-4 py-3 shadow-sm"
                        >
                          <span className="mt-1 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-madera-600 text-white p-1 shadow-sm">
                            <Check className="h-4 w-4" />
                          </span>
                          <span className="text-madera-800 font-medium">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          {guide.comparison && (
            <section className="max-w-6xl mx-auto mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-3 text-center">
                {guide.comparison.title}
              </h2>
              <p className="text-gris-700 text-lg mb-8 text-center max-w-4xl mx-auto">
                {guide.comparison.intro}
              </p>
              <div className="bg-white rounded-2xl shadow-xl border border-gris-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gradient-to-r from-madera-100 to-madera-200">
                        <th className="px-5 py-4 font-bold text-madera-800 border-b border-madera-300">
                          Factor
                        </th>
                        <th className="px-5 py-4 font-bold text-gris-900 border-b border-madera-300">
                          ProFix 126
                        </th>
                        <th className="px-5 py-4 font-bold text-gris-700 border-b border-madera-300">
                          {guide.comparison.alternativeLabel}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {guide.comparison.rows.map((row, idx) => (
                        <tr
                          key={row.feature}
                          className={`${idx % 2 === 0 ? "bg-white" : "bg-gris-50"} border-t border-gris-200 align-top`}
                        >
                          <td className="px-5 py-4 font-semibold text-gris-900 whitespace-nowrap">
                            {row.feature}
                          </td>
                          <td className="px-5 py-4 text-gris-800 font-medium">
                            <div className="inline-flex items-center gap-2">
                              <span className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-naranja-100 text-naranja-700 p-0.5 border border-naranja-200 shadow-sm">
                                <Check className="h-4 w-4" />
                              </span>
                              {row.profix126}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-gris-600">{row.alternative}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-madera-50 border-t border-madera-200 p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/producto/profix-126" className="w-full md:col-span-2">
                    <Button className="w-full bg-herramienta-600 hover:bg-herramienta-700 text-white py-6 rounded-xl text-lg shadow-md flex items-center justify-center gap-2">
                      Quiero la ProFix 126 <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contacto">
                    <Button variant="outline" className="w-full border-naranja-600 text-naranja-700 hover:bg-naranja-50 py-6 rounded-xl text-lg">
                      Comparar antes de comprar
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {guide.compatibilityMatrix && (
            <section className="max-w-6xl mx-auto mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-3">
                {guide.compatibilityMatrix.title}
              </h2>
              <p className="text-gris-700 text-lg mb-8 max-w-4xl">
                {guide.compatibilityMatrix.intro}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {guide.compatibilityMatrix.brands.map((brand) => (
                  <article
                    key={brand.brand}
                    className="bg-white border border-gris-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow hover:border-naranja-200"
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <h3 className="text-xl font-bold text-gris-900">{brand.brand}</h3>
                      <span className="inline-flex items-center rounded-full bg-naranja-50 px-3 py-1 text-xs font-semibold text-naranja-700 border border-naranja-200 shadow-sm">
                        {brand.validationLevel}
                      </span>
                    </div>
                    <p className="text-sm text-gris-500 mb-3">
                      <strong>Herramientas:</strong> {brand.toolTypes.join(", ")}
                    </p>
                    <p className="text-gris-700 leading-relaxed">{brand.guidance}</p>
                  </article>
                ))}
              </div>
              <div className="bg-gris-50 border border-gris-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gris-900 mb-4 flex items-center gap-2">
                  <span className="bg-herramienta-600 text-white rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
                    CHECKLIST
                  </span>
                  Que conviene enviar para validar rapido
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guide.compatibilityMatrix.validationSteps.map((step) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 rounded-xl border border-gris-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-herramienta-100 text-herramienta-700 p-1 border border-herramienta-200 shadow-sm">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-gris-700 font-medium">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section className="max-w-5xl mx-auto mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-5">
              Busquedas relacionadas que esta guia cubre
            </h2>
            <div className="bg-gradient-to-br from-madera-100 via-white to-herramienta-100 rounded-2xl border border-madera-200 p-6 md:p-8 shadow-sm">
              <div className="flex flex-wrap gap-3">
                {guide.relatedSearches.map((search) => (
                  <span
                    key={search}
                    className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-gris-800 border border-naranja-200 shadow-sm hover:bg-naranja-50 transition-colors"
                  >
                    {search}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-5">
              Preguntas frecuentes
            </h2>
            <div className="space-y-4">
              {guide.faq.map((item, idx) => (
                <article
                  key={item.question}
                  className="bg-white border border-gris-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-naranja-600 text-white w-9 h-9 font-bold shadow-md">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-gris-900 mb-2">{item.question}</h3>
                      <p className="text-gris-700 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {relatedGuides && relatedGuides.length > 0 && (
            <section className="max-w-6xl mx-auto mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-6">
                Tambien te puede interesar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedGuides.map((relatedGuide) => (
                  <article
                    key={relatedGuide.slug}
                    className="bg-white border border-gris-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow hover:border-naranja-200 group"
                  >
                    <p className="text-xs uppercase tracking-wide text-naranja-600 font-bold mb-2">
                      {relatedGuide.categoryLabel}
                    </p>
                    <h3 className="text-xl font-bold text-gris-900 mb-3 group-hover:text-naranja-700 transition-colors">
                      {relatedGuide.shortTitle}
                    </h3>
                    <p className="text-sm text-gris-600 mb-5 leading-relaxed">{relatedGuide.summary}</p>
                    <Link
                      to={relatedGuide.path}
                      className="inline-flex items-center gap-2 text-naranja-600 hover:text-naranja-700 font-semibold group-hover:gap-3 transition-all"
                    >
                      Abrir guia <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="relative overflow-hidden bg-gradient-to-r from-herramienta-600 to-herramienta-700 rounded-3xl p-8 md:p-10 shadow-2xl text-white border-2 border-white/60">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-taller-600 blur-3xl"></div>
              <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full bg-madera-500 blur-3xl"></div>
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-wide mb-3 text-naranja-300">
                  Siguiente paso recomendado
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Resuelve la parte tecnica y pasa a la ficha de venta
                </h2>
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  Si esta guia ya resolvio la parte tecnica, el siguiente paso logico es revisar la ficha de producto,
                  mirar aplicaciones reales en galeria o cerrar compatibilidad por contacto cuando el caso depende del
                  modelo de herramienta o del tipo de trabajo.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/90">
                  <li className="flex items-center gap-2">
                    <span className="rounded-full bg-white/20 p-1"><Check className="h-4 w-4" /></span>
                    Precio claro en CLP y forma de pago
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="rounded-full bg-white/20 p-1"><Check className="h-4 w-4" /></span>
                    Fotos, videos y aplicaciones reales
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="rounded-full bg-white/20 p-1"><Check className="h-4 w-4" /></span>
                    Compatibilidad por marca y modelo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="rounded-full bg-white/20 p-1"><Check className="h-4 w-4" /></span>
                    Envio inmediato con stock en Chile
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/producto/profix-126">
                  <Button className="w-full bg-white text-herramienta-700 hover:bg-madera-200 hover:text-herramienta-800 py-6 rounded-xl text-lg shadow-lg border-2 border-white flex items-center justify-center gap-2">
                    <ShoppingCart className="h-5 w-5" /> Ver ProFix 126
                  </Button>
                </Link>
                <Link to="/galeria">
                  <Button variant="outline" className="w-full border-white/80 text-white hover:bg-white/10 py-6 rounded-xl text-lg">
                    Ver galeria
                  </Button>
                </Link>
                <Link to="/contacto">
                  <Button variant="outline" className="w-full border-white/80 text-white hover:bg-white/10 py-6 rounded-xl text-lg">
                    Resolver compatibilidad
                  </Button>
                </Link>
                <a
                  href="https://wa.me/56935777727?text=Hola,%20tengo%20stock%20para%20envio%20inmediato%20en%20Chile%20y%20somos%20los%20unicos%20con%201.26m%20de%20largo.%20Quiero%20el%20link%20de%20compra%20de%20la%20guia%20de%20corte%20ProFix%20126%20y%20validar%20compatibilidad."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full border-white/80 text-white hover:bg-white/10 py-6 rounded-xl text-lg flex items-center justify-center gap-2">
                    <MessageSquare className="h-5 w-5" /> WhatsApp comercial
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default SupportGuideDetail;
