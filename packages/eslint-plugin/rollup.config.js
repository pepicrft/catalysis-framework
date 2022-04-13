import path from 'pathe'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const coreExternal = [...(await external(__dirname))]

  return [
    {
      input: path.join(__dirname, 'src/index.ts'),
      output: [
        {
          file: path.join(distDir(__dirname), 'index.js'),
          format: 'cjs',
          exports: 'auto',
          sourcemap: 'inline',
        },
      ],
      plugins: plugins(__dirname),
      external: coreExternal,
    },
  ]
}

export default configuration
