import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@gestaltjs/core/cli': path.join(
        __dirname,
        'packages/core/src/cli/index.ts'
      ),
      '@gestaltjs/core/framework': path.join(
        __dirname,
        'packages/core/src/framework/index.ts'
      ),
      '@gestaltjs/core/shared': path.join(
        __dirname,
        'packages/core/src/shared/index.ts'
      ),
      '@gestaltjs/testing': path.join(
        __dirname,
        'packages/testing/src/index.ts'
      ),
    },
  },
})
