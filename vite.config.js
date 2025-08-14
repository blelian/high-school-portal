import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/high-school-portal/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './components'),
    },
  },
  publicDir: 'data', // <-- treat your existing 'data' folder as static assets
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // main entry
    },
  },
});
