import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src' // siempre que use @ siginifa que va a ir a la carpeta /src, es como ./
    }
  }
})
