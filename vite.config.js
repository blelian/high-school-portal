import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  // Base path for GitHub Pages or local
  base: process.env.GITHUB_PAGES ? '/high-school-portal/' : './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './components'),
    },
  },

  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'data/*.json', // copy JSON files to dist/data
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

  publicDir: false, // prevent vite from expecting a public folder
});
