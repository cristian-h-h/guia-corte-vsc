import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo con efecto especial */}
          <Link to="/" className="flex items-center group">
            <div className="relative w-48 h-16 flex items-center">
              <img
                 src="/guia-imagenes/profix-126-logo.webp"
                 alt="Logo Guía Corte recto Profix 126"
                 className="h-16 w-auto rounded-lg shadow-lg transition duration-300 group-hover:shadow-naranja-500/70 group-hover:scale-110"
                 style={{
                boxShadow:
                   "0 0 32px 8px rgba(255, 115, 0, 0.7), 0 0 64px 16px rgba(255, 115, 0, 0.35)",
                transition: "box-shadow 0.3s, transform 0.3s",
             }}
              />
              {/* Glow animado */}
              <span className="absolute inset-0 rounded-lg pointer-events-none animate-glow group-hover:opacity-100 opacity-60"></span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gris-800 hover:text-naranja-600 font-medium transition-colors">
              Inicio
            </Link>
            <Link to="/producto" className="text-gris-800 hover:text-naranja-600 font-medium transition-colors">
              Producto
            </Link>
            <Link to="/blog" className="text-gris-800 hover:text-naranja-600 font-medium transition-colors">
              Blog
            </Link>
            <Link to="/contacto" className="text-gris-800 hover:text-naranja-600 font-medium transition-colors">
              Contacto
            </Link>
          </div>

          {/* Carrito de compras */}
          <div className="hidden md:flex items-center">
            <Link to="/carrito" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gris-800 hover:text-naranja-600 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-naranja-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length > 99 ? "99+" : cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/carrito" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gris-800" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-naranja-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length > 99 ? "99+" : cartItems.length}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-gris-800" aria-label="Abrir menú de navegación">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 animate-slide-in">
          <div className="flex flex-col space-y-4 px-4">
            <Link
              to="/"
              className="text-gris-800 hover:text-naranja-600 py-2 text-center font-medium"
              onClick={toggleMenu}
            >
              Inicio
            </Link>
            <Link
              to="/producto"
              className="text-gris-800 hover:text-naranja-600 py-2 text-center font-medium"
              onClick={toggleMenu}
            >
              Producto
            </Link>
            <Link
              to="/blog"
              className="text-gris-800 hover:text-naranja-600 py-2 text-center font-medium"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              to="/contacto"
              className="text-gris-800 hover:text-naranja-600 py-2 text-center font-medium"
              onClick={toggleMenu}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
