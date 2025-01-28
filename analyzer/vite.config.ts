import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import ViteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImagemin({
      gifsicle: {
        optimizationLevel: 3,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      },
      webp: {
        quality: 75,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries into a separate chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
