// Gracias.tsx
import { useLocation } from "react-router-dom";

const Gracias = () => {
  const location = useLocation();
  // Puedes leer parámetros de la URL si Payku los envía
  // const params = new URLSearchParams(location.search);

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">¡Felicidades! Tu compra fue realizada con éxito.</h1>
      <p className="mb-6">
        Para cualquier consulta sobre tu pedido, contáctanos al WhatsApp <a href="https://wa.me/56935777727" className="text-naranja-600 font-bold">+56 9 3577 7727</a>.
      </p>
      <a href="/" className="inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition">
        Volver al inicio
      </a>
    </div>
  );
};

export default Gracias;