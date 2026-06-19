import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import { ExternalLink } from "lucide-react";
const RelatedCompaniesCarousel = () => {
  const companies = [
    {
      name: "terciamel.cl",
      logo: "/logos/Terciamel-Logo.webp",
      url: "https://terciamel.cl",
      alt: "Logo Terciamel - comercializacion planchas de terciado melamina"
    },
    {
      name: "carrosdesmontableschile.cl",
      logo: "/logos/Logo-desmontables-chile.webp",
      url: "https://carrosdesmontableschile.cl",
      alt: "Logo Carros Desmontables Chile - Soluciones de transporte"
    },
    {
      name: "guiadecorte.cl",
      logo: "/guia-imagenes/profix-126-logo.webp",
      url: "https://guiadecorte.cl",
      alt: "Logo Guía de Corte - Guia de precisión para cortes rectos, carpintería, bricolage"
    }
  ];
  const allCompanies = [...companies, ...companies];
  const carouselRef = useRef(null);
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const pixelsPerSecond = 30;
    const carouselWidth = carousel.scrollWidth / 2;
    let lastTimestamp = null;
    let animationId;
    const animate = (timestamp) => {
      if (!carousel) return;
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        animationId = requestAnimationFrame(animate);
        return;
      }
      const elapsed = timestamp - lastTimestamp;
      const pixelsToMove = pixelsPerSecond * elapsed / 1e3;
      if (carousel.scrollLeft >= carouselWidth) {
        carousel.style.scrollBehavior = "auto";
        carousel.scrollLeft = 0;
      } else {
        carousel.style.scrollBehavior = "auto";
        carousel.scrollLeft += pixelsToMove;
      }
      lastTimestamp = timestamp;
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    const pauseAnimation = () => {
      cancelAnimationFrame(animationId);
    };
    const resumeAnimation = () => {
      lastTimestamp = null;
      animationId = requestAnimationFrame(animate);
    };
    carousel.addEventListener("mouseenter", pauseAnimation);
    carousel.addEventListener("mouseleave", resumeAnimation);
    carousel.addEventListener("touchstart", pauseAnimation);
    carousel.addEventListener("touchend", resumeAnimation);
    return () => {
      cancelAnimationFrame(animationId);
      carousel.removeEventListener("mouseenter", pauseAnimation);
      carousel.removeEventListener("mouseleave", resumeAnimation);
      carousel.removeEventListener("touchstart", pauseAnimation);
      carousel.removeEventListener("touchend", resumeAnimation);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: carouselRef,
      className: "flex items-center space-x-8 py-4 overflow-x-hidden",
      children: allCompanies.map((company, index) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: company.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "group flex-shrink-0 flex flex-col items-center",
          style: { minWidth: "180px" },
          children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white p-3 rounded-lg mb-2 transition-transform group-hover:scale-105", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: company.logo,
                alt: company.alt,
                className: "h-16 w-auto",
                onError: (e) => {
                  const target = e.target;
                  target.src = "/guia-imagenes/profix-126-logo.webp";
                }
              }
            ) }),
            /* @__PURE__ */ jsxs("span", { className: "text-gris-300 text-sm flex items-center group-hover:text-naranja-500", children: [
              company.name,
              " ",
              /* @__PURE__ */ jsx(ExternalLink, { className: "ml-1 h-3 w-3" })
            ] })
          ]
        },
        `${company.name}-${index}`
      ))
    }
  ) });
};
export {
  RelatedCompaniesCarousel as default
};
