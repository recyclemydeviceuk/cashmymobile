import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['chrome >= 64', 'edge >= 79', 'firefox >= 67', 'safari >= 12'],
      modernPolyfills: true,
      renderLegacyChunks: true,
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
