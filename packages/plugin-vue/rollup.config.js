import path from 'pathe'
import dts from 'rollup-plugin-dts'

import { external, plugins, distDir } from '../../configurations/rollup.config'
import fg from 'fast-glob'

const configuration = async () => {
  const vuePluginExternal = [...(await external(__dirname))]
  return [
    {
      input: await fg(path.join(__dirname, 'src/renderer/**/*.ts'), {
        ignore: path.join(__dirname, 'src/renderer/**/*.test.ts'),
      }),
      output: [
        {
          dir: path.join(distDir(__dirname), 'renderer'),
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
