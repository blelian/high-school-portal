import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './', // works for Netlify

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './components'),
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },

  publicDir: 'public', // keep images or CSS
});
