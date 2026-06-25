import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ExploreAI',
      formats: ['iife'],
      fileName: () => 'explore-ai.min.js',
    },
    minify: 'esbuild',
    cssMinify: true,
    emptyOutDir: true,
    sourcemap: false,
  },
});
