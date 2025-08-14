import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  // Base path for GitHub Pages deployment
  base: '/high-school-portal/', // MUST match your repo name

  // Optional alias for easier imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './components'),
    },
  },

  plugins: [
    // Copy JSON files from 'data' folder to 'dist/data'
    viteStaticCopy({
      targets: [
        {
          src: 'data/*.json',
          dest: 'data',
        },
      ],
    }),
  ],

  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
    outDir: 'dist',
    emptyOutDir: true,
  },

  // Keep public folder for other static assets
  publicDir: 'public',
});
