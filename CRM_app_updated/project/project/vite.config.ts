import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/MEDCRM/',
  server: {
    port: 5173,
    host: true
  }
});