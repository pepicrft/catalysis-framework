import path from 'pathe'
import dts from 'rollup-plugin-dts'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  return [
    {
      input: [path.join(__dirname, 'src/cli/index.ts')],
      output: [
        {
          dir: path.join(distDir(__dirname), 'cli'),
          format: 'esm',
          sourcemap: 'inline',
        },
      ],
      plugins: [...plugins(__dirname)],
      external: [...(await external(__dirname))],
    },
    {
      input: [path.join(__dirname, 'src/runtime/support.ts')],
      output: [
        {
          dir: path.join(distDir(__dirname), 'runtime'),
          format: 'esm',
          sourcemap: 'inline',
        },
      ],
      plugins: [...plugins(__dirname)],
      external: [...(await external(__dirname))],
    },
    {
      input: [path.join(__dirname, 'src/runtime/support.ts')],
      output: [
        {
          dir: path.join(distDir(__dirname), 'runtime'),
          format: 'esm',
          sourcemap: 'inline',
        },
      ],
      plugins: [dts()],
      external: [...(await external(__dirname))],
    },
    {
      input: [path.join(__dirname, 'src/runtime/configuration.ts')],
      output: [
        {
          dir: path.join(distDir(__dirname), 'runtime'),
          format: 'esm',
          sourcemap: 'inline',
        },
      ],
      plugins: [...plugins(__dirname)],
      external: [...(await external(__dirname))],
    },
    {
      input: [path.join(__dirname, 'src/runtime/configuration.ts')],
      output: [
        {
          dir: path.join(distDir(__dirname), 'runtime'),
          format: 'esm',
          sourcemap: 'inline',
        },
      ],
      plugins: [dts()],
      external: [...(await external(__dirname))],
    },
  ]
}

export default configuration
