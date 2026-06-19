import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { c as cn, B as Button } from "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "react-helmet-async";
import "@radix-ui/react-slot";
import "@radix-ui/react-collapsible";
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      ),
      ...props
    }
  ) });
});
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const testimonials = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    profession: "Carpintero profesional",
    comment: "La guía de corte en su material de aluminio, ha revolucionado mi taller. Consigo cortes perfectos en la mitad de tiempo. Increíble precisión y facilidad de uso para todos mis proyectos profesionales.",
    rating: 5
  },
  {
    id: 2,
    name: "Ana Martínez",
    profession: "Diseñadora de interiores",
    comment: "Como diseñadora, necesito que mis contratistas trabajen con precisión. Les recomendé la guía ProFix 126 para la realizacion de cortes rectos y la diferencia en acabado y detalle ha sido notable en todos los proyectos.",
    rating: 5
  },
  {
    id: 3,
    name: "Roberto Gómez",
    profession: "Aficionado al bricolaje",
    comment: "Nunca había conseguido cortes tan perfectos como ahora con mi guía de corte ProFix 126. Es increíble lo que puedo crear en mi pequeño taller de casa con esta herramienta.",
    rating: 5
  },
  {
    id: 4,
    name: "María López",
    profession: "Restauradora de muebles",
    comment: "Para mi trabajo de restauración, la precisión es fundamental. La guía de corte ProFix 126 me permite replicar piezas antiguas con exactitud milimétrica. Una inversión que vale cada peso.",
    rating: 5
  },
  {
    id: 5,
    name: "Miguel Fernández",
    profession: "Fabricante de muebles",
    comment: "Tengo un taller pequeño y esta guía ha multiplicado mi productividad. Puedo hacer cortes que antes requerían máquinas mucho más caras. La recomiendo a todos mis colegas.",
    rating: 5
  },
  {
    id: 6,
    name: "Laura Sánchez",
    profession: "Docente de carpintería",
    comment: "Utilizo la guía de corte ProFix 126 en mis clases de carpintería. Los alumnos aprenden mucho más rápido y consiguen resultados profesionales desde el primer día. Una herramienta educativa fantástica.",
    rating: 5
  },
  {
    id: 7,
    name: "Pedro Alarcón",
    profession: "Contratista",
    comment: "Para instalaciones en obra, la guía de corte ProFix 126 nos ha permitido hacer ajustes perfectos sin tener que volver al taller. Ahorramos tiempo y el cliente queda más satisfecho con los acabados.",
    rating: 5
  },
  {
    id: 8,
    name: "Carmen Ortiz",
    profession: "Artesana",
    comment: "Mis proyectos artesanales han dado un salto de calidad desde que utilizo la guía de corte ProFix 126. Consigo precisión en materiales que antes me resultaban difíciles de trabajar.",
    rating: 5
  },
  {
    id: 9,
    name: "Javier Méndez",
    profession: "Constructor",
    comment: "He probado muchas guías de corte en mi carrera, pero ninguna tan versátil y precisa como ésta. La capacidad de ajuste rápido nos permite ser mucho más eficientes en obra y en cada proyecto que comienzo.",
    rating: 5
  },
  {
    id: 10,
    name: "Sofía Ramírez",
    profession: "Diseñadora de muebles",
    comment: "La precisión de la guía de corte ProFix 126 me permite materializar mis diseños exactamente como los concibo. Es una herramienta indispensable para cualquier persona creativa en carpintería.",
    rating: 5
  },
  {
    id: 11,
    name: "Antonio Vega",
    profession: "Técnico en escenografía",
    comment: "Para nuestros decorados teatrales, necesitamos precisión y rapidez. La guía de corte recto ProFix 126 nos permite cumplir plazos ajustados sin sacrificar la calidad del acabado final.",
    rating: 5
  },
  {
    id: 12,
    name: "Elena Torres",
    profession: "Propietaria de tienda de manualidades",
    comment: "Recomendamos la guía de corte recto ProFix 126 a todos nuestros clientes de bricolaje avanzado. Los comentarios siempre son positivos y vuelven a la tienda para contarnos sus proyectos exitosos.",
    rating: 5
  }
];
const getInitials = (name) => name.split(" ").filter(Boolean).slice(0, 2).map((part) => {
  var _a;
  return ((_a = part[0]) == null ? void 0 : _a.toUpperCase()) || "";
}).join("");
const StarRating = ({ rating }) => {
  return /* @__PURE__ */ jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
    "svg",
    {
      className: `w-4 h-4 ${i < rating ? "text-naranja-500" : "text-gris-300"}`,
      fill: "currentColor",
      viewBox: "0 0 20 20",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        }
      )
    },
    i
  )) });
};
const TestimonialsCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const handleSelect = () => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
  };
  return /* @__PURE__ */ jsx("div", { className: "py-16 bg-gris-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-4", children: "Lo que dicen nuestros clientes" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gris-600 max-w-2xl mx-auto", children: [
        "Descubre por qué carpinteros profesionales y aficionados al bricolaje confían en la Guía de Corte recto ",
        /* @__PURE__ */ jsx("span", { className: "text-black font-bold", children: "ProFix 126" }),
        " para sus proyectos de precisión."
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl px-8", children: /* @__PURE__ */ jsxs(
      Carousel,
      {
        setApi,
        className: "w-full",
        onSelect: handleSelect,
        opts: {
          loop: true,
          align: "start"
        },
        children: [
          /* @__PURE__ */ jsx(CarouselContent, { children: Array.isArray(testimonials) && testimonials.map((testimonial) => /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3 px-2", children: /* @__PURE__ */ jsx(Card, { className: "border-none shadow-md h-full", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6 flex flex-col h-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden mr-4", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-full h-full bg-madera-200 text-madera-800 flex items-center justify-center font-semibold",
                    "aria-label": `Iniciales de ${testimonial.name}`,
                    children: getInitials(testimonial.name)
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: testimonial.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-500", children: testimonial.profession })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Quote, { size: 18, className: "text-naranja-500 opacity-70" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gris-700 flex-grow mb-4", children: [
              '"',
              testimonial.comment,
              '"'
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsx(StarRating, { rating: testimonial.rating }) })
          ] }) }) }, testimonial.id)) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center mt-8 gap-2", children: [
            /* @__PURE__ */ jsx(CarouselPrevious, { className: "static translate-y-0 h-9 w-9" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gris-500", children: [
              current + 1,
              " / ",
              count || testimonials.length
            ] }),
            /* @__PURE__ */ jsx(CarouselNext, { className: "static translate-y-0 h-9 w-9" })
          ] })
        ]
      }
    ) })
  ] }) });
};
export {
  TestimonialsCarousel as default,
  testimonials
};
