import * as path from 'pathe'
import dts from 'rollup-plugin-dts'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const runtime = async (name) => {
    return [
      {
        input: [path.join(__dirname, `src/runtime/${name}.ts`)],
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
        input: [path.join(__dirname, `src/runtime/${name}.ts`)],
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
    ...(await runtime('support')),
    ...(await runtime('configuration')),
    ...(await runtime('target')),
    ...(await runtime('db')),
    ...(await runtime('plugin')),
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
