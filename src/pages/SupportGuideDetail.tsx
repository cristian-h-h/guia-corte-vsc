import { Link, useParams } from "react-router-dom";
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

      <article className="container mx-auto px-4 py-12">
        <nav className="text-sm text-gris-500 mb-6">
          <Link to="/" className="hover:text-naranja-600">Inicio</Link>
          {" / "}
          <Link to="/guias" className="hover:text-naranja-600">Guias</Link>
          {" / "}
          <span>{guide.shortTitle}</span>
        </nav>

        <header className="max-w-4xl mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-naranja-600">
              {guide.primaryKeyword}
            </p>
            <span className="inline-flex items-center rounded-full bg-gris-100 px-3 py-1 text-xs font-medium text-gris-700">
              {guide.categoryLabel}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{guide.title}</h1>
          <p className="text-xl text-gris-600 mb-5">{guide.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gris-700">
            <p>
              <strong>Intencion de busqueda:</strong> {guide.searchIntent}
            </p>
            <p>
              <strong>Publico principal:</strong> {guide.audience}
            </p>
          </div>
        </header>

        <section className="bg-gris-50 border border-gris-200 rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-3">Problema que resuelve</h2>
          <p className="text-gris-700 mb-4">{guide.problemStatement}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Escenarios de uso</h3>
              <ul className="list-disc pl-5 text-gris-700 space-y-2">
                {guide.useCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Herramientas relacionadas</h3>
              <ul className="list-disc pl-5 text-gris-700 space-y-2">
                {guide.toolFocus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-10 mb-12">
          {guide.sections.map((section) => (
            <section key={section.title} className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
              <div className="space-y-4 text-gris-700 text-lg leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets && (
                <ul className="list-disc pl-6 text-gris-700 space-y-2 mt-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {guide.comparison && (
          <section className="max-w-5xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{guide.comparison.title}</h2>
            <p className="text-gris-700 mb-5">{guide.comparison.intro}</p>
            <div className="overflow-x-auto border border-gris-200 rounded-xl">
              <table className="w-full text-left">
                <thead className="bg-gris-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Factor</th>
                    <th className="px-4 py-3 font-semibold">ProFix 126</th>
                    <th className="px-4 py-3 font-semibold">{guide.comparison.alternativeLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.comparison.rows.map((row) => (
                    <tr key={row.feature} className="border-t border-gris-200 align-top">
                      <td className="px-4 py-3 font-medium text-gris-900">{row.feature}</td>
                      <td className="px-4 py-3 text-gris-700">{row.profix126}</td>
                      <td className="px-4 py-3 text-gris-700">{row.alternative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {guide.compatibilityMatrix && (
          <section className="max-w-5xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{guide.compatibilityMatrix.title}</h2>
            <p className="text-gris-700 mb-6">{guide.compatibilityMatrix.intro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {guide.compatibilityMatrix.brands.map((brand) => (
                <article key={brand.brand} className="bg-white border border-gris-200 rounded-xl p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold">{brand.brand}</h3>
                    <span className="inline-flex items-center rounded-full bg-naranja-50 px-3 py-1 text-xs font-medium text-naranja-700 border border-naranja-200">
                      {brand.validationLevel}
                    </span>
                  </div>
                  <p className="text-sm text-gris-500 mb-3">
                    <strong>Herramientas:</strong> {brand.toolTypes.join(", ")}
                  </p>
                  <p className="text-gris-700">{brand.guidance}</p>
                </article>
              ))}
            </div>
            <div className="bg-gris-50 border border-gris-200 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Que conviene enviar para validar rapido</h3>
              <ul className="list-disc pl-6 text-gris-700 space-y-2">
                {guide.compatibilityMatrix.validationSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="max-w-4xl mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Busquedas relacionadas que esta guia cubre</h2>
          <div className="flex flex-wrap gap-3">
            {guide.relatedSearches.map((search) => (
              <span
                key={search}
                className="inline-flex items-center rounded-full bg-naranja-50 px-4 py-2 text-sm text-naranja-700 border border-naranja-200"
              >
                {search}
              </span>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {guide.faq.map((item) => (
              <article key={item.question} className="bg-white border border-gris-200 rounded-xl p-5">
                <h3 className="text-lg font-bold mb-2">{item.question}</h3>
                <p className="text-gris-700">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {relatedGuides && relatedGuides.length > 0 && (
          <section className="max-w-5xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Tambien te puede interesar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedGuides.map((relatedGuide) => (
                <article key={relatedGuide.slug} className="bg-white border border-gris-200 rounded-xl p-5">
                  <p className="text-xs uppercase tracking-wide text-naranja-600 font-semibold mb-2">
                    {relatedGuide.categoryLabel}
                  </p>
                  <h3 className="text-lg font-bold mb-2">{relatedGuide.shortTitle}</h3>
                  <p className="text-sm text-gris-600 mb-4">{relatedGuide.summary}</p>
                  <Link to={relatedGuide.path} className="text-naranja-600 hover:text-naranja-700 font-medium">
                    Abrir guia
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="bg-madera-50 border border-madera-200 rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-3">Siguiente paso recomendado</h2>
              <p className="text-gris-700 mb-4">
                Si esta guia ya resolvio la parte tecnica, el siguiente paso logico es revisar la ficha de producto,
                mirar aplicaciones reales en galeria o cerrar compatibilidad por contacto cuando el caso depende del
                modelo de herramienta o del tipo de trabajo.
              </p>
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
      </article>
    </>
  );
};

export default SupportGuideDetail;
