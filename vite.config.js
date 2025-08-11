import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/high-school-portal/' : '/',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'data/*.json',  // source folder for JSON files
          dest: 'data'         // destination folder inside dist/
        }
      ]
    })
  ]
});
