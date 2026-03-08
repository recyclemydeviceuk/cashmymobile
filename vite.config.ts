import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2018',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
