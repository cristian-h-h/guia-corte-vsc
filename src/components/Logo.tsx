const Logo = () => {
  return (
    <div className="relative group w-48 h-16 mx-auto">
      {/* Contenedor del logo */}
      <div className="absolute inset-0 bg-black rounded-lg animate-laser"></div>
      {/* Efecto de bordes */}
      <div className="absolute inset-0 rounded-lg border-2 border-laser group-hover:animate-laser"></div>
      {/* Texto o imagen del logo */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-2xl font-bold">
        Guía de Corte
      </div>
    </div>
  );
};

export default Logo;