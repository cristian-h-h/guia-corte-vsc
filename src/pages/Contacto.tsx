import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  const location = {
    address: "Juan Hus 145, Maipú, Región Metropolitana, Chile",
    postalCode: "9274362",
    lat: -33.5098799,
    lng: -70.7874853
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulamos el envío del formulario
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto. ¡Gracias!",
    });
    
    // Reiniciamos el formulario
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: ""
    });
  };

  return (
    <>
      <Helmet>
        <title>Contacto y Compatibilidad | Guía de Corte ProFix 126 para Sierra Circular</title>
        <meta name="description" content="Contacta a GuiaDeCorte.cl para resolver compatibilidad, pedir el link de compra o consultar por la guía de corte ProFix 126 para sierra circular, melamina, MDF, terciado y madera." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Contacto
        </h1>
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-lg text-gris-700 mb-6">
            Si llegaste buscando una <strong>guia de corte para sierra circular</strong>, una <strong>guia de aluminio</strong>,
            compatibilidad con tu marca o simplemente el <strong>link directo de compra</strong>, esta es la pagina correcta
            para cerrar dudas y avanzar con seguridad.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <article className="bg-gris-50 border border-gris-200 rounded-lg p-5">
              <h2 className="font-bold mb-2">Compatibilidad por marca o modelo</h2>
              <p className="text-sm text-gris-700">
                Envianos marca, modelo y una foto de la base si quieres validar tu sierra circular, router o herramienta.
              </p>
            </article>
            <article className="bg-gris-50 border border-gris-200 rounded-lg p-5">
              <h2 className="font-bold mb-2">Pedir link de compra</h2>
              <p className="text-sm text-gris-700">
                Si ya decidiste, tambien puedes escribir solo para pedir el link directo de pago o consultar stock y envio.
              </p>
            </article>
            <article className="bg-gris-50 border border-gris-200 rounded-lg p-5">
              <h2 className="font-bold mb-2">Resolver uso en materiales</h2>
              <p className="text-sm text-gris-700">
                Pregunta por trabajo en melamina, MDF, terciado o madera y te orientamos segun tu caso real.
              </p>
            </article>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de contacto */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-naranja-600 text-white">
              <h2 className="text-xl font-semibold">
                Envíanos un mensaje
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="nombre" className="block mb-1 font-medium">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  autoComplete="name"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gris-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naranja-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gris-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naranja-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="telefono" className="block mb-1 font-medium">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    autoComplete="tel"
                    pattern="[0-9]{9,15}"
                    title="Ingresa solo números, mínimo 9 dígitos"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gris-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naranja-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="mensaje" className="block mb-1 font-medium">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gris-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naranja-500"
                  required
                ></textarea>
              </div>
              
              <Button
                type="submit"
                className="w-full"
              >
                Enviar mensaje
              </Button>
            </form>
          </div>
          
          {/* Información de contacto */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-4 bg-naranja-600 text-white">
                <h2 className="text-xl font-semibold">
                  Información de contacto
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-naranja-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold">Dirección</h3>
                    <p className="text-gris-600">Juan Hus 145, Maipú</p>
                    <p className="text-gris-600">Región Metropolitana, Chile</p>
                    <p className="text-gris-600">Código Postal: 9274362</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-naranja-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold">Teléfono</h3>
                    <p className="text-gris-600">
                      <a href="tel:+56935777727" className="hover:text-naranja-600">
                        +569 3577 7727
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-[#25D366] mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <p className="text-gris-600">+56935777727</p>
                    <a 
                      href="https://wa.me/56935777727?text=Hola,%20quiero%20informacion%20de%20la%20guia%20de%20corte%20ProFix%20126,%20pedir%20el%20link%20de%20compra%20o%20validar%20compatibilidad%20con%20mi%20sierra%20circular."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-[#25D366] hover:underline"
                    >
                      Enviar mensaje por WhatsApp
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-naranja-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold">Correo electrónico</h3>
                    <p className="text-gris-600">
                      <a href="mailto:ventas@terciamel.cl" className="hover:text-naranja-600">
                        ventas@terciamel.cl
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md">
             <iframe
               title="Ubicación en Google Maps"
               src="https://www.google.com/maps?q=Juan+Hus+145,+Maipú,+Región+Metropolitana,+Chile&output=embed"
               width="100%"
               height="300"
               style={{ border: 0 }}
               allowFullScreen
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
            </div>
            <div className="mt-8 bg-gris-50 border border-gris-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Antes de escribir, tambien puedes avanzar por aqui</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link to="/producto/profix-126">
                  <Button className="w-full">Ver producto</Button>
                </Link>
                <Link to="/guias/compatibilidad-por-marcas-frecuentes">
                  <Button variant="outline" className="w-full">Ver compatibilidad</Button>
                </Link>
                <a
                  href="https://www.payku.cl/pagar/profix-126"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full">Abrir link de compra</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacto;
