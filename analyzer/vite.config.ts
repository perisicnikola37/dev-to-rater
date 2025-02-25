import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      template: 'sunburst',
      filename: 'stats.html',
    }),
    tailwindcss(),
    compression(),
  ],
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
      },
      output: {
        comments: false,
      },
    },
    rollupOptions: {
      onwarn(warning) {
        if (warning.message.includes('"use client"')) return
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules'))
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
})
