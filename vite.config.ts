import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Permite que el servidor sea accesible desde otras redes
    port: 8080, // Cambia el puerto al 8080
  },
  plugins: [
    react(), // Plugin para React
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias para rutas absolutas
    },
  },
});
