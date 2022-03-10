import path from 'pathe'
import packageJson from './package.json'
import fg from 'fast-glob'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const options = {
    plugins: plugins(__dirname),
    external: [...(await external(__dirname))],
  }
  return [
    {
      input: await fg(
        path.join(__dirname, 'src/cli/commands/**/*.ts'),
        `!${path.join(__dirname, 'src/cli/commands/**/*.test.ts')}`
      ),
      output: [
        {
          dir: path.join(distDir(__dirname), 'cli/commands'),
          format: 'esm',
          exports: 'auto',
        },
      ],
      ...options,
    },
    {
      input: path.join(__dirname, 'src/cli/logger/transport.ts'),
      output: [
        {
          dir: path.join(distDir(__dirname), 'cli/logger/transport.js'),
          format: 'esm',
          exports: 'auto',
        },
      ],
      ...options,
    },
  ]
}

export default configuration
