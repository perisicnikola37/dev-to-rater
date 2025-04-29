import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: path.resolve(__dirname, 'setupTests.ts'),
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/mocks/**',
        '**/*.d.ts',
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.config.{js,ts}',
        '**/schema/**',
        '**/setupTests.ts',
        '**/vitest.config.ts',
        'src/main.tsx',
        'src/components/ui/fireworks-canvas.tsx',
      ],
      include: [
        '**/src/**/*.{js,ts,jsx,tsx}',
        '!**/src/**/*.test.{js,ts,jsx,tsx}',
        '!**/src/**/*.stories.{js,ts,jsx,tsx}',
      ],
      all: true,
      reportsDirectory: './coverage',
      skipFull: false,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
