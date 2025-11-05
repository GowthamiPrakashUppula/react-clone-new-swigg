import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Determine base path from environment
  const basePath = env.VITE_BASE_PATH || '/';
  
  return {
    plugins: [react()],
    base: basePath,
    server: {
      port: 8000,
      host: true, // Allow external access
    },
    preview: {
      port: 8000,
      host: true
    }
  };
})
