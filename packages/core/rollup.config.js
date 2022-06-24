import * as path from 'pathe'
import fg from 'fast-glob'
import { external, plugins, distDir } from '../../configurations/rollup.config'
import dts from 'rollup-plugin-dts'

const configuration = async () => {
  const files = [
    path.join(__dirname, 'src/node/logger/transport.ts'),
    ...(await fg(path.join(__dirname, 'src/common/*.ts'), {
      ignore: path.join(__dirname, 'src/common/*.test.ts'),
    })),
    ...(await fg(path.join(__dirname, 'src/node/*.ts'), {
      ignore: path.join(__dirname, 'src/node/*.test.ts'),
    })),
  ]

  return [
    {
      input: files,
      output: [
        {
          dir: distDir(__dirname),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
          preserveModules: true,
          preserveModulesRoot: path.join(__dirname, 'src'),
        },
      ],
      plugins: plugins(__dirname),
      external: [...(await external(__dirname))],
    },
    {
      input: files,
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
