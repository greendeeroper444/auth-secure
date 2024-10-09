import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true, // Ensures global variables like describe, it are available
    // Optionally extend or override configDefaults if needed
    exclude: [...configDefaults.exclude, 'node_modules/**/*'],
  },
})
