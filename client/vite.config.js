import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Опции для разработки
  server: {
    port: 3005, // Порт для dev-сервера
    host: '0.0.0.0',
  },
});
