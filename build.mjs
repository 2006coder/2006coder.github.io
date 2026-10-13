import { readFile, writeFile, rm } from "node:fs/promises";
import { build } from "vite";

await build({ build: { manifest: true } });
const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
try {
  await build({ build: { ssr: "src/render.tsx", outDir: ".prerender", copyPublicDir: false } });
  const { render } = await import("./.prerender/render.js");
  for (const page of ["index", "lance", "librechat", "sysadmin", "sfm"]) {
    const file = `dist/${page}.html`;
    let html = await readFile(file, "utf8");
    const styles = Object.values(manifest).find(entry => entry.name?.toLowerCase() === `${page}page`)?.css || [];
    html = html.replace("</head>", styles.map(css => `<link rel="stylesheet" href="/${css}">`).join("") + "</head>");
    const content = await render(page);
    await writeFile(file, html.replace('<div id="root"></div>', () => `<div id="root">${content}</div>`));
  }
} finally {
  await rm(".prerender", { recursive: true, force: true });
  await rm("dist/.vite", { recursive: true, force: true });
}
