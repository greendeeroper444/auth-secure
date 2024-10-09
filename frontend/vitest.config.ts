import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Use jsdom for DOM-based testing
    setupFiles: './vitest.setup.ts', // Setup file for vitest
    globals: true, // Ensure global variables like describe, it are available
  },
});
