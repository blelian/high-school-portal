import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/high-school-portal/' : '/',
  plugins: [
    copy({
      targets: [
        { src: 'components/*.json', dest: 'dist/data' }
      ],
      hook: 'buildStart',
      verbose: true // optional: logs what is copied
    })
  ]
});
