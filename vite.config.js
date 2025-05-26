import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '6c52-2401-4900-8821-f4f2-d1dd-ace1-c1b0-1123.ngrok-free.app'
    ]
  }
})
