import path from 'pathe'
import alias from '@rollup/plugin-alias'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const createAppPlugins = [
  alias({
    entries: [
      {
        find: '@gestaltjs/core/framework',
        replacement: path.join(__dirname, '../core/src/framework/index.ts'),
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
  const createAppExternal = [...(await external(__dirname))]

  return [
    {
      input: path.join(__dirname, 'src/commands/init.ts'),
      output: [
        {
          file: path.join(distDir(__dirname), 'commands/init.js'),
          format: 'esm',
          exports: 'auto',
        },
      ],
      plugins: createAppPlugins,
      external: createAppExternal,
    },
    {
      input: path.join(__dirname, 'src/index.ts'),
      output: [
        {
          file: path.join(distDir(__dirname), 'index.js'),
          format: 'esm',
          exports: 'auto',
        },
      ],
      plugins: createAppPlugins,
      external: createAppExternal,
    },
  ]
}

export default configuration
