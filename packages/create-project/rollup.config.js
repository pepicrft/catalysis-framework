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
      input: [
        path.join(__dirname, 'src/node/commands/init.ts'),
        path.join(__dirname, 'src/node/index.ts'),
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
      plugins: createProjectPlugins,
      external: createProjectExternal,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
