import path from 'pathe'
import dts from 'rollup-plugin-dts'

import { external, plugins, distDir } from '../../configurations/rollup.config'
import fg from 'fast-glob'

const configuration = async () => {
  const sveltePluginExternal = [...(await external(__dirname))]
  return [
    {
      input: [path.join(__dirname, 'src/gestalt.plugin.ts')],
      output: [
        {
          dir: distDir(__dirname),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
        },
      ],
      plugins: plugins(__dirname),
      external: sveltePluginExternal,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
