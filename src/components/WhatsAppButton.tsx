
import { MessageSquare } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton = ({ 
  phoneNumber = "56935777727",
  message = "Hola, tengo stock para envio inmediato en Chile y somos los unicos con 1.26m de largo. Quisiera consultar por la guia de corte ProFix 126."
}: WhatsAppButtonProps) => {
  
  // Formatear número de teléfono (eliminar + si existe)
  const formattedPhone = phoneNumber.startsWith("+") 
    ? phoneNumber.substring(1) 
    : phoneNumber;
  
  // Crear URL de WhatsApp
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  
  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-40 bg-[#25D366] text-white rounded-full p-3 shadow-lg hover:bg-[#1da851] transition-colors flex items-center justify-center md:bottom-6 md:right-6"
      aria-label="Contáctanos por WhatsApp"
    >
      <MessageSquare className="h-8 w-8" />
    </a>
  );
};

export default WhatsAppButton;
