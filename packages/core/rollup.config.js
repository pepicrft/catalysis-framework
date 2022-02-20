import path from 'pathe'
import dts from 'rollup-plugin-dts'

import { external, plugins, distDir } from '../../configurations/rollup.config'

/**
 * "piano" and "piano-pretty" use NodeJS thread workers would require custom
 * bundling logic to respect some of their modules' structure and instruct
 * the runtime on where the bundled modules live.
 * To keep things simple, we are treating those as external dependencies that
 * are installed as transitive dependency of @gestaltjs/core
 */
const coreExternal = [...external, 'pino', 'pino-pretty']

const configuration = () => [
  {
    input: path.join(__dirname, 'src/cli/index.ts'),
    output: [
      {
        file: path.join(distDir(__dirname), 'cli/index.js'),
        format: 'esm',
        exports: 'auto',
      },
    ],
    plugins: plugins(__dirname),
    external: coreExternal,
  },
  {
    input: path.join(__dirname, 'src/cli/pino/development-transport.ts'),
    output: [
      {
        file: path.join(
          distDir(__dirname),
          'cli/pino/development-transport.mjs'
        ),
        format: 'esm',
        exports: 'auto',
      },
    ],
    plugins: plugins(__dirname),
    external: coreExternal,
  },
  {
    input: path.join(__dirname, 'src/framework/index.ts'),
    output: [
      {
        file: path.join(distDir(__dirname), 'framework/index.js'),
        format: 'esm',
        exports: 'auto',
      },
    ],
    plugins: plugins(__dirname),
    external: coreExternal,
  },
]

export default configuration
