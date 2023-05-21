import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "vite-plugin-node-stdlib-browser";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

export default defineConfig({
  /*   resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
  }, */
  plugins: [react(), nodePolyfills()],
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
});
