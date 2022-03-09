import path from 'pathe'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const coreExternal = [...external]

const configuration = () => [
  {
    input: path.join(__dirname, 'src/index.ts'),
    output: [
      {
        file: path.join(distDir(__dirname), 'index.js'),
        format: 'cjs',
        exports: 'auto',
      },
    ],
    plugins: plugins(__dirname),
    external: coreExternal,
  },
]

export default configuration
