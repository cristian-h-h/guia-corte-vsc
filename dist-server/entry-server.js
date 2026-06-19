import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { useLocation, Link, useParams, createMemoryRouter, RouterProvider, Navigate } from "react-router-dom";
import * as React from "react";
import { createContext, useState, useEffect, useContext, lazy, Suspense } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, MessageSquare, ShoppingCart, Menu, Phone, Mail, Minus, Plus, Check, ArrowRight, MapPin } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Slot } from "@radix-ui/react-slot";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const theme = "system";
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const CartContext = createContext(void 0);
const canUseBrowserStorage$1 = () => typeof globalThis !== "undefined" && typeof globalThis.localStorage !== "undefined";
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (!canUseBrowserStorage$1()) {
      return;
    }
    const savedCart = globalThis.localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  useEffect(() => {
    if (!canUseBrowserStorage$1()) {
      return;
    }
    globalThis.localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map(
          (i) => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const clearCart = () => {
    setCartItems([]);
  };
  const increaseQuantity = (id) => {
    setCartItems(
      (prevItems) => prevItems.map(
        (item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const decreaseQuantity = (id) => {
    setCartItems(
      (prevItems) => prevItems.map(
        (item) => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => !(item.id === id && item.quantity === 1))
    );
  };
  const getCartTotal = (paymentMethod = "cash") => {
    return cartItems.reduce((total, item) => {
      const itemPrice = paymentMethod === "card" && item.priceCard ? item.priceCard : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };
  return /* @__PURE__ */ jsx(
    CartContext.Provider,
    {
      value: {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        getCartTotal
      },
      children
    }
  );
};
const useCart = () => {
  const context = useContext(CartContext);
  if (context === void 0) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
const WhatsAppButton = ({
  phoneNumber = "56935777727",
  message = "Hola, estoy interesado en la Guía de Corte Ajustable. ¿Podrían darme más información?"
}) => {
  const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber.substring(1) : phoneNumber;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: whatsappUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-3 shadow-lg hover:bg-[#1da851] transition-colors flex items-center justify-center",
      "aria-label": "Contáctanos por WhatsApp",
      children: /* @__PURE__ */ jsx(MessageSquare, { className: "h-8 w-8" })
    }
  );
};
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
const defaultOptions = {
  highContrast: false,
  largeText: false,
  reduceMotion: false,
  dyslexicFont: false
};
const canUseBrowserStorage = () => typeof globalThis !== "undefined" && typeof globalThis.localStorage !== "undefined" && typeof document !== "undefined";
const AccessibilityContext = createContext(void 0);
const AccessibilityProvider = ({ children }) => {
  const [options, setOptions] = useState(() => {
    if (!canUseBrowserStorage()) {
      return defaultOptions;
    }
    try {
      const savedOptions = globalThis.localStorage.getItem("accessibility-options");
      return savedOptions ? JSON.parse(savedOptions) : defaultOptions;
    } catch {
      return defaultOptions;
    }
  });
  useEffect(() => {
    if (!canUseBrowserStorage()) {
      return;
    }
    globalThis.localStorage.setItem("accessibility-options", JSON.stringify(options));
    document.documentElement.classList.toggle("high-contrast", options.highContrast);
    document.documentElement.classList.toggle("large-text", options.largeText);
    document.documentElement.classList.toggle("reduce-motion", options.reduceMotion);
    document.documentElement.classList.toggle("dyslexic-font", options.dyslexicFont);
    if (options.reduceMotion) {
      document.documentElement.style.setProperty("--reduce-motion", "reduce");
    } else {
      document.documentElement.style.removeProperty("--reduce-motion");
    }
  }, [options]);
  const toggleHighContrast = () => {
    setOptions((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  };
  const toggleLargeText = () => {
    setOptions((prev) => ({ ...prev, largeText: !prev.largeText }));
  };
  const toggleReduceMotion = () => {
    setOptions((prev) => ({ ...prev, reduceMotion: !prev.reduceMotion }));
  };
  const toggleDyslexicFont = () => {
    setOptions((prev) => ({ ...prev, dyslexicFont: !prev.dyslexicFont }));
  };
  const resetOptions = () => {
    setOptions(defaultOptions);
  };
  return /* @__PURE__ */ jsx(
    AccessibilityContext.Provider,
    {
      value: {
        options,
        toggleHighContrast,
        toggleLargeText,
        toggleReduceMotion,
        toggleDyslexicFont,
        resetOptions
      },
      children
    }
  );
};
const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === void 0) {
    throw new Error("useAccessibility debe ser usado dentro de un AccessibilityProvider");
  }
  return context;
};
const SkipLink = () => {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: "#main-content",
      className: "skip-link",
      "aria-label": "Saltar al contenido principal",
      children: "Saltar al contenido principal"
    }
  );
};
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return /* @__PURE__ */ jsxs("nav", { className: "bg-gradient-to-r from-madera-200 to-madera-100 shadow-md z-50 border-b-4 border-herramienta-600", children: [
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-20", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center group", children: /* @__PURE__ */ jsxs("div", { className: "relative w-48 h-16 flex items-center", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/guia-imagenes/profix-126-logo.webp",
            alt: "Logo Guía de corte ProFix 126 - Guía banco sierra profesional",
            className: "h-16 w-auto rounded-lg shadow-lg transition duration-300 group-hover:shadow-naranja-500/70 group-hover:scale-110",
            style: {
              boxShadow: "0 0 32px 8px rgba(255, 115, 0, 0.7), 0 0 64px 16px rgba(255, 115, 0, 0.35)",
              transition: "box-shadow 0.3s, transform 0.3s"
            }
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-lg pointer-events-none animate-glow group-hover:opacity-100 opacity-60" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-8", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "text-madera-600 hover:text-herramienta-600 font-medium transition-colors text-lg hover:scale-105 transform duration-200", children: "Inicio" }),
        /* @__PURE__ */ jsx(Link, { to: "/producto/profix-126", className: "text-madera-600 hover:text-herramienta-600 font-medium transition-colors text-lg hover:scale-105 transform duration-200", children: "Producto" }),
        /* @__PURE__ */ jsx(Link, { to: "/galeria", className: "text-madera-600 hover:text-herramienta-600 font-medium transition-colors text-lg hover:scale-105 transform duration-200", children: "Galería" }),
        /* @__PURE__ */ jsx(Link, { to: "/blog", className: "text-madera-600 hover:text-herramienta-600 font-medium transition-colors text-lg hover:scale-105 transform duration-200", children: "Blog" }),
        /* @__PURE__ */ jsx(Link, { to: "/guias", className: "text-madera-600 hover:text-herramienta-600 font-medium transition-colors text-lg hover:scale-105 transform duration-200", children: "Guias" }),
        /* @__PURE__ */ jsx(Link, { to: "/contacto", className: "text-madera-600 hover:text-herramienta-600 font-medium transition-colors text-lg hover:scale-105 transform duration-200", children: "Contacto" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center", children: /* @__PURE__ */ jsxs(Link, { to: "/carrito", className: "relative p-2", children: [
        /* @__PURE__ */ jsx(ShoppingCart, { className: "h-6 w-6 text-herramienta-400 hover:text-herramienta-600 transition-colors" }),
        cartItems.length > 0 && /* @__PURE__ */ jsx("span", { className: "absolute top-0 right-0 bg-taller-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse", children: cartItems.length > 99 ? "99+" : cartItems.length })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex md:hidden items-center gap-4", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/carrito", className: "relative p-2", children: [
          /* @__PURE__ */ jsx(ShoppingCart, { className: "h-6 w-6 text-gris-800" }),
          cartItems.length > 0 && /* @__PURE__ */ jsx("span", { className: "absolute top-0 right-0 bg-naranja-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full", children: cartItems.length > 99 ? "99+" : cartItems.length })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: toggleMenu, className: "text-gris-800", "aria-label": "Abrir menú de navegación", children: isOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 }) })
      ] })
    ] }) }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-white py-4 animate-slide-in", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4 px-4", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "text-gris-800 hover:text-naranja-600 py-2 text-center font-medium",
          onClick: toggleMenu,
          children: "Inicio"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/producto",
          className: "text-gris-800 hover:text-naranja-600 py-2 text-center font-medium",
          onClick: toggleMenu,
          children: "Producto"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/galeria",
          className: "text-gris-800 hover:text-naranja-600 py-2 text-center font-medium",
          onClick: toggleMenu,
          children: "Galería"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/blog",
          className: "text-gris-800 hover:text-naranja-600 py-2 text-center font-medium",
          onClick: toggleMenu,
          children: "Blog"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/contacto",
          className: "text-gris-800 hover:text-naranja-600 py-2 text-center font-medium",
          onClick: toggleMenu,
          children: "Contacto"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/guias",
          className: "text-gris-800 hover:text-naranja-600 py-2 text-center font-medium",
          onClick: toggleMenu,
          children: "Guias"
        }
      )
    ] }) })
  ] });
};
const RelatedCompaniesCarousel = lazy(() => import("./assets/RelatedCompaniesCarousel-CbNBhHKy.js"));
const relatedCompaniesFallback = /* @__PURE__ */ jsx("div", { className: "text-center text-gris-400", children: "Cargando empresas relacionadas..." });
const Footer = ({ renderRelatedCompanies = true }) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const phoneNumber = "+56935777727";
  const formattedPhone = "+569 3577 7727";
  const whatsappMessage = encodeURIComponent("Hola, estoy interesado en la Guía de Corte Ajustable. ¿Podrían darme más información?");
  return /* @__PURE__ */ jsx("footer", { className: "bg-gradient-to-b from-madera-700 to-madera-900 text-white pt-12 pb-6 border-t-4 border-herramienta-600", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 bg-white p-2 inline-block rounded-md", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/guia-imagenes/profix-126-logo.webp",
            alt: "Logo Guía de corte ProFix 126 - Guía banco sierra profesional de aluminio",
            className: "h-20"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-gris-300 mb-4", children: "Herramienta de caracterisiticas profesionales para uso de carpinteros, mueblistas y aficionados que gusten de trabajos y proyectos en todo tipo de materiales con herramientas manuales y electricas. La unica que no requiere de kit y accesorios, compatible con herramientas: Makita - Milwaukee - Bosch DeWalt - Stanley - Skill - Ubermann - Ingco - Einhell, etc." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 mt-4", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-white hover:text-naranja-500", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-white hover:text-naranja-500", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z", clipRule: "evenodd" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Enlaces" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-madera-200 hover:text-herramienta-800 transition-colors hover:underline", children: "Inicio" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/producto/profix-126", className: "text-madera-200 hover:text-herramienta-800 transition-colors hover:underline", children: "Producto" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/galeria", className: "text-madera-200 hover:text-herramienta-800 transition-colors hover:underline", children: "Galería" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog", className: "text-madera-200 hover:text-herramienta-800 transition-colors hover:underline", children: "Blog" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/guias", className: "text-madera-200 hover:text-herramienta-800 transition-colors hover:underline", children: "Guias" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contacto", className: "text-madera-200 hover:text-herramienta-800 transition-colors hover:underline", children: "Contacto" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Contacto" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 mr-2 text-naranja-500" }),
            /* @__PURE__ */ jsx("a", { href: `tel:${phoneNumber}`, className: "text-gris-300 hover:text-naranja-500 transition-colors", children: formattedPhone })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(MessageSquare, { className: "h-5 w-5 mr-2 text-naranja-500" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: `https://wa.me/${phoneNumber}?text=${whatsappMessage}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-gris-300 hover:text-naranja-500 transition-colors",
                children: [
                  "WhatsApp: ",
                  formattedPhone
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 mr-2 text-naranja-500" }),
            /* @__PURE__ */ jsx("a", { href: "mailto:ventas@terciamel.cl", className: "text-gris-300 hover:text-naranja-500 transition-colors", children: "ventas@terciamel.cl" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-gris-800 mt-8 pt-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-6 text-center", children: "Empresas Relacionadas" }),
      renderRelatedCompanies ? /* @__PURE__ */ jsx(Suspense, { fallback: relatedCompaniesFallback, children: /* @__PURE__ */ jsx(RelatedCompaniesCarousel, {}) }) : relatedCompaniesFallback
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gris-800 mt-8 pt-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gris-400", children: [
      "© ",
      /* @__PURE__ */ jsx(Link, { to: "/admin", className: "hover:text-naranja-500 transition-colors", children: currentYear }),
      " GuiaDeCorte.cl - Todos los derechos reservados"
    ] }) })
  ] }) });
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
const faqData = [
  {
    question: "¿La ProFix 126 sirve como guía de corte para sierra circular?",
    answer: "Si. Ese es su uso principal recomendado. La ProFix 126 esta pensada como guia de corte recto para sierra circular en tableros, muebles y piezas largas donde importa mantener una referencia estable."
  },
  {
    question: "¿De qué material es la guía de corte?",
    answer: "La ProFix 126 combina aluminio de alta resistencia con componentes tecnicos que ayudan a mantener rigidez, portabilidad y mejor estabilidad al trabajar como guia de aluminio para sierra circular."
  },
  {
    question: "¿Sirve para melamina, MDF, terciado y madera?",
    answer: "Si. Son justamente algunos de los materiales donde mas se nota la diferencia entre una referencia improvisada y una guia recta estable, sobre todo cuando debes repetir piezas o cuidar terminacion."
  },
  {
    question: "¿Es compatible con Ubermann, Makita, Bosch o DeWalt?",
    answer: "Puede ser compatible con muchas marcas, pero la validacion responsable depende de la base, el apoyo y el modelo exacto. Si tienes dudas, conviene consultar antes de comprar y enviar foto o modelo de tu herramienta."
  },
  {
    question: "¿Me pueden enviar el link directo de compra?",
    answer: "Si. Puedes pedir el link directo por WhatsApp o entrar a la ficha de producto y comprar de inmediato. Esa ruta ayuda mucho a quien llega con intencion alta y solo quiere avanzar rapido."
  },
  {
    question: "¿Hacen envíos a domicilio?",
    answer: "Se realizan envios a domicilio tanto en Region Metropolitana como a cualquier region de Chile. Se utiliza Starken o Bluexpress y puedes recibir en tu domicilio o retirar en agencia segun disponibilidad."
  }
];
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
const FAQItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    Collapsible,
    {
      open: isOpen,
      onOpenChange: setIsOpen,
      className: "border border-gris-200 rounded-lg mb-4 overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-gris-50 transition-colors", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gris-900", children: item.question }),
          isOpen ? /* @__PURE__ */ jsx(Minus, { className: "h-5 w-5 text-naranja-600 flex-shrink-0" }) : /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5 text-naranja-600 flex-shrink-0" })
        ] }),
        /* @__PURE__ */ jsx(CollapsibleContent, { children: /* @__PURE__ */ jsx("div", { className: "px-6 py-4 bg-gris-50", children: /* @__PURE__ */ jsx("p", { className: "text-gris-700", children: item.answer }) }) })
      ]
    }
  );
};
const FAQ = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(faqSchema) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-4", children: "Preguntas Frecuentes" }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-gris-600 max-w-2xl mx-auto mb-12", children: [
        "Respuestas a las dudas mas comunes sobre nuestra guia de corte recto ",
        /* @__PURE__ */ jsx("span", { className: "text-black font-bold", children: "ProFix 126" }),
        ", especialmente para quienes buscan una guia de corte para sierra circular, una guia de aluminio o compatibilidad por marca."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: faqData.map((item, index) => /* @__PURE__ */ jsx(FAQItem, { item }, index)) })
    ] }) })
  ] });
};
const BASE_URL = "https://www.guiadecorte.cl";
const DEFAULT_SOCIAL_IMAGE = `${BASE_URL}/social/profix-126-share.jpg`;
const DEFAULT_APP_ICON = `${BASE_URL}/icons/apple-touch-icon.png`;
const stripQueryParams = (value) => value.split("?")[0];
const toAbsoluteUrl = (value) => {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  return value.startsWith("/") ? `${BASE_URL}${value}` : `${BASE_URL}/${value}`;
};
const isSocialFriendlyImage = (value) => /\.(png|jpe?g)$/i.test(stripQueryParams(value));
const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  schema,
  author = "GuiaDeCorte.cl",
  publishedTime,
  modifiedTime,
  locale = "es_CL",
  alternateLocales = ["es_ES", "es_MX"],
  category,
  tags,
  videoUrl,
  children
}) => {
  const defaultTitle = "Guía de Corte Recto ProFix 126 para Sierra Circular | Guía de Aluminio para Cortes con Herramientas Eléctricas";
  const defaultDescription = "Guía de corte recto ProFix 126 para sierra circular. Guía de aluminio para cortes sierra circular compatible con herramientas eléctricas e inalámbricas. Guía para realizar cortes con sierra circular hasta 1,26 metros. Ideal como guía de corte banco de sierra.";
  const defaultKeywords = "guia de corte recto, guia de corte, guía de corte, guia corte, guía de corte recto para sierra circular, guia aluminio para cortes sierra circular, guia de corte banco de sierra, guia banco sierra, guia de corte con herramientas electricas, guia de corte para herramientas inalambricas, guia para realizar cortes con sierra circular, sierra circular, router, carpintería, bricolaje, herramientas precisión, cortes madera, profix 126, guía aluminio, corte recto preciso";
  const defaultUrl = BASE_URL;
  const metaTitle = title ? `${title} | GuiaDeCorte.cl` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaUrl = url ? toAbsoluteUrl(url) : defaultUrl;
  const requestedImage = image ? toAbsoluteUrl(image) : DEFAULT_SOCIAL_IMAGE;
  const metaImage = isSocialFriendlyImage(requestedImage) ? requestedImage : DEFAULT_SOCIAL_IMAGE;
  const usesDefaultSocialImage = metaImage === DEFAULT_SOCIAL_IMAGE;
  const isArticle = type === "article";
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("html", { lang: "es" }),
    /* @__PURE__ */ jsx("title", { children: metaTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { name: "keywords", content: metaKeywords }),
    /* @__PURE__ */ jsx("meta", { name: "author", content: author }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }),
    /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
    /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#FF6600" }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: metaUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: metaUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: metaTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: metaImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:secure_url", content: metaImage }),
    usesDefaultSocialImage && /* @__PURE__ */ jsx("meta", { property: "og:image:type", content: "image/jpeg" }),
    usesDefaultSocialImage && /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
    usesDefaultSocialImage && /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: metaTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "GuiaDeCorte.cl" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: locale }),
    alternateLocales.map((altLocale) => /* @__PURE__ */ jsx("meta", { property: "og:locale:alternate", content: altLocale }, altLocale)),
    isArticle && publishedTime && /* @__PURE__ */ jsx("meta", { property: "article:published_time", content: publishedTime }),
    isArticle && modifiedTime && /* @__PURE__ */ jsx("meta", { property: "article:modified_time", content: modifiedTime }),
    isArticle && category && /* @__PURE__ */ jsx("meta", { property: "article:section", content: category }),
    isArticle && tags && tags.length > 0 && tags.map((tag) => /* @__PURE__ */ jsx("meta", { property: "article:tag", content: tag }, tag)),
    isArticle && author && /* @__PURE__ */ jsx("meta", { property: "article:author", content: author }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: metaUrl }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: metaTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: metaImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image:alt", content: metaTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:creator", content: "@guiadecorte" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: "@guiadecorte" }),
    videoUrl && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("meta", { property: "og:video", content: videoUrl }),
      /* @__PURE__ */ jsx("meta", { property: "og:video:secure_url", content: videoUrl }),
      /* @__PURE__ */ jsx("meta", { property: "og:video:type", content: "video/mp4" }),
      /* @__PURE__ */ jsx("meta", { property: "og:video:width", content: "1280" }),
      /* @__PURE__ */ jsx("meta", { property: "og:video:height", content: "720" })
    ] }),
    schema && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("meta", { name: "apple-mobile-web-app-capable", content: "yes" }),
    /* @__PURE__ */ jsx("meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }),
    /* @__PURE__ */ jsx("meta", { name: "apple-mobile-web-app-title", content: "GuiaDeCorte" }),
    /* @__PURE__ */ jsx("link", { rel: "manifest", href: "/manifest.json" }),
    /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.ico", sizes: "any" }),
    /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", sizes: "192x192", href: "/icons/icon-192x192.png" }),
    /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-touch-icon.png" }),
    /* @__PURE__ */ jsx("meta", { name: "msapplication-TileImage", content: DEFAULT_APP_ICON }),
    /* @__PURE__ */ jsx("meta", { name: "msapplication-TileColor", content: "#FF6600" }),
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
    children
  ] });
};
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.guiadecorte.cl/#organization",
  "name": "GuiaDeCorte.cl",
  "url": "https://www.guiadecorte.cl",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.guiadecorte.cl/icons/apple-touch-icon.png",
    "width": 180,
    "height": 180
  },
  "sameAs": [
    "https://www.facebook.com/guiadecorte",
    "https://www.instagram.com/guiadecorte"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+56935777727",
    "contactType": "customer service",
    "areaServed": "CL",
    "availableLanguage": "Spanish"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CL",
    "addressRegion": "Región Metropolitana",
    "addressLocality": "Santiago"
  }
};
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.guiadecorte.cl/#website",
  "url": "https://www.guiadecorte.cl",
  "name": "GuiaDeCorte.cl",
  "description": "Guía de corte profesional para carpintería y bricolaje",
  "publisher": {
    "@id": "https://www.guiadecorte.cl/#organization"
  }
};
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.guiadecorte.cl/producto/profix-126#product",
  "name": "Guía de Corte ProFix 126",
  "image": [
    "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
    "https://www.guiadecorte.cl/guia-imagenes/corte-sierra-circular-profix-126.webp",
    "https://www.guiadecorte.cl/guia-imagenes/ajuste-recto-profix-126.webp"
  ],
  "description": "Guía de corte profesional para carpintería y mueblería. Pensada para sierra circular y herramientas de base compatible en trabajos rectos de hasta 1.26 metros.",
  "sku": "PROFIX-126",
  "mpn": "PROFIX-126",
  "brand": {
    "@type": "Brand",
    "name": "ProFix"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "GuiaDeCorte.cl"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.guiadecorte.cl/producto/profix-126",
    "priceCurrency": "CLP",
    "price": "35000",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@id": "https://www.guiadecorte.cl/#organization"
    }
  }
};
const Index = () => {
  const topSearchPhrases = [
    "guia de corte recto para sierra circular",
    "guia de corte para sierra circular",
    "guia de aluminio para sierra circular",
    "guia recta para sierra circular",
    "guia corte madera",
    "guia de corte Ubermann"
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Guía de Corte Recto ProFix 126 para Sierra Circular | Guía de Aluminio para Cortes Rectos",
        description: "Guía de corte recto ProFix 126 para sierra circular. Guía de aluminio para cortar melamina, MDF, terciado y madera con más precisión, repetición y control en taller u obra.",
        keywords: "guia de corte recto, guia de corte para sierra circular, guia de aluminio para sierra circular, guia recta para sierra circular, guia corte sierra circular, guia corte madera, guia de corte Ubermann, guia de corte Makita, guia de corte Bosch, guia de corte DeWalt, melamina, MDF, terciado, profix 126",
        image: "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
        url: "https://www.guiadecorte.cl/",
        schema: [organizationSchema, websiteSchema, productSchema, {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Cómo usar la Guía de Corte ProFix 126",
          "description": "Guía paso a paso para utilizar correctamente la Guía de Corte ProFix 126",
          "image": "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp",
          "totalTime": "PT5M",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "CLP",
            "value": "35000"
          },
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Guía de Corte ProFix 126"
            },
            {
              "@type": "HowToSupply",
              "name": "Sierra circular, router o caladora"
            },
            {
              "@type": "HowToSupply",
              "name": "Material a cortar (madera, melamina, etc.)"
            }
          ],
          "tool": [
            {
              "@type": "HowToTool",
              "name": "Sierra circular"
            },
            {
              "@type": "HowToTool",
              "name": "Router"
            },
            {
              "@type": "HowToTool",
              "name": "Caladora"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Ajustar la guía",
              "text": "Coloca la guía sobre tu material y ajústala a la medida deseada con el sistema de bloqueo rápido.",
              "image": "https://www.guiadecorte.cl/guia-imagenes/ajuste-recto-profix-126.webp",
              "url": "https://www.guiadecorte.cl/galeria#ajuste"
            },
            {
              "@type": "HowToStep",
              "name": "Fijar la guía",
              "text": "Asegura la guía al material con las pinzas de sujeción integradas para un agarre firme.",
              "image": "https://www.guiadecorte.cl/guia-imagenes/corte-sierra-circular-profix-126.webp",
              "url": "https://www.guiadecorte.cl/galeria#fijacion"
            },
            {
              "@type": "HowToStep",
              "name": "Realizar el corte",
              "text": "Utiliza tu herramienta deslizándola a lo largo de la guía para conseguir un corte perfecto.",
              "image": "https://www.guiadecorte.cl/guia-imagenes/guia-profix-126.webp",
              "url": "https://www.guiadecorte.cl/galeria#corte"
            }
          ]
        }]
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-gradient-to-b from-madera-200 to-madera-100 py-16 md:py-24 border-b-4 border-herramienta-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 opacity-20", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-40 h-40 rounded-full bg-herramienta-600 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 right-10 w-60 h-60 rounded-full bg-taller-600 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-madera-500 blur-3xl opacity-30" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 opacity-10 pattern-tools" }),
      /* @__PURE__ */ jsxs("div", { className: "container relative z-10 mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 md:pr-8", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-block bg-herramienta-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse shadow-lg", children: "Precisión Profesional para Carpinteros" }),
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold text-madera-800 leading-tight", children: [
              /* @__PURE__ */ jsx("span", { style: { fontFamily: "AmbiguityInline" }, children: "Guía de Corte Recto" }),
              " ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-herramienta-600 drop-shadow-md", children: "ProFix 126" }),
              /* @__PURE__ */ jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-taller-700 to-taller-600", children: " para Sierra Circular" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-madera-700 text-lg md:text-xl font-medium", children: [
                "La ",
                /* @__PURE__ */ jsx("strong", { children: "ProFix 126" }),
                " es una guia de corte recto para sierra circular pensada para quienes buscan cortes limpios, repetibles y con mejor control al trabajar melamina, MDF, terciado y madera en taller, instalacion u obra."
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: topSearchPhrases.map((phrase) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-madera-800 shadow-sm",
                  children: phrase
                },
                phrase
              )) }),
              /* @__PURE__ */ jsxs("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center text-madera-800 bg-madera-100 p-2 rounded-lg shadow-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-herramienta-600 p-1 rounded-full mr-2 shadow-md", children: /* @__PURE__ */ jsx(Check, { size: 16, className: "text-white" }) }),
                  "Precisión milimétrica certificada"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center text-madera-800 bg-madera-100 p-2 rounded-lg shadow-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-herramienta-600 p-1 rounded-full mr-2 shadow-md", children: /* @__PURE__ */ jsx(Check, { size: 16, className: "text-white" }) }),
                  "Compatible con múltiples marcas según base"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center text-madera-800 bg-madera-100 p-2 rounded-lg shadow-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-herramienta-600 p-1 rounded-full mr-2 shadow-md", children: /* @__PURE__ */ jsx(Check, { size: 16, className: "text-white" }) }),
                  "Aluminio aeronáutico 6061-T6"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center text-madera-800 bg-madera-100 p-2 rounded-lg shadow-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-herramienta-600 p-1 rounded-full mr-2 shadow-md", children: /* @__PURE__ */ jsx(Check, { size: 16, className: "text-white" }) }),
                  "Hasta 1.26 metros de longitud"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-4", children: [
              /* @__PURE__ */ jsx(Link, { to: "/producto/profix-126", children: /* @__PURE__ */ jsxs(Button, { className: "bg-herramienta-600 hover:bg-herramienta-700 text-white flex items-center gap-2 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white", children: [
                "Ver producto ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
              ] }) }),
              /* @__PURE__ */ jsx(Link, { to: "/contacto", children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "border-2 border-taller-600 text-taller-700 hover:bg-taller-100 text-lg px-8 py-6 rounded-xl shadow-md hover:shadow-lg", children: "Contactar" }) }),
              /* @__PURE__ */ jsx(Link, { to: "/guias/compatibilidad-por-marcas-frecuentes", children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "border-2 border-herramienta-600 text-herramienta-700 hover:bg-herramienta-100 text-lg px-8 py-6 rounded-xl shadow-md hover:shadow-lg", children: "Ver compatibilidad por marcas" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center bg-madera-100 p-3 rounded-lg shadow-inner", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex -space-x-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-taller-800 flex items-center justify-center text-taller-100 text-xs shadow-md", children: "★" }),
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-taller-800 flex items-center justify-center text-taller-100 text-xs shadow-md", children: "★" }),
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-taller-800 flex items-center justify-center text-taller-100 text-xs shadow-md", children: "★" }),
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-taller-800 flex items-center justify-center text-taller-100 text-xs shadow-md", children: "★" }),
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-taller-800 flex items-center justify-center text-taller-100 text-xs shadow-md", children: "★" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "ml-3 text-madera-800 font-medium", children: "Elegida por carpinteros, mueblistas y usuarios que buscan más precisión en cada corte" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/2 mt-8 md:mt-0", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/guia-imagenes/guia-corte-profix-126.webp",
                  alt: "Guía de corte ProFix 126 - Guía banco sierra de aluminio para corte recto con sierra circular",
                  loading: "lazy",
                  className: "w-full h-auto rounded-lg"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 bg-taller-800 text-white px-4 py-2 rounded-full font-bold shadow-lg transform rotate-12 border-2 border-white", children: "$35.000 efectivo" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-herramienta-600 text-white px-8 py-3 rounded-full font-bold shadow-lg z-20 text-lg border-2 border-white", children: "Más control en cada corte" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -right-4 top-1/4 w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg z-20 transform rotate-6", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/guia-imagenes/corte-sierra-circular-profix-126.webp",
                alt: "Guía de corte recto para sierra circular - Uso de guía banco sierra ProFix 126",
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute -left-4 bottom-1/4 w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg z-20 transform -rotate-6", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/guia-imagenes/ajuste-recto-profix-126.webp",
                alt: "Guía de corte ProFix 126 - Sistema de ajuste rápido de guía banco sierra",
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-30 animate-shine" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-8 border-t border-gris-200", children: [
          /* @__PURE__ */ jsx("p", { className: "text-center text-gris-500 mb-4", children: "Compatible con múltiples marcas y modelos de base similar:" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center items-center gap-6 opacity-70", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gris-700 font-bold", children: "DeWalt" }),
            /* @__PURE__ */ jsx("span", { className: "text-gris-700 font-bold", children: "Makita" }),
            /* @__PURE__ */ jsx("span", { className: "text-gris-700 font-bold", children: "Bosch" }),
            /* @__PURE__ */ jsx("span", { className: "text-gris-700 font-bold", children: "Milwaukee" }),
            /* @__PURE__ */ jsx("span", { className: "text-gris-700 font-bold", children: "Stanley" }),
            /* @__PURE__ */ jsx("span", { className: "text-gris-700 font-bold", children: "Skill" }),
            /* @__PURE__ */ jsx("span", { className: "text-gris-700 font-bold", children: "Einhell" }),
            /* @__PURE__ */ jsx("span", { className: "text-gris-700 font-bold", children: "Ubermann" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-center mt-5", children: /* @__PURE__ */ jsx(Link, { to: "/guias/compatibilidad-por-marcas-frecuentes", className: "text-herramienta-700 font-semibold hover:text-herramienta-800", children: "Revisa compatibilidad por marcas frecuentes" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl md:text-3xl font-bold mb-2 text-gris-900", children: [
        "Guía de Corte Recto ",
        /* @__PURE__ */ jsx("span", { className: "text-naranja-600", children: "ProFix 126" }),
        " para Sierra Circular:"
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-semibold mb-4 text-gris-800", children: "Guía de Aluminio para Cortes con Herramientas Eléctricas e Inalámbricas" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gris-700 mb-4", children: [
        "La ",
        /* @__PURE__ */ jsx("strong", { children: "ProFix 126" }),
        " es una guía de corte recto de ",
        /* @__PURE__ */ jsx("strong", { children: "1.26 metros" }),
        " creada para personas que trabajan melamina, MDF, terciado y madera en general con ",
        /* @__PURE__ */ jsx("strong", { children: "sierra circular" }),
        " como uso principal. Tambien puede acompañar trabajos con ",
        /* @__PURE__ */ jsx("strong", { children: "router o fresadora" }),
        " cuando la base de la herramienta es compatible. Su objetivo es simple: ayudarte a repetir medidas, mejorar la terminación y reducir desperdicio en cortes largos."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 my-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gris-50 border border-gris-200 rounded-lg p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", children: "Si buscas una guia de corte para sierra circular" }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-700 text-sm", children: "Aqui aterrizas en el uso principal de la ProFix 126: guiar cortes rectos, largos y repetibles sin depender de soluciones improvisadas o maquinas grandes." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gris-50 border border-gris-200 rounded-lg p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", children: "Si comparas una guia de aluminio" }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-700 text-sm", children: "El cuerpo en aluminio 6061-T6 aporta rigidez, portabilidad y mejor estabilidad para trabajar tableros, muebles y piezas largas con una referencia mas confiable." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gris-50 border border-gris-200 rounded-lg p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", children: "Si necesitas confirmar compatibilidad" }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-700 text-sm", children: "Muchas visitas llegan buscando Makita, Bosch, DeWalt o Ubermann. Por eso la web hoy comunica compatibilidad responsable por marca, base y tipo de trabajo." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold mt-6 mb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-naranja-600", children: "Especificaciones" }),
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-gris-900", children: "Técnicas Clave:" })
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 text-gris-700 mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: "Estructura en aluminio aeronáutico 6061-T6 (resistencia a flexiones y vibraciones)." }),
        /* @__PURE__ */ jsx("li", { children: "Sistema de ajuste rápido para preparar medidas de trabajo con mayor agilidad." }),
        /* @__PURE__ */ jsx("li", { children: "Escala métrica e imperial con nonio para ajustes finos (precisión 0.1 mm)." }),
        /* @__PURE__ */ jsx("li", { children: "Peso optimizado: 1.4 kg con diseño para fácil transporte." }),
        /* @__PURE__ */ jsx("li", { children: "Zonas de sujecion confeccionado en material antideslizante que impide el movimiento." })
      ] }),
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold mt-6 mb-2", children: [
        "Beneficios ",
        /* @__PURE__ */ jsx("span", { className: "text-naranja-600", children: "Exclusivos" }),
        " para Profesionales:"
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 text-gris-700 mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: "✔ Ahorro de hasta 40% en tiempo por proyecto al eliminar mediciones manuales" }),
        /* @__PURE__ */ jsx("li", { children: "✔ Reducción de desperdicio de material gracias a cortes precisos en primera pasada" }),
        /* @__PURE__ */ jsx("li", { children: "✔ Mejor control del corte en piezas largas y tableros de mueblería" }),
        /* @__PURE__ */ jsx("li", { children: "✔ Estabilidad superior incluso en cortes de materiales densos (maderas duras, MDF, melamina)" })
      ] }),
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold mt-6 mb-2", children: [
        "Ventajas para ",
        /* @__PURE__ */ jsx("span", { className: "text-naranja-600", children: "Hobbistas" }),
        " Avanzados:"
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 text-gris-700 mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: "✓ Preparación rápida para trabajos domésticos y de taller" }),
        /* @__PURE__ */ jsx("li", { children: "✓ Resultados profesionales en proyectos domésticos" }),
        /* @__PURE__ */ jsx("li", { children: "✓ Mejor repetibilidad cuando necesitas varias piezas iguales" })
      ] }),
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold mt-6 mb-2", children: [
        "¿Por qué Elegir la ",
        /* @__PURE__ */ jsx("span", { className: "text-naranja-600", children: "ProFix 126" }),
        "?"
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 text-gris-700 mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: "Te entrega un formato de trabajo largo y portable para taller u obra." }),
        /* @__PURE__ */ jsx("li", { children: "Prioriza sierra circular y herramientas de base compatible, sin vender compatibilidades dudosas." }),
        /* @__PURE__ */ jsx("li", { children: "Ayuda a trabajar con más confianza cuando necesitas cortes rectos repetibles y mejor terminación." })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gris-700 mb-6", children: [
        "Optimiza tu flujo de trabajo, eleva tus estándares de calidad y transforma cada proyecto con la ",
        /* @__PURE__ */ jsx("strong", { children: "Guía de Corte ProFix 126" }),
        /* @__PURE__ */ jsx("br", {}),
        "– donde la ingeniería de precisión se encuentra con la artesanía en madera."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-12 my-8", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://youtube.com/shorts/shIy8jqR0tE?feature=share",
            className: "inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition text-center",
            target: "_blank",
            rel: "noopener noreferrer",
            children: [
              "Video 1 demostrativo ",
              /* @__PURE__ */ jsx("span", { className: "text-gris-900", children: "Profix 126" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://youtube.com/shorts/UHUVFCgoRSc?feature=share",
            className: "inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition text-center",
            target: "_blank",
            rel: "noopener noreferrer",
            children: [
              "Video 2 demostrativo ",
              /* @__PURE__ */ jsx("span", { className: "text-gris-900", children: "Profix 126" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://youtube.com/shorts/JDyfjvraM2I?feature=share",
            className: "inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition text-center",
            target: "_blank",
            rel: "noopener noreferrer",
            children: [
              "Video 3 demostrativo ",
              /* @__PURE__ */ jsx("span", { className: "text-gris-900", children: "Profix 126" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-10", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/guias/cortes-en-melamina-mdf-terciado", className: "bg-gris-50 border border-gris-200 rounded-lg p-5 hover:border-herramienta-600 transition-colors", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", children: "Trabajas melamina, MDF o terciado?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-700 text-sm", children: "Mira cuando una guia recta realmente ayuda a cortar tableros con mejor repeticion y menos error." })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/guias/profix-126-vs-regla-casera", className: "bg-gris-50 border border-gris-200 rounded-lg p-5 hover:border-herramienta-600 transition-colors", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", children: "Sigues usando una regla casera?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-700 text-sm", children: "Compara cuando una guia dedicada ya marca diferencia real en flujo, precision y desperdicio." })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/guias/compatibilidad-por-modelo-de-herramienta", className: "bg-gris-50 border border-gris-200 rounded-lg p-5 hover:border-herramienta-600 transition-colors", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", children: "Tienes una marca o modelo especifico?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-700 text-sm", children: "Revisa que datos conviene validar antes de comprar para confirmar compatibilidad responsable." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gradient-to-r from-madera-100 to-madera-200", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-6 text-madera-800", children: "Características Principales de la Guía de Corte ProFix 126" }),
      /* @__PURE__ */ jsx("div", { className: "w-24 h-2 bg-herramienta-600 mx-auto mb-16 rounded-full" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "feature-card group", children: [
          /* @__PURE__ */ jsx("div", { className: "feature-icon", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "feature-title", children: "Ajuste Rápido" }),
          /* @__PURE__ */ jsx("p", { className: "feature-text", children: "Sistema de bloqueo instantáneo que permite ajustes precisos en segundos, sin necesidad de herramientas adicionales." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "feature-card group", children: [
          /* @__PURE__ */ jsx("div", { className: "feature-icon", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "feature-title", children: "Guía de Corte con Herramientas Eléctricas" }),
          /* @__PURE__ */ jsx("p", { className: "feature-text", children: "Diseñada principalmente para sierra circular y también utilizable con router o fresadora cuando la base de la herramienta es compatible con el sistema." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "feature-card group", children: [
          /* @__PURE__ */ jsx("div", { className: "feature-icon", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "feature-title", children: "Calidad Profesional" }),
          /* @__PURE__ */ jsx("p", { className: "feature-text", children: "Fabricada en aluminio de alta resistencia, garantiza durabilidad y precisión en cada uso." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "feature-card group", children: [
          /* @__PURE__ */ jsx("div", { className: "feature-icon", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "feature-title", children: "Longitud Extendida" }),
          /* @__PURE__ */ jsx("p", { className: "feature-text", children: "Con una capacidad de corte de hasta 1,26 metros, ideal para trabajos en tableros grandes y piezas extensas." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "feature-card group", children: [
          /* @__PURE__ */ jsx("div", { className: "feature-icon", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 20h5v-2a3 3 0 100 4m0 4a3 3 0 015.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "feature-title", children: "Doble Función" }),
          /* @__PURE__ */ jsx("p", { className: "feature-text", children: "No solo sirve como guía de corte, sino también como prensa para armado de muebles. Dos herramientas en una." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "feature-card group", children: [
          /* @__PURE__ */ jsx("div", { className: "feature-icon", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "feature-title", children: "Ahorro de Tiempo" }),
          /* @__PURE__ */ jsx("p", { className: "feature-text", children: "Reduce significativamente el tiempo de preparación y ejecución en tus proyectos de carpintería." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gradient-to-b from-madera-300 to-madera-200", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-4 text-madera-800", children: "Cómo Funciona la Guía de Corte Recto" }),
      /* @__PURE__ */ jsx("div", { className: "w-24 h-2 bg-herramienta-600 mx-auto mb-6 rounded-full" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-madera-700 max-w-2xl mx-auto mb-16 text-lg font-medium", children: "Nuestra guía de corte recto para sierra circular es fácil de usar y se adapta a múltiples herramientas eléctricas e inalámbricas. La guía de aluminio para cortes sierra circular permite realizar cortes precisos en cualquier proyecto." }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "step-card text-center transform transition-transform hover:scale-105 hover:shadow-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "step-number", children: "1" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3 text-herramienta-700", children: "Ajusta" }),
          /* @__PURE__ */ jsx("p", { className: "text-madera-700 mb-4", children: "Coloca la guía sobre tu material y ajústala a la medida deseada con el sistema de bloqueo rápido." }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/guia-imagenes/ajuste-recto-profix-126.webp",
              alt: "Guía de corte ProFix 126 - Ajuste rápido de guía banco sierra para corte recto",
              loading: "lazy",
              className: "mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover hover:shadow-xl transition-shadow duration-300"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "step-card text-center transform transition-transform hover:scale-105 hover:shadow-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "step-number", children: "2" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3 text-herramienta-700", children: "Fija" }),
          /* @__PURE__ */ jsx("p", { className: "text-madera-700 mb-4", children: "Asegura la guía al material con las pinzas de sujeción integradas para un agarre firme." }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/guia-imagenes/corte-sierra-circular-profix-126.webp",
              alt: "Guía de corte recto para sierra circular - Fijación de guía banco sierra ProFix 126",
              loading: "lazy",
              className: "mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover hover:shadow-xl transition-shadow duration-300"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "step-card text-center transform transition-transform hover:scale-105 hover:shadow-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "step-number", children: "3" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3 text-herramienta-700", children: "Corta con la Guía" }),
          /* @__PURE__ */ jsx("p", { className: "text-madera-700 mb-4", children: "Utiliza tu sierra circular u otra herramienta eléctrica deslizándola a lo largo de la guía de corte recto para conseguir un corte perfecto. Esta guía para realizar cortes con sierra circular garantiza precisión profesional en cada proyecto." }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/guia-imagenes/guia-profix-126.webp",
              alt: "Guía de corte ProFix 126 - Realizando cortes con guía banco sierra de aluminio",
              loading: "lazy",
              className: "mt-4 rounded-lg shadow-md max-h-48 mx-auto object-cover hover:shadow-xl transition-shadow duration-300"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(FAQ, {}),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-naranja-600 text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: [
        "¡Mejora tus Proyectos con nuestra",
        /* @__PURE__ */ jsx("br", {}),
        "Guía de Corte Recto",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-black font-bold border-2 border-white px-2 rounded", children: "ProFix 126" }),
        "!"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xl max-w-2xl mx-auto mb-8", children: [
        "Adquiere tu guía de corte recto en material de aluminio que posee un Ajuste Rápido",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-gris-900 font-bold", children: '"ProFix 126"' }),
        " ",
        "para sierra circular y llevarás tus habilidades al siguiente nivel. Esta guía de corte con herramientas eléctricas es perfecta para proyectos profesionales con herramientas inalámbricas y eléctricas."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-base max-w-3xl mx-auto mb-8 text-naranja-50", children: 'Si llegaste buscando "guia de corte recto", "guia de corte para sierra circular" o incluso "tienes link", aqui puedes pasar directo a compra, producto o compatibilidad segun el punto en que estes de la decision.' }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { to: "/producto/profix-126", children: /* @__PURE__ */ jsxs(
          Button,
          {
            className: "bg-white text-naranja-700 font-bold py-6 px-12 text-2xl rounded-lg shadow-lg flex items-center gap-4 transition-all duration-200 hover:bg-naranja-700 hover:text-white hover:scale-110 hover:shadow-2xl hover:border-2 hover:border-white",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-24 h-24", fill: "none", stroke: "currentColor", strokeWidth: 2, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L19 13M7 13V6h10v7" }) }),
              "Comprar ahora"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://www.payku.cl/pagar/profix-126",
            target: "_blank",
            rel: "noopener noreferrer",
            children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                className: "border-2 border-white bg-transparent text-white hover:bg-white hover:text-naranja-700 font-bold py-6 px-8 text-lg rounded-lg",
                children: "Pedir link directo de compra"
              }
            )
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-16", children: "Lo que dicen nuestros clientes" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gris-50 p-6 rounded-lg shadow-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex mb-4", children: [
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-600 italic mb-4", children: '"Esta guía ha transformado mi taller. La precisión y facilidad de uso es impresionante. Recomiendo totalmente este producto."' }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Carlos Méndez" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-500", children: "Carpintero profesional" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gris-50 p-6 rounded-lg shadow-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex mb-4", children: [
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-600 italic mb-4", children: '"Como aficionado al bricolaje, esta guía ha sido un descubrimiento. Ahora mis cortes son precisos y profesionales. ¡Una inversión que vale la pena!"' }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Andrea Soto" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-500", children: "Entusiasta del bricolaje" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gris-50 p-6 rounded-lg shadow-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex mb-4", children: [
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-naranja-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-600 italic mb-4", children: '"La versatilidad de esta guía es impresionante. La uso con mi sierra circular y caladora, y los resultados son siempre perfectos."' }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Miguel Rojas" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-500", children: "Fabricante de muebles" })
        ] })
      ] })
    ] }) })
  ] });
};
lazy(() => import("./assets/TestimonialsCarousel-BtgyPAHD.js").then((module) => ({ default: module.default })));
lazy(() => import("./assets/AccessibilityPanel-gPizJnlU.js"));
const queryClient = new QueryClient();
const AppProviders = ({ children, helmetContext }) => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsxs(AccessibilityProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  children
] }) }) }) }) });
const producto = {
  _id: "profix-126",
  name: "Guía de Corte Recto ProFix 126",
  seoTitle: "Guía de Corte Recto ProFix 126 para Sierra Circular | Guía de Aluminio 1.26 m",
  seoDescription: "ProFix 126 es una guía de corte recto de aluminio de 1.26 metros para sierra circular y herramientas con base compatible. Ideal para melamina, MDF, terciado y madera cuando buscas cortes rectos, repetibles y mejor terminación.",
  shortDescription: "Guia de corte recto de 1.26 metros para sierra circular, talleres, mueblistas, instaladores y aficionados avanzados que necesitan cortes rectos, repetibles y limpios sin depender de maquinaria grande.",
  overview: "ProFix 126 combina estructura de aluminio, ajuste rapido y una superficie de guiado pensada para trabajo real en carpinteria. Su mayor fortaleza es ayudarte a repetir medidas, reducir error humano y mantener el corte estable en piezas largas de melamina, MDF, terciado o madera.",
  cashPrice: 35e3,
  cardPrice: 38990,
  keyPoints: [
    "Hasta 126 cm de capacidad de trabajo",
    "Aluminio aeronáutico 6061-T6",
    "Ajuste rápido para preparación del corte",
    "Peso aproximado de 1.4 kg",
    "Pensada para cortes rectos repetibles",
    "Compatibilidad sujeta al tipo de base y herramienta",
    "Uso estrella como guia de corte para sierra circular"
  ],
  materials: [
    "Melamina",
    "MDF",
    "Terciado",
    "Maderas blandas y duras",
    "Tableros de mueblería",
    "Otros materiales según herramienta y configuración"
  ],
  idealFor: [
    "Carpinteros y mueblistas que cortan tableros con frecuencia",
    "Talleres pequeños que necesitan precisión sin ocupar demasiado espacio",
    "Instaladores que requieren portabilidad para trabajar en obra",
    "Aficionados avanzados que buscan terminación profesional"
  ],
  compatibleTools: {
    primary: [
      "Sierra circular con base compatible",
      "Router y fresadora con apoyo plano compatible"
    ],
    secondary: [
      "Caladora para guiados rectos controlados",
      "Otras herramientas con base plana, previa validación"
    ]
  },
  images: [
    {
      url: "/guia-imagenes/profix-126-guia-corte-recto.webp",
      alt: "Guía de corte ProFix 126 preparada para cortes rectos de precisión"
    },
    {
      url: "/guia-imagenes/guia-corte-profix-126.webp",
      alt: "Guía de corte ProFix 126 en uso sobre tablero de carpintería"
    },
    {
      url: "/guia-imagenes/corte-sierra-circular-profix-126.webp",
      alt: "ProFix 126 guiando una sierra circular para un corte recto"
    },
    {
      url: "/guia-imagenes/ajuste-recto-profix-126.webp",
      alt: "Sistema de ajuste rápido de la guía de corte ProFix 126"
    }
  ],
  keywords: [
    "guía de corte recto",
    "guía de corte para sierra circular",
    "guía recta para sierra circular",
    "guía de aluminio para carpintería",
    "guía de aluminio para sierra circular",
    "guía de corte 1.26 metros",
    "guía de corte para melamina",
    "guía de corte para MDF",
    "guía corte madera",
    "guía de corte Ubermann",
    "profix 126",
    "guía para router",
    "accesorio para carpintería"
  ],
  paymentLink: "https://www.payku.cl/pagar/profix-126",
  videos: [
    { href: "https://youtube.com/shorts/shIy8jqR0tE?feature=share", label: "Ver demostración de corte" },
    { href: "https://youtube.com/shorts/UHUVFCgoRSc?feature=share", label: "Ver ajuste rápido" },
    { href: "https://youtube.com/shorts/JDyfjvraM2I?feature=share", label: "Ver aplicaciones y usos" }
  ]
};
const Producto = () => {
  var _a;
  const { id } = useParams();
  const { toast: toast2 } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(producto.images[0].url);
  const { addToCart } = useCart();
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => prev > 1 ? prev - 1 : 1);
  const handleAddToCart = () => {
    addToCart({
      id: producto._id,
      name: producto.name,
      price: producto.cashPrice,
      priceCard: producto.cardPrice,
      quantity,
      image: producto.images[0].url
    });
    toast2({
      title: "Producto agregado al carrito",
      description: `${quantity} x ${producto.name}`
    });
  };
  const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (id !== "profix-126") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: "Producto no encontrado | GuiaDeCorte.cl" }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: "El producto que buscas no existe. Conoce nuestra Guía de Corte ProFix 126 para herramientas profesionales de carpintería." }),
        /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-red-600 mb-4", children: "Producto no encontrado" }),
        /* @__PURE__ */ jsx("p", { className: "text-gris-600 mb-8", children: "Lo sentimos, el producto que buscas no existe o ha sido removido de nuestro catálogo." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
          /* @__PURE__ */ jsx(Link, { to: "/producto/profix-126", children: /* @__PURE__ */ jsx(Button, { className: "bg-herramienta-600 hover:bg-herramienta-700 text-white", children: "Ver Guía ProFix 126" }) }),
          /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Ir al inicio" }) })
        ] })
      ] }) })
    ] });
  }
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: producto.seoTitle,
    image: producto.images.map((img) => `https://www.guiadecorte.cl${img.url}`),
    description: producto.seoDescription,
    sku: producto._id,
    url: `https://www.guiadecorte.cl/producto/${producto._id}`,
    brand: {
      "@type": "Brand",
      name: "ProFix"
    },
    offers: {
      "@type": "Offer",
      url: `https://www.guiadecorte.cl/producto/${producto._id}`,
      priceCurrency: "CLP",
      price: producto.cashPrice,
      priceValidUntil: new Date(
        (/* @__PURE__ */ new Date()).setFullYear((/* @__PURE__ */ new Date()).getFullYear() + 1)
      ).toISOString().split("T")[0],
      availability: "https://schema.org/InStock"
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        producto.seoTitle,
        " | GuiaDeCorte.cl"
      ] }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: producto.seoDescription }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: producto.keywords.join(", ") }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: `https://www.guiadecorte.cl/producto/${producto._id}` }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(structuredData) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2", children: [
          /* @__PURE__ */ jsx("div", { className: "relative aspect-square overflow-hidden rounded-lg mb-4 shadow-lg border-2 border-naranja-600", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: activeImage,
              loading: "lazy",
              alt: ((_a = producto.images.find((img) => img.url === activeImage)) == null ? void 0 : _a.alt) || producto.name,
              className: "object-cover w-full h-full"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-6 gap-2", children: producto.images.map((image, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: `aspect-square rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 ${activeImage === image.url ? "border-naranja-600 scale-105 shadow-lg" : "border-transparent"}`,
              onClick: () => setActiveImage(image.url),
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: image.url,
                  alt: image.alt,
                  loading: "lazy",
                  className: "object-cover w-full h-full"
                }
              )
            },
            index
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold text-gris-900 mb-2", children: [
            "Guía de Corte ProFix 126",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-semibold block mt-1", children: "Sistema de 1.26 m para sierra circular, router y herramientas con base compatible" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-base text-gris-600 mb-4", children: producto.shortDescription }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-700 mb-6", children: producto.overview }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-gris-200 bg-gris-50 p-4", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-bold mb-2", children: "Si llegaste buscando una guia de corte para sierra circular" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-700", children: "Esta es la aplicacion principal de la ProFix 126: ordenar cortes rectos y repetibles en tableros, muebles y piezas largas con mejor control." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-gris-200 bg-gris-50 p-4", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-bold mb-2", children: "Si comparas una guia de aluminio" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-700", children: "Aqui importa la rigidez del cuerpo, la longitud de trabajo y el ajuste rapido para repetir referencias sin perder tiempo entre corte y corte." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-naranja-600", children: [
                "$",
                formatPrice(producto.cashPrice)
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-gris-500 line-through", children: [
                "$",
                formatPrice(producto.cardPrice)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 bg-yellow-50 rounded px-3 py-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-green-700", children: "Oferta web vigente" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
                /* @__PURE__ */ jsxs("span", { className: "font-semibold text-black", children: [
                  "$",
                  formatPrice(producto.cashPrice),
                  " (efectivo o transferencia)"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-green-700 font-bold ml-2", children: [
                  "Ahorras $",
                  formatPrice(producto.cardPrice - producto.cashPrice)
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { className: "font-semibold text-black", children: [
                "$",
                formatPrice(producto.cardPrice),
                " (tarjeta)"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
            /* @__PURE__ */ jsx(Button, { onClick: decrementQuantity, variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(Minus, {}) }),
            /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: quantity }),
            /* @__PURE__ */ jsx(Button, { onClick: incrementQuantity, variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(Plus, {}) }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: handleAddToCart,
                className: "ml-4 py-4 px-8 text-xl font-bold flex items-center gap-3",
                children: [
                  /* @__PURE__ */ jsx(Check, { className: "mr-2 w-7 h-7" }),
                  " Agregar al carrito"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: producto.paymentLink,
                target: "_blank",
                rel: "noopener noreferrer",
                children: /* @__PURE__ */ jsx(Button, { className: "bg-naranja-600 hover:bg-naranja-700 text-white w-full sm:w-auto", children: "Comprar ahora" })
              }
            ),
            /* @__PURE__ */ jsx(Link, { to: "/contacto", children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full sm:w-auto", children: "Resolver dudas antes de comprar" }) }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://wa.me/56935777727?text=Hola,%20quiero%20el%20link%20de%20compra%20de%20la%20guia%20de%20corte%20ProFix%20126%20y%20validar%20compatibilidad%20con%20mi%20sierra%20circular.",
                target: "_blank",
                rel: "noopener noreferrer",
                children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full sm:w-auto", children: "Pedir link por WhatsApp" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: "Puntos clave" }),
            /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5", children: producto.keyPoints.map((feature, idx) => /* @__PURE__ */ jsx("li", { children: feature }, idx)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gris-50 rounded-lg p-5 border border-gris-200", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: "Compatibilidad responsable" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gris-700 mb-3", children: [
              "El uso principal recomendado es con ",
              /* @__PURE__ */ jsx("strong", { children: "sierra circular" }),
              ". Tambien puede trabajar con ",
              /* @__PURE__ */ jsx("strong", { children: "router" }),
              ",",
              /* @__PURE__ */ jsx("strong", { children: " fresadora" }),
              " y otras herramientas de base compatible, pero la confirmacion final depende del modelo, la base y el tipo de apoyo."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsx(Link, { to: "/contacto", children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Confirmar compatibilidad" }) }),
              /* @__PURE__ */ jsx(Link, { to: "/guias/compatibilidad-por-marcas-frecuentes", children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Ver compatibilidad por marcas" }) }),
              /* @__PURE__ */ jsx(Link, { to: "/galeria", children: /* @__PURE__ */ jsx(Button, { className: "bg-herramienta-600 hover:bg-herramienta-700 text-white", children: "Ver fotos y videos" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", children: "Que resuelve" }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-700", children: "ProFix 126 esta pensada para quienes necesitan guiar cortes rectos en tableros, repetir medidas con mas confianza y trabajar con mejor terminacion sin depender de una mesa de corte grande." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", children: "Ideal para" }),
          /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 text-gris-700 space-y-2", children: producto.idealFor.map((item, idx) => /* @__PURE__ */ jsx("li", { children: item }, idx)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", children: "Materiales de trabajo" }),
          /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 text-gris-700 space-y-2", children: producto.materials.map((item, idx) => /* @__PURE__ */ jsx("li", { children: item }, idx)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "my-12 bg-white rounded-lg shadow p-6 max-w-5xl mx-auto border border-gris-200", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-center", children: "Consultas reales que esta pagina responde mejor" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-gris-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-gris-50 p-5 border border-gris-200", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Guia de corte recto y guia de corte" }),
            /* @__PURE__ */ jsx("p", { children: "Esta ficha deja claro que la ProFix 126 no es una referencia improvisada: es una guia recta de aluminio pensada para cortes repetibles y mejor terminacion." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-gris-50 p-5 border border-gris-200", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Guia de corte para sierra circular" }),
            /* @__PURE__ */ jsx("p", { children: "El uso principal recomendado es con sierra circular. Por eso la pagina prioriza tableros, melamina, MDF, terciado y madera antes que promesas genericas." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-gris-50 p-5 border border-gris-200", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Guia de aluminio para sierra circular" }),
            /* @__PURE__ */ jsx("p", { children: "El cuerpo en aluminio 6061-T6 aporta rigidez y portabilidad para trabajo real en taller u obra cuando necesitas una referencia larga pero transportable." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-gris-50 p-5 border border-gris-200", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Guia de corte Ubermann y otras marcas" }),
            /* @__PURE__ */ jsx("p", { children: "Si llegaste por una marca especifica, el siguiente paso correcto no es adivinar: es revisar compatibilidad por base, modelo y tipo de trabajo." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "my-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold mb-4 text-center", children: [
          "Por que elegir ",
          /* @__PURE__ */ jsx("span", { className: "text-naranja-600", children: "ProFix 126" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-center mb-6 max-w-3xl mx-auto", children: "El valor del sistema no esta solo en la longitud. Esta en combinar estabilidad, ajuste rapido y una forma de trabajo pensada para talleres, muebles a medida e instalaciones donde el tiempo y la precision importan." }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white rounded-lg shadow text-left", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "bg-naranja-600 rounded-lg px-4 py-2 font-bold text-black text-center", children: "Característica" }) }),
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "bg-gris-200 rounded-lg px-4 py-2 font-bold text-black text-center", children: "Solución genérica" }) }),
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "bg-naranja-600 rounded-lg px-4 py-2 font-bold text-white text-center", children: "ProFix 126" }) })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 font-semibold text-left", children: "Longitud de trabajo" }),
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 text-left", children: "Limitada para piezas largas" }),
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 font-bold text-left", children: "Hasta 126 cm" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 font-semibold text-left", children: "Preparación" }),
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 text-left", children: "Ajustes lentos y repetitivos" }),
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 font-bold text-left", children: "Ajuste rápido para preparar y repetir medidas" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 font-semibold text-left", children: "Rigidez del cuerpo" }),
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 text-left", children: "Menor estabilidad en piezas largas" }),
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 font-bold text-left", children: "Aluminio 6061-T6 para trabajo más estable" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 font-semibold text-left", children: "Portabilidad" }),
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 text-left", children: "Mayor volumen o peso" }),
              /* @__PURE__ */ jsx("td", { className: "py-2 px-4 font-bold text-left", children: "Aprox. 1.4 kg para taller y obra" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "my-12 bg-gris-50 rounded-lg shadow p-6 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-center", children: "Compatibilidad con herramientas y marcas" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gris-800 mb-6 text-center", children: [
          "La recomendacion comercial principal es comunicar ",
          /* @__PURE__ */ jsx("strong", { children: "sierra circular" }),
          " como uso estrella. Router y fresadora funcionan muy bien cuando la base y el apoyo son compatibles."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-naranja-600 mb-2", children: "Uso principal recomendado" }),
            /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5", children: producto.compatibleTools.primary.map((tool, idx) => /* @__PURE__ */ jsx("li", { children: tool }, idx)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-naranja-600 mb-2", children: "Usos complementarios" }),
            /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5", children: producto.compatibleTools.secondary.map((tool, idx) => /* @__PURE__ */ jsx("li", { children: tool }, idx)) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 text-center text-gris-700", children: "Si tienes una marca o modelo no listado, te conviene confirmar antes de comprar para asegurar el mejor acople posible." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/guias/compatibilidad-por-modelo-de-herramienta", className: "bg-white border border-gris-200 rounded-lg p-4 hover:border-herramienta-600 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Compatibilidad por modelo" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-700", children: "Aprende que datos conviene enviar para validar tu herramienta antes de comprar." })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/guias/compatibilidad-por-marcas-frecuentes", className: "bg-white border border-gris-200 rounded-lg p-4 hover:border-herramienta-600 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Marcas frecuentes" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-700", children: "Makita, Bosch, DeWalt, Stanley, Skil, Einhell, Ingco, Ubermann y Milwaukee." })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/guias/guia-de-corte-para-router", className: "bg-white border border-gris-200 rounded-lg p-4 hover:border-herramienta-600 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Uso con router" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-700", children: "Revisa cuando tiene sentido y que conviene mirar antes de validarlo." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "my-12 bg-white rounded-lg shadow p-6 max-w-5xl mx-auto border border-gris-200", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-center", children: "Preguntas clave antes de comprar" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("article", { className: "border border-gris-200 rounded-lg p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Sirve para cortar madera, melamina, MDF o terciado?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gris-700", children: "Si, esos son precisamente los escenarios donde una guia recta suele marcar mas diferencia por control, repeticion de medidas y calidad de terminacion." })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "border border-gris-200 rounded-lg p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Sirve con cualquier sierra circular?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gris-700", children: "No conviene prometer compatibilidad universal. La mejor recomendacion depende de la base, el apoyo y el tipo de trabajo que quieres hacer." })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "border border-gris-200 rounded-lg p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Puedo pedir el link directo de compra?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gris-700", children: "Si. Puedes comprar de inmediato o pedir el link por WhatsApp si primero quieres validar compatibilidad o envio." })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "border border-gris-200 rounded-lg p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "Vale la pena frente a una regla casera?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gris-700", children: "Cuando el trabajo exige repetir medidas, cuidar terminacion y reducir desperdicio, una guia dedicada suele justificar mucho mejor la inversion." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "my-12 bg-madera-50 rounded-lg shadow p-6 max-w-5xl mx-auto border border-madera-200", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-center", children: "Comparativas que ayudan a decidir mejor" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/guias/profix-126-vs-regla-casera", className: "bg-white border border-gris-200 rounded-lg p-5 hover:border-herramienta-600 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", children: "ProFix 126 vs regla casera" }),
            /* @__PURE__ */ jsx("p", { className: "text-gris-700", children: "Ideal para quien ya corta con referencias improvisadas y quiere saber cuando una guia dedicada realmente vale la pena." })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/guias/sierra-circular-con-guia-vs-sierra-de-mesa", className: "bg-white border border-gris-200 rounded-lg p-5 hover:border-herramienta-600 transition-colors", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", children: "Sierra circular con guia vs sierra de mesa" }),
            /* @__PURE__ */ jsx("p", { className: "text-gris-700", children: "Buena ruta para talleres pequenos, instaladores y usuarios que comparan portabilidad, espacio y flujo real de trabajo." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "my-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-center", children: "Videos de apoyo" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row justify-center gap-4", children: producto.videos.map((video) => /* @__PURE__ */ jsx(
          "a",
          {
            href: video.href,
            className: "inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition text-center",
            target: "_blank",
            rel: "noopener noreferrer",
            children: video.label
          },
          video.href
        )) })
      ] })
    ] })
  ] });
};
const Contacto = () => {
  const { toast: toast2 } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toast2({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto. ¡Gracias!"
    });
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: ""
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contacto y Compatibilidad | Guía de Corte ProFix 126 para Sierra Circular" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Contacta a GuiaDeCorte.cl para resolver compatibilidad, pedir el link de compra o consultar por la guía de corte ProFix 126 para sierra circular, melamina, MDF, terciado y madera." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-center mb-12", children: "Contacto" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center mb-10", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gris-700 mb-6", children: [
          "Si llegaste buscando una ",
          /* @__PURE__ */ jsx("strong", { children: "guia de corte para sierra circular" }),
          ", una ",
          /* @__PURE__ */ jsx("strong", { children: "guia de aluminio" }),
          ", compatibilidad con tu marca o simplemente el ",
          /* @__PURE__ */ jsx("strong", { children: "link directo de compra" }),
          ", esta es la pagina correcta para cerrar dudas y avanzar con seguridad."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-left", children: [
          /* @__PURE__ */ jsxs("article", { className: "bg-gris-50 border border-gris-200 rounded-lg p-5", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold mb-2", children: "Compatibilidad por marca o modelo" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-700", children: "Envianos marca, modelo y una foto de la base si quieres validar tu sierra circular, router o herramienta." })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "bg-gris-50 border border-gris-200 rounded-lg p-5", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold mb-2", children: "Pedir link de compra" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-700", children: "Si ya decidiste, tambien puedes escribir solo para pedir el link directo de pago o consultar stock y envio." })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "bg-gris-50 border border-gris-200 rounded-lg p-5", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold mb-2", children: "Resolver uso en materiales" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-700", children: "Pregunta por trabajo en melamina, MDF, terciado o madera y te orientamos segun tu caso real." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 bg-naranja-600 text-white", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Envíanos un mensaje" }) }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "nombre", className: "block mb-1 font-medium", children: "Nombre completo" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "nombre",
                  name: "nombre",
                  autoComplete: "name",
                  value: formData.nombre,
                  onChange: handleChange,
                  className: "w-full px-4 py-2 border border-gris-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naranja-500",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block mb-1 font-medium", children: "Correo electrónico" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    id: "email",
                    name: "email",
                    autoComplete: "email",
                    value: formData.email,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border border-gris-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naranja-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "telefono", className: "block mb-1 font-medium", children: "Teléfono (opcional)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    id: "telefono",
                    name: "telefono",
                    autoComplete: "tel",
                    pattern: "[0-9]{9,15}",
                    title: "Ingresa solo números, mínimo 9 dígitos",
                    value: formData.telefono,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border border-gris-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naranja-500"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "mensaje", className: "block mb-1 font-medium", children: "Mensaje" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "mensaje",
                  name: "mensaje",
                  value: formData.mensaje,
                  onChange: handleChange,
                  rows: 5,
                  className: "w-full px-4 py-2 border border-gris-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naranja-500",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                children: "Enviar mensaje"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden mb-8", children: [
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-naranja-600 text-white", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Información de contacto" }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6 text-naranja-600 mr-4 mt-1" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Dirección" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gris-600", children: "Juan Hus 145, Maipú" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gris-600", children: "Región Metropolitana, Chile" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gris-600", children: "Código Postal: 9274362" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-6 w-6 text-naranja-600 mr-4 mt-1" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Teléfono" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gris-600", children: /* @__PURE__ */ jsx("a", { href: "tel:+56935777727", className: "hover:text-naranja-600", children: "+569 3577 7727" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                /* @__PURE__ */ jsx(MessageSquare, { className: "h-6 w-6 text-[#25D366] mr-4 mt-1" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "WhatsApp" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gris-600", children: "+56935777727" }),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://wa.me/56935777727?text=Hola,%20quiero%20informacion%20de%20la%20guia%20de%20corte%20ProFix%20126,%20pedir%20el%20link%20de%20compra%20o%20validar%20compatibilidad%20con%20mi%20sierra%20circular.",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-block mt-2 text-sm text-[#25D366] hover:underline",
                      children: "Enviar mensaje por WhatsApp"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                /* @__PURE__ */ jsx(Mail, { className: "h-6 w-6 text-naranja-600 mr-4 mt-1" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Correo electrónico" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gris-600", children: /* @__PURE__ */ jsx("a", { href: "mailto:ventas@terciamel.cl", className: "hover:text-naranja-600", children: "ventas@terciamel.cl" }) })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "rounded-lg overflow-hidden shadow-md", children: /* @__PURE__ */ jsx(
            "iframe",
            {
              title: "Ubicación en Google Maps",
              src: "https://www.google.com/maps?q=Juan+Hus+145,+Maipú,+Región+Metropolitana,+Chile&output=embed",
              width: "100%",
              height: "300",
              style: { border: 0 },
              allowFullScreen: true,
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gris-50 border border-gris-200 rounded-lg p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-3", children: "Antes de escribir, tambien puedes avanzar por aqui" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsx(Link, { to: "/producto/profix-126", children: /* @__PURE__ */ jsx(Button, { className: "w-full", children: "Ver producto" }) }),
              /* @__PURE__ */ jsx(Link, { to: "/guias/compatibilidad-por-marcas-frecuentes", children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", children: "Ver compatibilidad" }) }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://www.payku.cl/pagar/profix-126",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", children: "Abrir link de compra" })
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const StaticLayout = ({
  children
}) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(ScrollToTop, {}),
  /* @__PURE__ */ jsx(SkipLink, {}),
  /* @__PURE__ */ jsx(Navbar, {}),
  /* @__PURE__ */ jsx("main", { id: "main-content", className: "min-h-screen", children }),
  /* @__PURE__ */ jsx(Footer, { renderRelatedCompanies: false }),
  /* @__PURE__ */ jsx(WhatsAppButton, {})
] });
const prerenderRoutes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(StaticLayout, { children: /* @__PURE__ */ jsx(Index, {}) })
  },
  {
    path: "/producto/:id",
    element: /* @__PURE__ */ jsx(StaticLayout, { children: /* @__PURE__ */ jsx(Producto, {}) })
  },
  {
    path: "/producto",
    element: /* @__PURE__ */ jsx(Navigate, { to: "/producto/profix-126", replace: true })
  },
  {
    path: "/contacto",
    element: /* @__PURE__ */ jsx(StaticLayout, { children: /* @__PURE__ */ jsx(Contacto, {}) })
  }
];
async function render(url) {
  const helmetContext = {};
  const router = createMemoryRouter(prerenderRoutes, {
    initialEntries: [url],
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  });
  const appHtml = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(AppProviders, { helmetContext, children: /* @__PURE__ */ jsx(RouterProvider, { router }) })
  );
  return {
    appHtml,
    helmet: helmetContext.helmet
  };
}
async function getPrerenderRoutes() {
  return [
    "/",
    "/producto/profix-126",
    "/contacto"
  ];
}
export {
  Button as B,
  cn as c,
  getPrerenderRoutes,
  render,
  useAccessibility as u
};
