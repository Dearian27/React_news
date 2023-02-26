import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/React_news/', 
  // base: '/',
  plugins: [react()],
  build: {
    outDir: 'build'
  }
})
