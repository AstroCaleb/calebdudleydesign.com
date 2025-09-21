import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      // Map "src" to the project src directory using a file URL for ESM compatibility
      src: new URL('./src', import.meta.url).pathname,
    },
  },
  appType: 'spa',
  build: {
    sourcemap: mode === 'development',
    cssMinify: true,
  },
  css: {
    devSourcemap: mode === 'development',
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
  server: {
    port: 3000,
  },
}));
