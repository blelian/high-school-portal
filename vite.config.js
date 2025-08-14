import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  // Base path for GitHub Pages deployment
  base: process.env.GITHUB_PAGES ? '/high-school-portal/' : '/',

  // Optional alias for easier imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './components'),
    },
  },

  plugins: [
    // Copy only JSON files from data folder to dist/data
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
      // Entry point for your app
      input: path.resolve(__dirname, 'index.html'),
    },

    // Keep JS modules bundled correctly
    outDir: 'dist',
    emptyOutDir: true,
  },

  // Treat data folder as static assets (optional, for local fetches)
  publicDir: false,
});
