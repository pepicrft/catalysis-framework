import { defineConfig } from 'vite'
import { join as pathJoin } from 'pathe'

// eslint-disable-next-line import/no-default-export
export default function config() {
  return defineConfig({
    resolve: {
      alias: [
        {
          find: new RegExp('^@gestaltjs/(.+)/(.+)/(.+)/(.+)$'),
          replacement: pathJoin(
            __dirname,
            '../packages/$1/src/public/$2/$3/$4.ts'
          ),
        },
        {
          find: new RegExp('^@gestaltjs/(.+)/(.+)/(.+)$'),
          replacement: pathJoin(
            __dirname,
            '../packages/$1/src/public/$2/$3.ts'
          ),
        },
      ],
    },
  })
}
