import * as path from 'pathe'
import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const netlifyPluginExternal = [...(await external(__dirname))]
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
      external: netlifyPluginExternal,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
