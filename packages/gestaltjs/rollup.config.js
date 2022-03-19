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
        },
      ],
      plugins: [...plugins(__dirname)],
      external: [...(await external(__dirname))],
    },
    {
      input: [path.join(__dirname, 'src/framework/support.ts')],
      output: [
        {
          dir: path.join(distDir(__dirname), 'framework'),
          format: 'esm',
        },
      ],
      plugins: [...plugins(__dirname)],
      external: [...(await external(__dirname))],
    },
    {
      input: [path.join(__dirname, 'src/framework/support.ts')],
      output: [
        {
          dir: path.join(distDir(__dirname), 'framework'),
          format: 'esm',
        },
      ],
      plugins: [dts()],
      external: [...(await external(__dirname))],
    },
    {
      input: [path.join(__dirname, 'src/framework/configuration.ts')],
      output: [
        {
          dir: path.join(distDir(__dirname), 'framework'),
          format: 'esm',
        },
      ],
      plugins: [...plugins(__dirname)],
      external: [...(await external(__dirname))],
    },
    {
      input: [path.join(__dirname, 'src/framework/configuration.ts')],
      output: [
        {
          dir: path.join(distDir(__dirname), 'framework'),
          format: 'esm',
        },
      ],
      plugins: [dts()],
      external: [...(await external(__dirname))],
    },
  ]
}

export default configuration
