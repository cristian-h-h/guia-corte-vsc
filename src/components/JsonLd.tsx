import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  data: object | object[];
}

/**
 * Componente para añadir datos estructurados JSON-LD
 */
const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};

export default JsonLd;