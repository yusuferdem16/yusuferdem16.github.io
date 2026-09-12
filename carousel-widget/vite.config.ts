import path from "node:path"
import { fileURLToPath } from "node:url"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      // Two entries: the home page loads the full widget bundle, every other
      // page loads only the animated background.
      input: {
        "carousel-widget": path.resolve(__dirname, "src/main.tsx"),
        "kinetic-bg": path.resolve(__dirname, "src/kinetic-bg.tsx"),
      },
      output: {
        format: "es",
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        chunkFileNames: "shared-[name].js",
      },
    },
  },
})
