import * as path from 'pathe'
import alias from '@rollup/plugin-alias'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const createPluginPlugins = [
  alias({
    entries: [
      {
        find: '@gestaltjs/core/runtime',
        replacement: path.join(__dirname, '../core/src/runtime/index.ts'),
      },
      {
        find: '@gestaltjs/core/cli',
        replacement: path.join(__dirname, '../core/src/cli/index.ts'),
      },
    ],
  }),
  ...plugins(__dirname),
]

const configuration = async () => {
  const createPluginExternal = [...(await external(__dirname))]

  return [
    {
      input: path.join(__dirname, 'src/commands/init.ts'),
      output: [
        {
          file: path.join(distDir(__dirname), 'commands/init.js'),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
        },
      ],
      plugins: createPluginPlugins,
      external: createPluginExternal,
    },
    {
      input: path.join(__dirname, 'src/index.ts'),
      output: [
        {
          file: path.join(distDir(__dirname), 'index.js'),
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

export default configuration
