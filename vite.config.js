import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { chromeExtension } from "vite-plugin-chrome-extension";
import ViteComponents from "vite-plugin-components";

import ViteIcons from "vite-plugin-icons";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  build: {
    rollupOptions: {
      input: "src/manifest.json"
    }
  },
  plugins: [
    vue(),
    ViteComponents({
      extensions: ["vue"],
      customComponentResolvers: [
        // ViteIconsResolver({
        //   componentPrefix: ""
        // })
      ]
    }),
    ViteIcons(),
    chromeExtension()
  ]
});