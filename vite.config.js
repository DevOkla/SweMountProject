import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  //base:'/swemounttest/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }, 
  optimizeDeps: {
    include: [
      "@fawmi/vue-google-maps",
      "fast-deep-equal",
    ],
  },
  define: {
    // Define the environment variables as global constants
    // This will replace process.env with the corresponding values
    // at build time
    'process.env': {
      VUE_APP_PASSWORD: (process.env.VUE_APP_PASSWORD),
      VUE_APP_ID: (process.env.VUE_APP_ID),
      VUE_APP_INVOKERID: (process.env.VUE_APP_INVOKERID),

    },
  },
});




