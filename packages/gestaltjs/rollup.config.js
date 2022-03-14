import path from 'pathe'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  return [
    {
      input: [path.join(__dirname, 'src/index.ts')],
      output: [
        {
          dir: distDir(__dirname),
          format: 'esm',
        },
      ],
      plugins: [...plugins(__dirname)],
      external: [...(await external(__dirname))],
    },
  ]
}

export default configuration
