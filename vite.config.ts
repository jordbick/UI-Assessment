import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";
import terser from "@rollup/plugin-terser";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({
      insertTypesEntry: true,
    }),
    cssInjectedByJsPlugin(),
    terser(),
  ],
  resolve: {
    alias: {
      url: "url/",
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "UiAssessment",
      formats: ["es", "cjs"],
      fileName: (format) => `ui-assessment.${format}.js`,
    },
    rollupOptions: {
      plugins: [visualizer({ open: false })],
      external: ["react", "react-dom"],
      onwarn(warning, warn) {
        // Suppress "Module level directives cause errors when bundled" warnings
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
