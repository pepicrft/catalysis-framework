import path from 'pathe'
import dts from 'rollup-plugin-dts'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const reactPluginExternal = [...(await external(__dirname))]
  return [
    {
      input: path.join(__dirname, 'src/cli/index.ts'),
      output: [
        {
          file: path.join(distDir(__dirname), 'cli/index.js'),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
        },
      ],
      plugins: plugins(__dirname),
      external: reactPluginExternal,
    },
  ]
}

export default configuration
