import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite compiles this config with esbuild, which follows relative TypeScript
// imports — so the build reads the same route table the app does instead of a
// second copy that would quietly drift from it.
import { ROUTES, SITE, cardPath } from './src/data/seo.ts';
import { prerender } from './tools/prerender.mjs';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Writes dist/<route>/index.html per route so crawlers, which never run
    // the bundle, get that route's title, description and card.
    prerender({ routes: ROUTES, site: SITE, cardPath }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
