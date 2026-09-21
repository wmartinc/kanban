import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": import.meta.dirname + "/src",
      "@Components": import.meta.dirname + "/src/Componentes",
      "@Store": import.meta.dirname + "/src/store",
      "@Utils": import.meta.dirname + "/src/Utils"
    }
  }
})
