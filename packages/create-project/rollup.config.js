import * as path from 'pathe'
import alias from '@rollup/plugin-alias'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const createProjectPlugins = [
  alias({
    entries: [
      {
        find: '@gestaltjs/core/cli',
        replacement: path.join(__dirname, '../core/src/node/index.ts'),
      },
    ],
  }),
  ...plugins(__dirname),
]

const configuration = async () => {
  const createProjectExternal = [...(await external(__dirname))]

  return [
    {
      input: path.join(__dirname, 'src/node/commands/init.ts'),
      output: [
        {
          file: path.join(distDir(__dirname), 'node/commands/init.js'),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
        },
      ],
      plugins: createProjectPlugins,
      external: createProjectExternal,
    },
    {
      input: path.join(__dirname, 'src/node/index.ts'),
      output: [
        {
          file: path.join(distDir(__dirname), 'node/index.js'),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
        },
      ],
      plugins: createProjectPlugins,
      external: createProjectExternal,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
