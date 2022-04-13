import path from 'pathe'
import fg from 'fast-glob'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const options = {
    plugins: plugins(__dirname),
    external: [...(await external(__dirname))],
  }
  return [
    {
      input: await fg(path.join(__dirname, 'src/cli/commands/db/**/*.ts'), {
        ignore: path.join(__dirname, 'src/cli/commands/db/**/*.test.ts'),
      }),
      output: [
        {
          dir: path.join(distDir(__dirname), 'cli/commands/db'),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
        },
      ],
      ...options,
    },
  ]
}

export default configuration
