import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      "@gestaltjs/core/cli": path.join(__dirname, "packages/core/src/cli/index.ts")
    }
  }
})
