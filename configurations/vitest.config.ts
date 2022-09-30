import { defineConfig } from 'vite'
import { join as pathJoin } from 'pathe'

// eslint-disable-next-line import/no-default-export
export default function config() {
  return defineConfig({
    resolve: {
      alias: [
        {
          find: new RegExp('^@gestaltjs/core/internal/(.+)$'),
          replacement: pathJoin(
            __dirname,
            '../packages/core/src/internal/$1.ts'
          ),
        },
        {
          find: new RegExp('^@gestaltjs/core/(.+)$'),
          replacement: pathJoin(__dirname, '../packages/core/src/public/$1.ts'),
        },
      ],
    },
  })
}
