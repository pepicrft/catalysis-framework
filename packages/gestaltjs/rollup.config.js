import * as path from 'pathe'

import { external, plugins, distDir } from '../../configurations/rollup.config'
import fg from 'fast-glob'
import dts from 'rollup-plugin-dts'

const configuration = async () => {
  const manifests = await fg(path.join(__dirname, 'src/node/manifests/*.ts'), {
    ignore: path.join(__dirname, 'src/node/manifests/*.test.ts'),
  })
  return [
    {
      input: [path.join(__dirname, 'src/node/index.ts'), ...manifests],
      output: [
        {
          dir: distDir(__dirname),
          format: 'esm',
          sourcemap: true,
          preserveModules: true,
          preserveModulesRoot: path.join(__dirname, 'src'),
        },
      ],
      plugins: [...plugins(__dirname)],
      external: [...(await external(__dirname))],
    },
    {
      input: manifests,
      output: {
        dir: distDir(__dirname),
        preserveModules: true,
        preserveModulesRoot: path.join(__dirname, 'src'),
      },
      plugins: [dts()],
      external: [...(await external(__dirname))],
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
