import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Опции для разработки
  server: {
    port: 3000, // Порт для dev-сервера
  },
});
