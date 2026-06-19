import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { supportGuides } from "@/data/supportGuides";

const SupportGuides = () => {
  const guideGroups = [
    {
      title: "Compatibilidad y validacion",
      description:
        "Responde dudas de marca, base, modelo y tipo de herramienta antes de comprar.",
      items: supportGuides.filter((guide) => guide.category === "compatibilidad"),
    },
    {
      title: "Tecnica, materiales y productividad",
      description:
        "Ayuda a cortar mejor, trabajar tableros con mas orden y sacar mas rendimiento real a la ProFix 126.",
      items: supportGuides.filter((guide) => guide.category === "tecnica" || guide.category === "materiales"),
    },
    {
      title: "Comparativas para decidir mejor",
      description:
        "Ataca objeciones comunes frente a reglas caseras, soluciones grandes o alternativas improvisadas.",
      items: supportGuides.filter((guide) => guide.category === "comparativa"),
    },
  ];

  return (
    <>
      <SEO
        title="Guias, Comparativas y Compatibilidad ProFix 126"
        description="Centro de guias sobre compatibilidad por herramienta o modelo, comparativas, cortes rectos, uso en melamina, MDF, terciado y escenarios reales para sacar mayor provecho a la ProFix 126."
        keywords="guias de corte, comparativas de guias, compatibilidad por modelo de herramienta, guia para router, cortar melamina recto, profix 126 usos"
        url="https://www.guiadecorte.cl/guias"
      />

      <div className="container mx-auto px-4 py-12">
        <header className="text-center max-w-4xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-naranja-600 mb-3">
            Centro de contenido
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Guias, comparativas y compatibilidad por herramienta
          </h1>
          <p className="text-gris-600 text-lg">
            Esta seccion responde las preguntas que aparecen antes de comprar y tambien durante el uso real:
            compatibilidad con herramientas, marcas o modelos, materiales de trabajo, comparativas reales,
            cortes rectos con sierra circular y usos complementarios con router.
          </p>
        </header>

        <div className="space-y-14 mb-14">
          {guideGroups.map((group) => (
            <section key={group.title}>
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{group.title}</h2>
                <p className="text-gris-600 max-w-3xl">{group.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.items.map((guide) => (
                  <article key={guide.slug} className="bg-white border border-gris-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <p className="text-xs uppercase tracking-wide text-naranja-600 font-semibold">
                        {guide.primaryKeyword}
                      </p>
                      <span className="inline-flex items-center rounded-full bg-gris-100 px-3 py-1 text-xs font-medium text-gris-700">
                        {guide.categoryLabel}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{guide.shortTitle}</h3>
                    <p className="text-gris-600 mb-4">{guide.summary}</p>
                    <div className="space-y-2 mb-5 text-sm text-gris-700">
                      <p>
                        <strong>Intencion:</strong> {guide.searchIntent}
                      </p>
                      <p>
                        <strong>Publico:</strong> {guide.audience}
                      </p>
                      <p>
                        <strong>FAQ visibles:</strong> {guide.faq.length}
                      </p>
                    </div>
                    <ul className="list-disc pl-5 text-gris-700 space-y-2 mb-6">
                      {guide.relatedSearches.slice(0, 3).map((search) => (
                        <li key={search}>{search}</li>
                      ))}
                    </ul>
                    <Link to={guide.path}>
                      <Button className="w-full">Abrir guia</Button>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-madera-50 border border-madera-200 rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-3">Como usar estas guias para decidir mejor</h2>
              <p className="text-gris-700 mb-4">
                Si todavia estas comparando, parte por compatibilidad. Si ya tienes herramienta, ve primero a
                la guia de cortes rectos y a la pagina de materiales. Si estas comparando alternativas, entra a
                las comparativas. Si tu duda depende de marca o modelo, cierra el recorrido con contacto.
              </p>
              <ul className="list-disc pl-5 text-gris-700 space-y-2">
                <li>Compatibilidad para responder objeciones antes de comprar.</li>
                <li>Materiales para entender mejor usos y beneficios reales.</li>
                <li>Tecnica para conectar la promesa comercial con resultados concretos.</li>
                <li>Comparativas para justificar la compra frente a reglas caseras o soluciones grandes.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/producto/profix-126">
                <Button className="w-full">Ver ProFix 126</Button>
              </Link>
              <Link to="/galeria">
                <Button variant="outline" className="w-full">Ver galeria</Button>
              </Link>
              <Link to="/contacto">
                <Button variant="outline" className="w-full">Resolver compatibilidad</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SupportGuides;
