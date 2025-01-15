import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
   alias: {
     "@": path.resolve(__dirname, "./src"),
   },
 },
 base: '/AF_tool_test/',
//  base: '/AF_tool_test/apl_af/',
 
})
