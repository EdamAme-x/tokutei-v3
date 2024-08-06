import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import deno from "@astrojs/deno";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  output: "server",
  adapter: deno({
    start: false,
    port: 8080
  }),
  optimizeDeps: { exclude: ["fsevents"] },
  build: {
    minify: true,
    platform: "node",
  }
});
