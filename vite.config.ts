import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Permite que el servidor sea accesible desde otras redes
    port: 8080, // Cambia el puerto al 8080
  },
  plugins: [
    react(), // Plugin para React con SWC
    mode === "development" && componentTagger(), // Solo activa lovable-tagger en desarrollo
  ].filter(Boolean), // Filtra valores falsos para evitar errores
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias para rutas absolutas
    },
  },
}));
