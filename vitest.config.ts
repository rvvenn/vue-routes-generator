import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    include: ["tests/*.test.ts"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    alias: {
      '@': path.resolve(__dirname, 'src'), // Asegúrate de que coincida con la configuración de Vite
    },
  },
})