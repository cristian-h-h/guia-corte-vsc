import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Permite que el servidor sea accesible desde otras redes
    port: 8080, // Cambia el puerto al 8080
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (id.includes("react-router")) {
            return "router-vendor";
          }

          if (id.includes("@radix-ui")) {
            return "radix-vendor";
          }

          if (id.includes("@supabase")) {
            return "supabase-vendor";
          }

          if (id.includes("tinymce")) {
            return "editor-vendor";
          }

          if (id.includes("lucide-react")) {
            return "icons-vendor";
          }

          if (
            id.includes("react") ||
            id.includes("scheduler") ||
            id.includes("@tanstack") ||
            id.includes("react-helmet-async")
          ) {
            return "react-vendor";
          }

          return "app-vendor";
        },
      },
    },
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
