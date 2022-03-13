import path from 'pathe'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const coreExternal = [...(await external(__dirname))]

  return [
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
      input: path.join(__dirname, 'src/cli/logger/transport.ts'),
      output: [
        {
          file: path.join(distDir(__dirname), 'cli/logger/transport.js'),
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
}

export default configuration
