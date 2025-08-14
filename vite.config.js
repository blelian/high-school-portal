// vite.config.js
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/high-school-portal/' : '/',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'data/*.json',  // copy all JSON files from data/
          dest: 'data'         // into dist/data/
        }
      ]
    })
  ],
  server: {
    // Ensure proper handling of /data/ files locally
    fs: {
      allow: ['.']
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Preserve folder structure for JSON files
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.json')) {
            return 'data/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
