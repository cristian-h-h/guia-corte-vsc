import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus, Minus } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
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
  },
  {
    question: "¿La ProFix 126 sirve como guia recta para sierra circular en melamina y MDF?",
    answer: "Si. De hecho es uno de los escenarios donde mas sentido tiene. Cuando trabajas melamina y MDF, una guia recta para sierra circular ayuda a repetir medidas, reducir desperdicio y mejorar la terminacion final."
  },
  {
    question: "¿Es una guia de aluminio para sierra circular o tambien sirve en otros trabajos?",
    answer: "La ProFix 126 se posiciona primero como guia de aluminio para sierra circular, pero tambien puede acompañar usos con router, fresadora u otras herramientas de base compatible, siempre validando apoyo y geometria real."
  },
  {
    question: "¿Sirve como guia para cortar madera y tableros largos?",
    answer: "Si. Si llegaste buscando una guia para cortar madera, la ProFix 126 apunta justamente a ese problema: mantener el recorrido mas estable en tableros, repisas, muebles y cortes largos donde una referencia improvisada suele fallar."
  },
  {
    question: "¿Dónde se puede comprar en Chile?",
    answer: "Puedes comprar la ProFix 126 desde la ficha de producto, pedir el link directo de compra por WhatsApp o escribir por contacto para resolver compatibilidad antes de pagar. Se despacha dentro de Chile segun cobertura disponible."
  },
  {
    question: "¿Conviene frente a una regla de corte casera o una alternativa tipo Ubermann?",
    answer: "Depende del uso, pero la ProFix 126 tiene sentido cuando buscas una guia de corte recto mas repetible, portable y enfocada en trabajo real con sierra circular. Si comparas con soluciones tipo regla casera o referencias Ubermann, conviene mirar estabilidad, longitud, ajuste y compatibilidad."
  }
];

// Genera el schema FAQPage dinámicamente
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const FAQItem = ({ item }: { item: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border border-gris-200 rounded-lg mb-4 overflow-hidden"
    >
      <CollapsibleTrigger className="flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-gris-50 transition-colors">
        <h3 className="text-lg font-medium text-gris-900">{item.question}</h3>
        {isOpen ? (
          <Minus className="h-5 w-5 text-naranja-600 flex-shrink-0" />
        ) : (
          <Plus className="h-5 w-5 text-naranja-600 flex-shrink-0" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-6 py-4 bg-gris-50">
          <p className="text-gris-700">{item.answer}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const FAQ = () => {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Preguntas Frecuentes</h2>
          <p className="text-center text-gris-600 max-w-2xl mx-auto mb-12">
            Respuestas a las dudas mas comunes sobre nuestra guia de corte recto <span className="text-black font-bold">ProFix 126</span>,
            especialmente para quienes buscan una guia de corte para sierra circular, una guia de aluminio o compatibilidad por marca.
          </p>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <article className="bg-gris-50 border border-gris-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">Compra y despacho</h3>
              <p className="text-sm text-gris-700">
                Ideal para quien llega preguntando si hay stock, si existe link directo o donde comprar en Chile.
              </p>
            </article>
            <article className="bg-gris-50 border border-gris-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">Usos reales</h3>
              <p className="text-sm text-gris-700">
                Responde consultas sobre sierra circular, melamina, MDF, madera, tableros y trabajo repetible.
              </p>
            </article>
            <article className="bg-gris-50 border border-gris-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">Compatibilidad responsable</h3>
              <p className="text-sm text-gris-700">
                Aclara dudas con marcas como Ubermann, Makita, Bosch o DeWalt sin prometer compatibilidad universal.
              </p>
            </article>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqData.map((item, index) => (
              <FAQItem key={index} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
