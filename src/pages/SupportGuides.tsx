import { Link } from "react-router-dom";
import { ArrowRight, Check, Ruler, ShieldCheck, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { supportGuides } from "@/data/supportGuides";

const SupportGuides = () => {
  const gscQueries = [
    "guia de corte recto",
    "guia de corte",
    "guia de corte para sierra circular",
    "guia recta para sierra circular",
    "guia de aluminio para sierra circular",
    "guia de corte Ubermann",
  ];

  const guideBenefits = [
    "Aterrizan dudas que frenan la compra, como compatibilidad, materiales y tipo de trabajo.",
    "Refuerzan busquedas con impresiones reales como guia de corte para sierra circular, guia recta para sierra circular y guia de aluminio para sierra circular.",
    "Conectan trafico informativo con la ficha de producto, la galeria y el contacto de compatibilidad.",
    "Ayudan a filtrar intencion equivocada antes de que el usuario abandone la web.",
  ];

  const guideGroups = [
    {
      title: "Compatibilidad y validacion",
      description:
        "Responde dudas de marca, base, modelo y tipo de herramienta antes de comprar.",
      items: supportGuides.filter((guide) => guide.category === "compatibilidad"),
      accent: "from-herramienta-600 to-taller-700",
      chip: "bg-herramienta-100 text-herramienta-700 border-herramienta-200",
    },
    {
      title: "Tecnica, materiales y productividad",
      description:
        "Ayuda a cortar mejor, trabajar tableros con mas orden y sacar mas rendimiento real a la ProFix 126.",
      items: supportGuides.filter((guide) => guide.category === "tecnica" || guide.category === "materiales"),
      accent: "from-naranja-500 to-taller-700",
      chip: "bg-naranja-100 text-naranja-700 border-naranja-200",
    },
    {
      title: "Comparativas para decidir mejor",
      description:
        "Ataca objeciones comunes frente a reglas caseras, soluciones grandes o alternativas improvisadas.",
      items: supportGuides.filter((guide) => guide.category === "comparativa"),
      accent: "from-madera-500 to-taller-700",
      chip: "bg-madera-200 text-madera-800 border-madera-300",
    },
  ];

  const trustBadges = [
    { icon: <Ruler className="h-6 w-6" />, label: "1.26m para planchas de 1.22m", color: "bg-herramienta-600 text-white" },
    { icon: <ShieldCheck className="h-6 w-6" />, label: "Compatibilidad por base y marca", color: "bg-taller-800 text-white" },
    { icon: <Truck className="h-6 w-6" />, label: "Envio inmediato en Chile", color: "bg-naranja-600 text-white" },
    { icon: <Zap className="h-6 w-6" />, label: "Stock disponible ahora", color: "bg-herramienta-300 text-black" },
  ];

  return (
    <>
      <SEO
        title="Guias de Corte, Compatibilidad y Sierra Circular | ProFix 126"
        description="Centro de guias sobre compatibilidad por herramienta o modelo, comparativas, guia de corte para sierra circular, uso en melamina, MDF, terciado y escenarios reales para sacar mayor provecho a la ProFix 126."
        keywords="guia de corte recto, guia de corte para sierra circular, guias de corte, guia recta para sierra circular, compatibilidad por modelo de herramienta, guia de corte Ubermann, guia para router, cortar melamina recto, profix 126 usos"
        url="https://www.guiadecorte.cl/guias"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-madera-200 to-madera-100 border-b-4 border-herramienta-300">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-herramienta-600 blur-3xl"></div>
          <div className="absolute bottom-16 right-16 w-56 h-56 rounded-full bg-taller-600 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-madera-500 blur-3xl opacity-30"></div>
        </div>
        <div className="absolute inset-0 z-0 opacity-10 pattern-tools"></div>

        <div className="container relative z-10 mx-auto px-4 py-14 md:py-16">
          <header className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="inline-block bg-herramienta-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                Centro de contenido
              </span>
              <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-madera-800 shadow-sm border border-madera-200">
                Guias, comparativas y compatibilidad
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-madera-800 leading-tight mb-5">
              Guias de corte, compatibilidad y sierra circular para decidir con mas seguridad
            </h1>
            <p className="text-xl text-madera-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              Esta seccion responde las preguntas que aparecen antes de comprar y tambien durante el uso real:
              compatibilidad con herramientas, marcas o modelos, materiales de trabajo, comparativas reales,
              cortes rectos con sierra circular y usos complementarios con router.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {gscQueries.map((query) => (
                <span
                  key={query}
                  className="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gris-800 border border-madera-200 shadow-sm hover:bg-naranja-50 transition-colors"
                >
                  {query}
                </span>
              ))}
            </div>
          </header>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <section className="bg-gris-50 border border-gris-200 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-6">
            Lo que mas conviene resolver desde esta pagina
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-gris-700">
            <article className="bg-white rounded-2xl border border-gris-200 p-6 shadow-sm hover:shadow-md transition-shadow hover:border-herramienta-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-herramienta-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-sm">
                  COMPATIBILIDAD
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gris-900">Compatibilidad por marca y modelo</h3>
              <p className="text-base">
                Ideal si la visita llega buscando Makita, Bosch, DeWalt, Stanley, Skil, Einhell, Ingco o Ubermann y
                necesita una respuesta concreta antes de comprar.
              </p>
            </article>
            <article className="bg-white rounded-2xl border border-gris-200 p-6 shadow-sm hover:shadow-md transition-shadow hover:border-naranja-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-naranja-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-sm">
                  SIERRA CIRCULAR
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gris-900">Uso real con sierra circular</h3>
              <p className="text-base">
                Estas guias conectan la busqueda guia de corte para sierra circular con escenarios concretos:
                tableros, muebles, obra, repeticion de medidas y mejor terminacion.
              </p>
            </article>
            <article className="bg-white rounded-2xl border border-gris-200 p-6 shadow-sm hover:shadow-md transition-shadow hover:border-madera-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-taller-800 text-white rounded-full px-3 py-1 text-xs font-bold shadow-sm">
                  DECISION
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gris-900">Comparativas para decidir mejor</h3>
              <p className="text-base">
                Si el visitante aun compara contra reglas caseras o soluciones grandes, aqui encuentra el argumento
                tecnico y comercial para entender cuando la ProFix 126 tiene mas sentido.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-white border border-gris-200 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
          <div className="max-w-4xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-3">
              Por que este centro de guias ayuda al SEO y a la venta de <span className="text-naranja-600">ProFix 126</span>
            </h2>
            <p className="text-gris-700 text-lg">
              Las guias sirven para captar al usuario que todavia no esta listo para comprar, pero ya muestra una necesidad real.
              Aqui trabajamos keywords con impresiones reales y las convertimos en paginas utiles que responden mejor que una ficha
              comercial sola.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guideBenefits.map((benefit) => (
              <div key={benefit} className="rounded-2xl bg-madera-50 border border-madera-200 p-6 shadow-sm flex items-start gap-4">
                <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-madera-600 text-white p-1 shadow-sm">
                  <Check className="h-5 w-5" />
                </span>
                <p className="text-madera-800 font-medium leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-8">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 rounded-xl border border-gris-200 bg-gris-50 px-4 py-3 shadow-sm">
                <span className={`rounded-full p-2 ${badge.color} shadow-md`}>{badge.icon}</span>
                <span className="font-semibold text-gris-800 text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-16 mb-14">
          {guideGroups.map((group) => (
            <section key={group.title}>
              <div className="flex items-center gap-4 mb-6">
                <span className={`bg-gradient-to-r ${group.accent} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-md text-lg`}>
                  {group.items.length}
                </span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gris-900">{group.title}</h2>
                  <p className="text-gris-600 max-w-3xl">{group.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.items.map((guide) => (
                  <article
                    key={guide.slug}
                    className="bg-white border border-gris-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow hover:border-naranja-200 group"
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <p className="text-xs uppercase tracking-wide text-naranja-600 font-bold">
                        {guide.primaryKeyword}
                      </p>
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border shadow-sm ${group.chip}`}>
                        {guide.categoryLabel}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gris-900 mb-3 group-hover:text-naranja-700 transition-colors">
                      {guide.shortTitle}
                    </h3>
                    <p className="text-gris-600 mb-5 leading-relaxed">{guide.summary}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 text-sm text-gris-700">
                      <div className="rounded-xl bg-gris-50 border border-gris-200 p-3">
                        <p className="text-xs font-semibold text-herramienta-700 uppercase mb-1">Intencion</p>
                        <p className="font-medium">{guide.searchIntent}</p>
                      </div>
                      <div className="rounded-xl bg-gris-50 border border-gris-200 p-3">
                        <p className="text-xs font-semibold text-naranja-700 uppercase mb-1">Publico</p>
                        <p className="font-medium">{guide.audience}</p>
                      </div>
                      <div className="rounded-xl bg-gris-50 border border-gris-200 p-3">
                        <p className="text-xs font-semibold text-taller-700 uppercase mb-1">FAQ</p>
                        <p className="font-bold text-lg text-taller-800">{guide.faq.length}</p>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-madera-50 border border-madera-200 p-4 mb-6">
                      <p className="text-xs uppercase tracking-wide font-bold text-madera-700 mb-2">
                        Busquedas relacionadas
                      </p>
                      <ul className="text-madera-800 space-y-2">
                        {guide.relatedSearches.slice(0, 3).map((search) => (
                          <li key={search} className="flex items-start gap-2">
                            <span className="mt-1 inline-flex flex-shrink-0 items-center justify-center rounded-full bg-naranja-100 text-naranja-700 p-0.5 border border-naranja-200 shadow-sm">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                            <span className="font-medium">{search}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to={guide.path} className="block">
                      <Button className="w-full bg-herramienta-600 hover:bg-herramienta-700 text-white py-5 rounded-xl text-lg shadow-md group-hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        Abrir guia <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="relative overflow-hidden bg-gradient-to-r from-herramienta-600 to-herramienta-700 rounded-3xl p-8 md:p-10 shadow-2xl text-white border-2 border-white/60">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-taller-600 blur-3xl"></div>
            <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full bg-madera-500 blur-3xl"></div>
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wide mb-3 text-naranja-300">
                Como usar estas guias para decidir mejor
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Resuelve compatibilidad, revisa tecnica y luego pasa a la ficha de compra
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                Si todavia estas comparando, parte por compatibilidad. Si ya tienes herramienta, ve primero a
                la guia de cortes rectos y a la pagina de materiales. Si estas comparando alternativas, entra a
                las comparativas. Si tu duda depende de marca o modelo, cierra el recorrido con contacto.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/95">
                <li className="flex items-center gap-2">
                  <span className="rounded-full bg-white/20 p-1"><Check className="h-4 w-4" /></span>
                  Compatibilidad para responder objeciones antes de comprar.
                </li>
                <li className="flex items-center gap-2">
                  <span className="rounded-full bg-white/20 p-1"><Check className="h-4 w-4" /></span>
                  Materiales para entender mejor usos y beneficios reales.
                </li>
                <li className="flex items-center gap-2">
                  <span className="rounded-full bg-white/20 p-1"><Check className="h-4 w-4" /></span>
                  Tecnica para conectar la promesa comercial con resultados concretos.
                </li>
                <li className="flex items-center gap-2">
                  <span className="rounded-full bg-white/20 p-1"><Check className="h-4 w-4" /></span>
                  Comparativas para justificar la compra frente a reglas caseras o soluciones grandes.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/producto/profix-126">
                <Button className="w-full bg-white text-herramienta-700 hover:bg-madera-200 hover:text-herramienta-800 py-6 rounded-xl text-lg shadow-lg border-2 border-white flex items-center justify-center gap-2">
                  Ver ProFix 126 <ArrowRight className="h-5 w-5" />
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SupportGuides;
