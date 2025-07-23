import React from 'react';

/**
 * Componente SkipLink para mejorar la navegación por teclado
 * Permite a los usuarios saltar directamente al contenido principal
 */
const SkipLink: React.FC = () => {
  return (
    <a 
      href="#main-content" 
      className="skip-link"
      aria-label="Saltar al contenido principal"
    >
      Saltar al contenido principal
    </a>
  );
};

export default SkipLink;