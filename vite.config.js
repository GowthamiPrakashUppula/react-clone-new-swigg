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
      // Optional: Configure proxy for API calls if needed
      proxy: {
        // If your API is on a different domain, configure proxy here
        // '/api': {
        //   target: env.VITE_API_URL || 'https://backend-nodejs-suby.onrender.com',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        // }
      }
    },
    preview: {
      port: 8000,
      host: true
    }
  };
})
