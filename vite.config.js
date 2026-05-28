import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": __dirname + "/src",
      "@Components": __dirname + "/src/Componentes",
      "@Store": __dirname + "/src/store",
      "@Utils": __dirname + "/src/Utils"
    }
  }
})
