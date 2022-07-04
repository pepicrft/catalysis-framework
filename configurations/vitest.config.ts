import { defineConfig } from 'vite'
import { join as pathJoin } from 'pathe'

// eslint-disable-next-line import/no-default-export
export default function config(packageDir: string) {
  return defineConfig({
    resolve: {
      alias: [
        {
          find: new RegExp('^@gestaltjs/(.+)/(.+)/(.+)$'),
          replacement: pathJoin(packageDir, '../$1/src/$2/$3.ts'),
        },
        {
          find: new RegExp('^\\$(.*)$'),
          replacement: pathJoin(packageDir, './src/$1.ts'),
        },
      ],
    },
  })
}
