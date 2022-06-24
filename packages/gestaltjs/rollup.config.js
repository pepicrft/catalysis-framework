import * as path from 'pathe'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  return [
    {
      input: [path.join(__dirname, 'src/node/index.ts')],
      output: [
        {
          dir: path.join(distDir(__dirname), 'node'),
          format: 'esm',
          sourcemap: 'inline',
        },
      ],
      plugins: [...plugins(__dirname)],
      external: [...(await external(__dirname))],
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
