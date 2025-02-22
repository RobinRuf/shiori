import fs from "node:fs/promises";
import path from "node:path";
import { $ } from "zx";
import { defineConfig } from "tsup";
import svgr from "esbuild-plugin-svgr";
import { defaultEntry } from "./default-entry";
import packageJson from "./package.json";

export default defineConfig({
  name: packageJson.name,
  entry: [...defaultEntry, "!src/icon.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  bundle: false,
  outDir: "dist",
  clean: true,
  external: ["next", "react", "react-dom"],
  esbuildPlugins: [
    svgr({
      exportType: "named",
      typescript: true,
      svgoConfig: {
        plugins: ["removeXMLNS"],
      },
      plugins: ["@svgr/plugin-svgo"],
    }),
  ],
  plugins: [
    {
      name: "strip-node-colon",
      renderChunk(code) {
        const replaced = code.replace(/(?<= from ")node:(.+)(?=";)/g, "$1");
        return { code: replaced };
      },
    },
    {
      name: "strip-dot-svg",
      renderChunk(code) {
        const replaced = code.replace(/(?<= from ")(.+)\.svg(?=";)/g, "$1");
        return { code: replaced };
      },
    },
  ],
  async onSuccess() {
    // Use Tailwind CSS CLI because CSS processing by tsup produce different result
    await $`npx @tailwindcss/cli -i src/docs.css -o dist/docs.css`;
    const styleContent = await fs.readFile(
      path.resolve("dist", "docs.css"),
      "utf8",
    );
    await fs.writeFile(
      path.resolve("dist", "style-prefixed.css"),
      styleContent
        .replace("@layer utilities", "@layer v4-utilities")
        .replace("@layer base", "@layer v4-base")
        .replace(
          "@layer theme, base, components, utilities",
          "@layer theme, v4-base, components, v4-utilities",
        ),
    );
    console.log("✅ `dist/style-prefixed.css` successfully created");
  },
});
