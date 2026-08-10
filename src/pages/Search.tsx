import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ArrowUpRight, BookOpen, FileText, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { supportGuides } from "@/data/supportGuides";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q")?.trim() || "";
  const [query, setQuery] = useState<string>(initialQuery);
  const [siteSearchUrl, setSiteSearchUrl] = useState<string>("");

  useEffect(() => {
    if (query) {
      const encoded = encodeURIComponent(query);
      setSiteSearchUrl(
        `https://www.google.com/search?q=site%3Awww.guiadecorte.cl+${encoded}`
      );
    } else {
      setSiteSearchUrl("");
    }
  }, [query]);

  const quickLinks = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Producto principal",
      description: "Ficha comercial de la ProFix 126, precios y ficha tecnica.",
      href: "/producto/profix-126",
      tone: "from-herramienta-600 to-taller-700",
      chip: "bg-herramienta-100 text-herramienta-800 border-herramienta-200",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Blog de carpinteria y uso real",
      description: "Articulos sobre sierra circular, compatibilidad y flujo de taller.",
      href: "/blog",
      tone: "from-naranja-500 to-taller-700",
      chip: "bg-naranja-100 text-naranja-800 border-naranja-200",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Centro de guias y compatibilidad",
      description: "Guias por herramienta, materiales y comparativas para decidir mejor.",
      href: "/guias",
      tone: "from-madera-500 to-taller-700",
      chip: "bg-madera-100 text-madera-800 border-madera-200",
    },
  ];

  const featuredGuides = supportGuides.slice(0, 4);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    setSearchParams(params);
    if (siteSearchUrl) {
      window.open(siteSearchUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <SEO
        title="Buscar en GuiaDeCorte.cl"
        description="Pagina de busqueda para encontrar contenido sobre guia de corte para sierra circular, compatibilidad, materiales y uso de ProFix 126 dentro del sitio."
        url="/search"
        noindex
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-madera-100 to-madera-200 border-b-4 border-herramienta-300">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-10 left-16 w-40 h-40 rounded-full bg-herramienta-600 blur-3xl"></div>
          <div className="absolute bottom-10 right-16 w-56 h-56 rounded-full bg-taller-600 blur-3xl"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 py-14 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="inline-block bg-herramienta-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                Busqueda en el sitio
              </span>
              <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-madera-800 shadow-sm border border-madera-200">
                Resultados por Google Site Search
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-madera-800 leading-tight mb-5">
              Busca dentro de GuiaDeCorte.cl con Google
            </h1>
            <p className="text-lg text-madera-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Si llegaste desde una URL de busqueda del sitio, aqui puedes encontrar informacion sobre la guia
              ProFix 126, compatibilidad por marca, uso con sierra circular o router y materiales como melamina, MDF y terciado.
            </p>

            <form onSubmit={onSubmit} className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gris-500" />
                  <Input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Ej: guia de corte para sierra circular, router, Makita, melamina, 1.26m"
                    className="h-16 pl-12 pr-4 rounded-xl border-2 border-madera-300 shadow-md bg-white text-lg focus:border-naranja-500 focus:ring-2 focus:ring-naranja-300"
                    name="q"
                    id="site-search-input"
                    autoComplete="off"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-naranja-600 hover:bg-naranja-700 text-white h-16 px-8 rounded-xl text-lg shadow-md flex items-center justify-center gap-2"
                >
                  <SearchIcon className="h-5 w-5" />
                  Buscar
                </Button>
              </div>
              {siteSearchUrl && (
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={siteSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-herramienta-600 text-herramienta-700 hover:bg-herramienta-50 px-6 py-4 rounded-xl font-semibold shadow-sm"
                  >
                    Abrir resultados en Google
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                  <Link to="/contacto">
                    <Button variant="outline" className="w-full sm:w-auto border-2 border-taller-600 text-taller-700 hover:bg-taller-50 px-6 py-4 rounded-xl text-base">
                      Prefiero consultar por contacto
                    </Button>
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <section className="bg-white border border-gris-200 rounded-2xl p-6 md:p-8 shadow-sm mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-4">
            Enlaces rapidos para no perderte con la busqueda
          </h2>
          <p className="text-gris-700 text-lg mb-8 max-w-4xl">
            Si no quieres escribir, la navegacion mas eficaz para SEO y conversion empieza por estas rutas.
            Si lo que buscas depende de tu herramienta o modelo, usa el centro de guias y la compatibilidad.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group bg-white rounded-2xl border border-gris-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col gap-4"
              >
                <div className={`inline-flex items-center w-12 h-12 rounded-xl bg-gradient-to-br ${link.tone} text-white shadow-md`}>
                  {link.icon}
                </div>
                <div className="space-y-2">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold shadow-sm ${link.chip}`}>
                    Acceso directo
                  </span>
                  <h3 className="text-xl font-extrabold text-gris-900 group-hover:text-naranja-700 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gris-700 text-base leading-relaxed">{link.description}</p>
                </div>
                <div className="mt-auto inline-flex items-center gap-2 text-naranja-600 font-semibold group-hover:gap-3 transition-all">
                  Ir a la seccion
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-6">
            Guias que suelen aparecer en las busquedas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                to={guide.path}
                className="group bg-gris-50 rounded-2xl border border-gris-200 p-6 shadow-sm hover:shadow-xl transition-shadow hover:border-naranja-200"
              >
                <p className="text-xs uppercase tracking-wide text-herramienta-700 font-bold mb-3">
                  {guide.primaryKeyword}
                </p>
                <h3 className="font-extrabold text-xl text-gris-900 mb-3 group-hover:text-naranja-700 transition-colors">
                  {guide.shortTitle}
                </h3>
                <p className="text-gris-700 mb-5 leading-relaxed">{guide.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.relatedSearches.slice(0, 3).map((search) => (
                    <span
                      key={search}
                      className="inline-flex items-center rounded-full bg-white border border-madera-200 px-3 py-1 text-xs font-semibold text-madera-800 shadow-sm"
                    >
                      {search}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Search;
