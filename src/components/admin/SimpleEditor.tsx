import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface SimpleEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
}

/**
 * Editor de texto simple como alternativa a TinyMCE
 */
const SimpleEditor: React.FC<SimpleEditorProps> = ({
  value,
  onChange,
  height = 500,
  placeholder = 'Escribe tu contenido aquí...'
}) => {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="font-mono text-sm"
      style={{ minHeight: `${height}px` }}
    />
  );
};

export default SimpleEditor;