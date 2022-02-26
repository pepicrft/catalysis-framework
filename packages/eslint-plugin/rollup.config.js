import path from 'pathe'
import dts from 'rollup-plugin-dts'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const coreExternal = [...external]

const configuration = () => [
  {
    input: path.join(__dirname, 'src/index.ts'),
    output: [
      {
        file: path.join(distDir(__dirname), 'index.js'),
        format: 'esm',
        exports: 'auto',
      },
    ],
    plugins: plugins(__dirname),
    external: coreExternal,
  },
]

export default configuration
