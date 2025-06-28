
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

// Datos simulados de testimonios de clientes
export const testimonials = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    profession: "Carpintero profesional",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80",
    comment: "La guía de corte en su material de aluminio, ha revolucionado mi taller. Consigo cortes perfectos en la mitad de tiempo. Increíble precisión y facilidad de uso para todos mis proyectos profesionales.",
    rating: 5
  },
  {
    id: 2,
    name: "Ana Martínez",
    profession: "Diseñadora de interiores",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&q=80",
    comment: "Como diseñadora, necesito que mis contratistas trabajen con precisión. Les recomendé la guía ProFix 126 para la realizacion de cortes rectos y la diferencia en acabado y detalle ha sido notable en todos los proyectos.",
    rating: 5
  },
  {
    id: 3,
    name: "Roberto Gómez",
    profession: "Aficionado al bricolaje",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&q=80", 
    comment: "Nunca había conseguido cortes tan perfectos como ahora con mi guía de corte ProFix 126. Es increíble lo que puedo crear en mi pequeño taller de casa con esta herramienta.",
    rating: 5
  },
  {
    id: 4,
    name: "María López",
    profession: "Restauradora de muebles",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&q=80",
    comment: "Para mi trabajo de restauración, la precisión es fundamental. La guía de corte ProFix 126 me permite replicar piezas antiguas con exactitud milimétrica. Una inversión que vale cada peso.",
    rating: 5
  },
  {
    id: 5,
    name: "Miguel Fernández",
    profession: "Fabricante de muebles",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&q=80",
    comment: "Tengo un taller pequeño y esta guía ha multiplicado mi productividad. Puedo hacer cortes que antes requerían máquinas mucho más caras. La recomiendo a todos mis colegas.",
    rating: 5
  },
  {
    id: 6,
    name: "Laura Sánchez",
    profession: "Docente de carpintería",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&q=80",
    comment: "Utilizo la guía de corte ProFix 126 en mis clases de carpintería. Los alumnos aprenden mucho más rápido y consiguen resultados profesionales desde el primer día. Una herramienta educativa fantástica.",
    rating: 5
  },
  {
    id: 7,
    name: "Pedro Alarcón",
    profession: "Contratista",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&q=80",
    comment: "Para instalaciones en obra, la guía de corte ProFix 126 nos ha permitido hacer ajustes perfectos sin tener que volver al taller. Ahorramos tiempo y el cliente queda más satisfecho con los acabados.",
    rating: 5
  },
  {
    id: 8,
    name: "Carmen Ortiz",
    profession: "Artesana",
    image: "https://images.unsplash.com/photo-1613145997970-db84a7975fbb?w=300&h=300&fit=crop&q=80",
    comment: "Mis proyectos artesanales han dado un salto de calidad desde que utilizo la guía de corte ProFix 126. Consigo precisión en materiales que antes me resultaban difíciles de trabajar.",
    rating: 5
  },
  {
    id: 9,
    name: "Javier Méndez",
    profession: "Constructor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&q=80",
    comment: "He probado muchas guías de corte en mi carrera, pero ninguna tan versátil y precisa como ésta. La capacidad de ajuste rápido nos permite ser mucho más eficientes en obra y en cada proyecto que comienzo.",
    rating: 5
  },
  {
    id: 10,
    name: "Sofía Ramírez",
    profession: "Diseñadora de muebles",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&q=80",
    comment: "La precisión de la guía de corte ProFix 126 me permite materializar mis diseños exactamente como los concibo. Es una herramienta indispensable para cualquier persona creativa en carpintería.",
    rating: 5
  },
  {
    id: 11,
    name: "Antonio Vega",
    profession: "Técnico en escenografía",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&q=80",
    comment: "Para nuestros decorados teatrales, necesitamos precisión y rapidez. La guía de corte recto ProFix 126 nos permite cumplir plazos ajustados sin sacrificar la calidad del acabado final.",
    rating: 5
  },
  {
    id: 12,
    name: "Elena Torres",
    profession: "Propietaria de tienda de manualidades",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&h=300&fit=crop&q=80",
    comment: "Recomendamos la guía de corte recto ProFix 126 a todos nuestros clientes de bricolaje avanzado. Los comentarios siempre son positivos y vuelven a la tienda para contarnos sus proyectos exitosos.",
    rating: 5
  }
];

// Componente para mostrar estrellas de calificación
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-naranja-500" : "text-gris-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
    </div>
  );
};

const TestimonialsCarousel = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const handleSelect = () => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
  };

  return (
    <div className="py-16 bg-gris-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-gris-600 max-w-2xl mx-auto">
  Descubre por qué carpinteros profesionales y aficionados al bricolaje confían en la Guía de Corte recto <span className="text-black font-bold">ProFix 126</span> para sus proyectos de precisión.
</p>
        </div>
        
        <div className="mx-auto max-w-5xl px-8">
          <Carousel
            setApi={setApi}
            className="w-full"
            onSelect={handleSelect}
            opts={{
              loop: true,
              align: "start",
            }}
          >
          <CarouselContent>
            {Array.isArray(testimonials) && testimonials.map((testimonial) => (
               <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 px-2">
                  <Card className="border-none shadow-md h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img
                              src={testimonial.image}
                              alt={`Foto de ${testimonial.name}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-sm text-gris-500">{testimonial.profession}</p>
                          </div>
                        </div>
                        <Quote size={18} className="text-naranja-500 opacity-70" />
                      </div>
                      <p className="text-gris-700 flex-grow mb-4">
                        "{testimonial.comment}"
                      </p>
                      <div className="mt-auto">
                        <StarRating rating={testimonial.rating} />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-8 gap-2">
              <CarouselPrevious className="static translate-y-0 h-9 w-9" />
              <span className="text-sm text-gris-500">
                {current + 1} / {count || testimonials.length}
              </span>
              <CarouselNext className="static translate-y-0 h-9 w-9" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
