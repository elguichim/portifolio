import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  base: "/",   // 🔎 garante que o app será servido na raiz
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
