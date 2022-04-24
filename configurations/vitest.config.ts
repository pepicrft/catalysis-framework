import { defineConfig } from 'vite'
import { aliases, plugins } from './rollup.config'

// eslint-disable-next-line import/no-default-export
export default function config(packageDir) {
  return defineConfig({
    resolve: {
      alias: aliases(packageDir),
    },
    build: {
      rollupOptions: {
        plugins: plugins(packageDir),
      },
    },
  })
}
