
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { GoogleMap } from "@/components/GoogleMap";
import WhatsAppButton from "@/components/WhatsAppButton";
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
        <title>Contacto | Guía de Corte Ajustable</title>
        <meta name="description" content="Contáctanos para más información sobre la Guía de Corte Ajustable. Estamos aquí para atender tus consultas y pedidos." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Contacto
        </h1>
        
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
                      href="https://wa.me/56935777727?text=Hola,%20estoy%20interesado%20en%20la%20Guía%20de%20Corte%20Ajustable.%20¿Podrían%20darme%20más%20información?"
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
                      <a href="mailto:info@guiadecorte.cl" className="hover:text-naranja-600">
                        info@guiadecorte.cl
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <GoogleMap location={location} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacto;
