import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      // forward all /api requests to Flask on port 5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // rewrite is optional: e.g. to strip /api prefix if Flask routes omit it
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
