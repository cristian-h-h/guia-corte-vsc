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
          {/* Logo con efecto de espada láser */}
          <Link to="/" className="flex items-center">
            <div className="relative group w-48 h-16">
              {/* Fondo del logo */}
              <div
                className="absolute inset-0 bg-[url('/guia-imagenes/guia-corte-logo.png')] bg-cover bg-center rounded-lg"
                aria-label="Guía de Corte Logo"
              ></div>
              {/* Bordes con efecto láser */}
              <div className="absolute inset-0 rounded-lg border-4 border-transparent group-hover:animate-laser group-hover:border-laser"></div>
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
                  {cartItems.length}
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
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-gris-800">
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
