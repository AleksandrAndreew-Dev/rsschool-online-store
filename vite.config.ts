import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/rsschool-online-store/',
  test: {
    environment: 'jsdom',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
