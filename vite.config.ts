import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) {
            return 'react-vendor';
          }

          if (
            id.includes('/node_modules/framer-motion/') ||
            id.includes('/node_modules/motion-dom/') ||
            id.includes('/node_modules/motion-utils/')
          ) {
            return 'motion-vendor';
          }

          if (
            id.includes('/node_modules/gsap/') ||
            id.includes('/node_modules/lenis/') ||
            id.includes('/node_modules/split-type/')
          ) {
            return 'gsap-vendor';
          }

          if (
            id.includes('/node_modules/remotion/') ||
            id.includes('/node_modules/@remotion/')
          ) {
            return 'remotion-vendor';
          }

          return undefined;
        },
      },
    },
  },
});
