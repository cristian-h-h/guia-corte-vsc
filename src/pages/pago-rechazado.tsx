import { Link } from "react-router-dom";

const PagoRechazado = () => (
  <div className="container mx-auto px-4 py-12 text-center">
    <h1 className="text-3xl font-bold mb-4 text-red-700">Pago rechazado</h1>
    <p className="mb-6">
      Tu pago no pudo ser procesado o fue cancelado.<br />
      Si tienes dudas o necesitas ayuda, contáctanos al WhatsApp{" "}
      <a href="https://wa.me/56935777727" className="text-naranja-600 font-bold">
        +56 9 3577 7727
      </a>.
    </p>
    <Link
      to="/"
      className="inline-block bg-naranja-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-naranja-700 transition"
    >
      Volver al inicio
    </Link>
  </div>
);

export default PagoRechazado;