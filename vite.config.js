import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  // Base path for GitHub Pages deployment
  // Make sure to replace 'high-school-portal' with your repo name
  base: '/high-school-portal/',

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
          src: 'data/*.json',  // source files in your project
          dest: 'data',         // destination folder in 'dist'
        },
      ],
    }),
  ],

  build: {
    rollupOptions: {
      // Entry point for your app
      input: path.resolve(__dirname, 'index.html'),
    },

    // Output directory
    outDir: 'dist',
    emptyOutDir: true,
  },

  // Treat 'public' as normal Vite public folder
  publicDir: 'public',
});
