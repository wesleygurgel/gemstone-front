import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env variables based on mode
  const env = loadEnv(mode, process.cwd())

  const config = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }

  // Set base path based on environment
  if (mode === 'development') {
    config.base = '/gemstone-front/'
  } else {
    // For 'local' and 'production' environments
    config.base = '/'
  }

  return config
})
