import { execSync } from "child_process";

const steps = [
  ["SSR build", "vite build --ssr src/entry-server.tsx --outDir dist-server"],
  ["Prerender general", "node scripts/prerender.js"],
  ["Prerender blog", "node scripts/prerender-blog.js"],
  ["Generar sitemap", "node scripts/generate-sitemap.js"],
];

for (const [label, command] of steps) {
  console.log(`\n== ${label} ==`);
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`\nPostbuild fallo en el paso: ${label}`);
    console.error(`Comando: ${command}`);
    throw error;
  }
}
