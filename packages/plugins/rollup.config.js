import path from 'pathe'
import dts from 'rollup-plugin-dts'
import fg from 'fast-glob'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const options = {
    plugins: plugins(__dirname),
    external: [...(await external(__dirname))],
  }
  return [
    {
      input: path.join(__dirname, 'src/runtime/index.ts'),
      output: [
        {
          file: path.join(distDir(__dirname), 'runtime/index.js'),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
        },
      ],
      ...options,
    },
    {
      input: await fg(path.join(__dirname, 'src/cli/commands/**/*.ts'), {
        ignore: path.join(__dirname, 'src/cli/commands/**/*.test.ts'),
      }),
      output: [
        {
          dir: path.join(distDir(__dirname), 'cli/commands/plugins'),
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
