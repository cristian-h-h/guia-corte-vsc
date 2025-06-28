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
    question: "¿De qué material es la guía?",
    answer: "La Guía de corte ajustable es de aluminio de primera calidad y PVC ABS."
  },
  {
    question: "¿Desde qué medida puedo usar para realizar cortes?",
    answer: "Puedes utilizar la Guía de corte ajustable desde los 10 cms hasta 1,26 metros."
  },
  {
    question: "¿Para qué más la puedo utilizar?",
    answer: "Así como la puedes utilizar como guía de corte, también la puedes utilizar como prensa carpintera para armado de muebles y todo tipo de materiales que requieran de un apriete."
  },
  {
    question: "¿Hacen envíos a domicilio?",
    answer: "Se realizan envíos a domicilio tanto en región metropolitana como a cualquier región de Chile. Se utiliza Starken, Bluexpress, puedes recibir en tu domicilio o retirar en agencias."
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
  Respuestas a las dudas más comunes sobre nuestra Guía de Corte Ajustable <span className="text-black font-bold">ProFix 126</span>
</p>
          
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
