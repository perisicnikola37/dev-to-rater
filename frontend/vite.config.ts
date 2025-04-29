import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'

const port = Number(process.env.VITE_PORT) || 5173

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      template: 'sunburst',
      filename: 'stats.html',
    }),
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
  server: {
    host: '0.0.0.0',
    port,
  },
  preview: {
    allowedHosts: ['dev-to-rater.xyz', 'localhost', '127.0.0.1'],
  },
})
