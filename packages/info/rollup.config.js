import * as path from 'pathe'
import fg from 'fast-glob'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const options = {
    plugins: plugins(__dirname),
    external: [...(await external(__dirname))],
  }
  return [
    {
      input: await fg(path.join(__dirname, 'src/node/commands/**/*.ts'), {
        ignore: path.join(__dirname, 'src/node/commands/**/*.test.ts'),
      }),
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
      ...options,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
