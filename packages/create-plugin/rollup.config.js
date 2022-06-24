import * as path from 'pathe'
import alias from '@rollup/plugin-alias'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const createPluginPlugins = [
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
  const createPluginExternal = [...(await external(__dirname))]

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
      plugins: createPluginPlugins,
      external: createPluginExternal,
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
      plugins: createPluginPlugins,
      external: createPluginExternal,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
