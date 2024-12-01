import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https configuration
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: './localhost-key.pem', // Make sure the path is correct and relative to the config file
      cert: './localhost.pem',    // Make sure the path is correct and relative to the config file
    },
    port: 5173, // Adjust if your React app is running on a different port
  },
});
