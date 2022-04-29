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
      input: await fg(path.join(__dirname, 'src/cli/commands/**/*.ts'), {
        ignore: path.join(__dirname, 'src/cli/commands/**/*.test.ts'),
      }),
      output: [
        {
          dir: path.join(distDir(__dirname), 'cli/commands'),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
        },
      ],
      ...options,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
