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
      input: [
        path.join(__dirname, 'src/node/index.ts'),
        path.join(__dirname, 'src/node/commands/init.ts'),
      ],
      output: [
        {
          dir: distDir(__dirname),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
          preserveModules: true,
          preserveModulesRoot: path.join(__dirname, 'src'),
        },
      ],
      plugins: createPluginPlugins,
      external: createPluginExternal,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
