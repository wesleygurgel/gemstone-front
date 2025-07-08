import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }

  // Adiciona o base path apenas quando estiver em modo de produção (build)
  if (command === 'build') {
    config.base = '/gemstone-front/'
  }

  return config
})