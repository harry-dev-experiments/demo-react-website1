import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor libraries into a separate chunk so app code
    // and React/react-dom can be cached independently by the browser.
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-scroll': ['react-scroll'],
        },
      },
    },
    // Warn if any individual chunk exceeds 500 kB
    chunkSizeWarningLimit: 500,
  },
})
