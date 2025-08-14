import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  // Relative paths for Netlify deployment
  base: './',

  // Optional alias for easier imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './components'),
    },
  },

  plugins: [
    // Copy JSON and JS components to dist
    viteStaticCopy({
      targets: [
        { src: 'data/*.json', dest: 'data' },
        { src: 'components/*.js', dest: 'components' }
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
