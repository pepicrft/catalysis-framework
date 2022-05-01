import path from 'pathe'
import dts from 'rollup-plugin-dts'

import { external, plugins, distDir } from '../../configurations/rollup.config'
import fg from 'fast-glob'

const configuration = async () => {
  const reactPluginExternal = [
    ...(await external(__dirname)),
    'react-dom/server',
  ]
  return [
    {
      input: [path.join(__dirname, 'src/index.ts')],
      output: [
        {
          dir: distDir(__dirname),
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

// eslint-disable-next-line import/no-default-export
export default configuration
