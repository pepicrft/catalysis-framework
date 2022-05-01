import path from 'pathe'
import dts from 'rollup-plugin-dts'

import { external, plugins, distDir } from '../../configurations/rollup.config'
import fg from 'fast-glob'

const configuration = async () => {
  const vuePluginExternal = [
    ...(await external(__dirname)),
    'vue/server-renderer',
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
      external: vuePluginExternal,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
