import React, { useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Eye, 
  Type, 
  MousePointerClick, 
  BookOpen,
  X,
  Accessibility
} from 'lucide-react';

const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    options, 
    toggleHighContrast, 
    toggleLargeText, 
    toggleReduceMotion, 
    toggleDyslexicFont,
    resetOptions
  } = useAccessibility();

  return (
    <>
      {/* Botón flotante para abrir el panel */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-50 rounded-full p-3 bg-naranja-600 hover:bg-naranja-700 shadow-lg"
        aria-label="Opciones de accesibilidad"
        title="Opciones de accesibilidad"
      >
        <Accessibility className="h-6 w-6" />
      </Button>

      {/* Panel de accesibilidad */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative">
            <Button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 rounded-full"
              variant="ghost"
              aria-label="Cerrar panel de accesibilidad"
            >
              <X className="h-5 w-5" />
            </Button>
            
            <h2 className="text-2xl font-bold mb-4">Opciones de accesibilidad</h2>
            
            <div className="space-y-4">
              {/* Alto contraste */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Alto contraste</span>
                </div>
                <Switch 
                  checked={options.highContrast} 
                  onCheckedChange={toggleHighContrast}
                  aria-label="Activar alto contraste"
                />
              </div>
              
              {/* Texto grande */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Type className="h-5 w-5" />
                  <span>Texto grande</span>
                </div>
                <Switch 
                  checked={options.largeText} 
                  onCheckedChange={toggleLargeText}
                  aria-label="Activar texto grande"
                />
              </div>
              
              {/* Reducir movimiento */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MousePointerClick className="h-5 w-5" />
                  <span>Reducir movimiento</span>
                </div>
                <Switch 
                  checked={options.reduceMotion} 
                  onCheckedChange={toggleReduceMotion}
                  aria-label="Activar reducción de movimiento"
                />
              </div>
              
              {/* Fuente para dislexia */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Fuente para dislexia</span>
                </div>
                <Switch 
                  checked={options.dyslexicFont} 
                  onCheckedChange={toggleDyslexicFont}
                  aria-label="Activar fuente para dislexia"
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={resetOptions}
                  variant="outline" 
                  className="w-full"
                >
                  Restablecer ajustes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityPanel;