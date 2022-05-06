import * as path from 'pathe'
import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const reactPluginExternal = [
    ...(await external(__dirname)),
    'react-dom/server',
  ]
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
      external: reactPluginExternal,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
