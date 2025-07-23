import React, { createContext, useState, useContext, useEffect } from 'react';

// Definir los tipos para las opciones de accesibilidad
export interface AccessibilityOptions {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  dyslexicFont: boolean;
}

// Definir el tipo para el contexto
interface AccessibilityContextType {
  options: AccessibilityOptions;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReduceMotion: () => void;
  toggleDyslexicFont: () => void;
  resetOptions: () => void;
}

// Valores por defecto
const defaultOptions: AccessibilityOptions = {
  highContrast: false,
  largeText: false,
  reduceMotion: false,
  dyslexicFont: false,
};

// Crear el contexto
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// Proveedor del contexto
export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para las opciones de accesibilidad
  const [options, setOptions] = useState<AccessibilityOptions>(() => {
    // Intentar cargar las opciones guardadas en localStorage
    const savedOptions = localStorage.getItem('accessibility-options');
    return savedOptions ? JSON.parse(savedOptions) : defaultOptions;
  });

  // Guardar las opciones en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('accessibility-options', JSON.stringify(options));
    
    // Aplicar clases CSS basadas en las opciones
    document.documentElement.classList.toggle('high-contrast', options.highContrast);
    document.documentElement.classList.toggle('large-text', options.largeText);
    document.documentElement.classList.toggle('reduce-motion', options.reduceMotion);
    document.documentElement.classList.toggle('dyslexic-font', options.dyslexicFont);
    
    // Actualizar la preferencia de reducción de movimiento a nivel del sistema
    if (options.reduceMotion) {
      document.documentElement.style.setProperty('--reduce-motion', 'reduce');
    } else {
      document.documentElement.style.removeProperty('--reduce-motion');
    }
  }, [options]);

  // Funciones para cambiar las opciones
  const toggleHighContrast = () => {
    setOptions(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleLargeText = () => {
    setOptions(prev => ({ ...prev, largeText: !prev.largeText }));
  };

  const toggleReduceMotion = () => {
    setOptions(prev => ({ ...prev, reduceMotion: !prev.reduceMotion }));
  };

  const toggleDyslexicFont = () => {
    setOptions(prev => ({ ...prev, dyslexicFont: !prev.dyslexicFont }));
  };

  const resetOptions = () => {
    setOptions(defaultOptions);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        options,
        toggleHighContrast,
        toggleLargeText,
        toggleReduceMotion,
        toggleDyslexicFont,
        resetOptions,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility debe ser usado dentro de un AccessibilityProvider');
  }
  return context;
};