import { defineConfig } from "astro/config";

export default defineConfig({
  srcDir: "./authoring/layout",
  outDir: "./dist",
  build: {
    format: "directory"
  }
});
