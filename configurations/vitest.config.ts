import { defineConfig } from 'vite'
import { join as pathJoin } from 'pathe'

// eslint-disable-next-line import/no-default-export
export default function config() {
  return defineConfig({
    resolve: {
      alias: [
        {
          find: new RegExp('^@gestaltjs/(.+)/(.+)/(.+)$'),
          replacement: pathJoin(__dirname, '../packages/$1/src/$2/$3.ts'),
        },
      ],
    },
  })
}
