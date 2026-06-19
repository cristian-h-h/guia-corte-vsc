import { spawnSync } from "child_process";

const steps = [
  ["SSR build", "vite build --ssr src/entry-server.tsx --outDir dist-server"],
  ["Prerender general", "node scripts/prerender.js"],
  ["Prerender blog", "node scripts/prerender-blog.js"],
  ["Generar sitemap", "node scripts/generate-sitemap.js"],
];

for (const [label, command] of steps) {
  console.log(`\n== ${label} ==`);
  const result = spawnSync(command, {
    shell: true,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (result.status !== 0) {
    console.error(`\nPostbuild fallo en el paso: ${label}`);
    console.error(`Comando: ${command}`);
    console.error(`Exit code: ${result.status}`);

    if (result.signal) {
      console.error(`Signal: ${result.signal}`);
    }

    throw new Error(
      `Postbuild fallo en "${label}" (exit ${result.status ?? "unknown"})`
    );
  }
}
