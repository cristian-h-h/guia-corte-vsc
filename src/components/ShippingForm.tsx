
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Truck } from "lucide-react";

// Lista de regiones de Chile
const regiones = [
  "Región de Arica y Parinacota",
  "Región de Tarapacá",
  "Región de Antofagasta",
  "Región de Atacama",
  "Región de Coquimbo",
  "Región de Valparaíso",
  "Región Metropolitana",
  "Región de O'Higgins",
  "Región del Maule",
  "Región de Ñuble",
  "Región del Biobío",
  "Región de La Araucanía",
  "Región de Los Ríos",
  "Región de Los Lagos",
  "Región de Aysén",
  "Región de Magallanes",
];

export interface ShippingFormData {
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
  email: string;
  tipoEntrega: string;
  direccion: string;
  comuna: string;
  region: string;
  detalles: string;
}

interface ShippingFormProps {
  onComplete?: (data: ShippingFormData) => void;
  initialData?: ShippingFormData;
  showSubmitButton?: boolean;
}

const ShippingForm = ({ 
  onComplete, 
  initialData,
  showSubmitButton = true 
}: ShippingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ShippingFormData>({
    nombre: "",
    apellido: "",
    rut: "",
    telefono: "",
    email: "",
    tipoEntrega: "domicilio",
    direccion: "",
    comuna: "",
    region: "",
    detalles: "",
  });

  // Inicializar con datos proporcionados si existen
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
  };

  const handleSelectChange = (name: string, value: string) => {
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Información de envío guardada",
      description: "Sus datos de envío han sido registrados correctamente.",
    });
    
    if (onComplete) {
      onComplete(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Truck className="h-5 w-5 text-naranja-600" />
        <h3 className="text-xl font-bold">Información de Envío</h3>
      </div>
      
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
        <p className="text-amber-800 text-sm">
          <strong>Nota:</strong> El costo de envío se paga al recibir el producto. 
          Trabajamos con las agencias Starken y BluExpress.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rut">RUT</Label>
            <Input
              id="rut"
              name="rut"
              value={formData.rut}
              onChange={handleInputChange}
              placeholder="Ej: 12345678-9"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              type="tel"
              placeholder="+569 XXXXXXXX"
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <p className="font-medium mb-3">Tipo de entrega</p>
          <RadioGroup 
            value={formData.tipoEntrega} 
            onValueChange={(value) => handleSelectChange("tipoEntrega", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="domicilio" id="domicilio" />
              <Label htmlFor="domicilio">Entrega a domicilio</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="agencia" id="agencia" />
              <Label htmlFor="agencia">Retiro en agencia</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="direccion">Dirección de entrega</Label>
          <Input
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            required={formData.tipoEntrega === "domicilio"}
            disabled={formData.tipoEntrega !== "domicilio"}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="comuna">Comuna</Label>
            <Input
              id="comuna"
              name="comuna"
              value={formData.comuna}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="region">Región</Label>
            <Select 
              value={formData.region} 
              onValueChange={(value) => handleSelectChange("region", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione región" />
              </SelectTrigger>
              <SelectContent>
                {regiones.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="detalles">Detalles adicionales (opcional)</Label>
          <Textarea
            id="detalles"
            name="detalles"
            value={formData.detalles}
            onChange={handleInputChange}
            placeholder="Instrucciones especiales para la entrega, referencias, etc."
            rows={3}
          />
        </div>
        
        {showSubmitButton && (
          <Button type="submit" className="w-full">
            Guardar información de envío
          </Button>
        )}
      </form>
    </div>
  );
};

export default ShippingForm;
