import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// [react ()]

// https://vitejs.dev/config/
export default defineConfig({
  base: "/skyblock-items-search/",
  plugins: [react()],
})
