import { defineConfig } from 'vite'
import path from 'pathe'

// eslint-disable-next-line import/no-default-export
export default function config(packageDir: string) {
  return defineConfig({
    resolve: {
      alias: [
        {
          find: new RegExp('^@gestaltjs/(.+)/(.+)/(.+)$'),
          replacement: path.join(packageDir, '../$1/src/$2/$3.ts'),
        },
        {
          find: new RegExp('^\\$(.*)$'),
          replacement: path.join(packageDir, './src/$1.ts'),
        },
      ],
    },
  })
}
