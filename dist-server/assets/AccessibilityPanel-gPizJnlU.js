import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { c as cn, u as useAccessibility, B as Button } from "../entry-server.js";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { Accessibility, X, Eye, Type, MousePointerClick, BookOpen } from "lucide-react";
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
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    options,
    toggleHighContrast,
    toggleLargeText,
    toggleReduceMotion,
    toggleDyslexicFont,
    resetOptions
  } = useAccessibility();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => setIsOpen(true),
        className: "fixed bottom-24 right-4 z-50 rounded-full p-3 bg-naranja-600 hover:bg-naranja-700 shadow-lg",
        "aria-label": "Opciones de accesibilidad",
        title: "Opciones de accesibilidad",
        children: /* @__PURE__ */ jsx(Accessibility, { className: "h-6 w-6" })
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => setIsOpen(false),
          className: "absolute top-2 right-2 p-1 rounded-full",
          variant: "ghost",
          "aria-label": "Cerrar panel de accesibilidad",
          children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Opciones de accesibilidad" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Eye, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { children: "Alto contraste" })
          ] }),
          /* @__PURE__ */ jsx(
            Switch,
            {
              checked: options.highContrast,
              onCheckedChange: toggleHighContrast,
              "aria-label": "Activar alto contraste"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Type, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { children: "Texto grande" })
          ] }),
          /* @__PURE__ */ jsx(
            Switch,
            {
              checked: options.largeText,
              onCheckedChange: toggleLargeText,
              "aria-label": "Activar texto grande"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(MousePointerClick, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { children: "Reducir movimiento" })
          ] }),
          /* @__PURE__ */ jsx(
            Switch,
            {
              checked: options.reduceMotion,
              onCheckedChange: toggleReduceMotion,
              "aria-label": "Activar reducción de movimiento"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { children: "Fuente para dislexia" })
          ] }),
          /* @__PURE__ */ jsx(
            Switch,
            {
              checked: options.dyslexicFont,
              onCheckedChange: toggleDyslexicFont,
              "aria-label": "Activar fuente para dislexia"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: resetOptions,
            variant: "outline",
            className: "w-full",
            children: "Restablecer ajustes"
          }
        ) })
      ] })
    ] }) })
  ] });
};
export {
  AccessibilityPanel as default
};
