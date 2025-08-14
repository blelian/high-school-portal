import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/high-school-portal/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './components'),
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'components/*.js',  // copy all JS files from components folder
          dest: 'components',      // into dist/components
        },
        {
          src: 'data/*.json',      // copy JSON files as before
          dest: 'data',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // main entry
    },
  },
});
