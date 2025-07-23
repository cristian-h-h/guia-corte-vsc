import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Componente que hace scroll al inicio de la página cuando la ruta cambia
 * Compatible con React Router v6
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuando la ruta cambia, hacer scroll al inicio de la página
    window.scrollTo(0, 0);
    
    // Alternativa con opciones (puede no ser compatible con todos los navegadores)
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "instant" // o "auto" para compatibilidad
    // });
  }, [pathname]);

  return null; // Este componente no renderiza nada
}