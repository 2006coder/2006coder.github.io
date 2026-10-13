import katex from "katex";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), {
    name: "latex-equations",
    enforce: "pre",
    transform(code, id) {
      if (id.includes("katex/dist/katex.min.css")) {
        return code.replace(/src:([^;}]+)/g, (source, urls) =>
          "src:" + (urls.split(",").find((url: string) => url.includes("woff2")) || urls));
      }
      if (!id.endsWith("/SfmPage.tsx")) return;
      let converted = 0;
      const result = code.replace(/<Equation(\s+display)?\s*>\s*\{String.raw`([^`]*)`\}\s*<\/Equation>/g, (_, display, tex) => {
        converted++;
        const html = katex.renderToString(tex, {
          displayMode: Boolean(display), output: "htmlAndMathml",
          macros: { "\\R": "\\mathbb{R}", "\\norm": "\\left\\lVert#1\\right\\rVert", "\\bx": "\\mathbf{x}", "\\bX": "\\mathbf{X}", "\\bC": "\\mathbf{C}" }, throwOnError: true, trust: false,
        });
        return `<Equation${display ? " display" : ""}>{${JSON.stringify(html)}}</Equation>`;
      });
      if (converted !== (code.match(/<Equation\b/g) || []).length) {
        throw new Error("Use <Equation>{String.raw`...`}</Equation> or <Equation display>{String.raw`...`}</Equation> for every equation in SfmPage.tsx.");
      }
      return result;
    },
  }],
  build: {
    modulePreload: false,
    rollupOptions: {
      input: [
        "index.html",
        "lance.html",
        "sfm.html",
        "sysadmin.html",
        "librechat.html",
      ],
    },
  },
});
