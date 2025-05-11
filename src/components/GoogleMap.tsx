import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface LocationProps {
  address: string;
  postalCode: string;
  lat: number;
  lng: number;
}

interface GoogleMapProps {
  location: LocationProps;
}

export const GoogleMap = ({ location }: GoogleMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiError, setApiError] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    if (!mapRef.current) return;

    const encodedAddress = encodeURIComponent(location.address);

    // Crear el iframe para Google Maps Embed API
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&key=${apiKey}`;
    iframe.style.border = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.borderRadius = "0.5rem";

    iframe.onload = () => setMapLoaded(true);
    iframe.onerror = () => setApiError(true);

    // Limpiar el contenido previo y agregar el iframe
    mapRef.current.innerHTML = "";
    mapRef.current.appendChild(iframe);

    // Limpieza al desmontar el componente
    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = "";
      }
    };
  }, [location, apiKey]);

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-naranja-600 text-white">
          <h3 className="text-xl font-semibold flex items-center">
            <MapPin className="mr-2 h-5 w-5" /> Nuestra ubicación
          </h3>
        </div>

        {apiError && (
          <div className="p-6 text-center">
            <p className="text-red-500 mb-2">
              No se pudo cargar el mapa. Verifica tu conexión a internet o la configuración de la clave API.
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-naranja-600 hover:underline"
            >
              Ver en Google Maps
            </a>
          </div>
        )}

        <div
          ref={mapRef}
          className="h-96 w-full relative"
          aria-label="Mapa de ubicación"
        >
          {!mapLoaded && !apiError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gris-100">
              <div className="flex flex-col items-center">
                <MapPin className="h-10 w-10 text-naranja-600 animate-bounce" />
                <p className="mt-2 text-gris-600">Cargando mapa...</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <p className="font-medium">{location.address}</p>
          <p className="text-gris-600">Código Postal: {location.postalCode}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-naranja-600 hover:underline"
          >
            Ver en Google Maps
          </a>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800">
        <p>
          <strong>Nota:</strong> Para ver correctamente el mapa, es necesario configurar una clave de API de Google Maps.
        </p>
      </div>
    </div>
  );
};
