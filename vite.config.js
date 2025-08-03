// vite.config.js
import { defineConfig } from 'vite';

const isGitHubPages = process.env.DEPLOY_ENV === 'github';

export default defineConfig({
  base: isGitHubPages ? '/high-school-portal/' : '/',
});
