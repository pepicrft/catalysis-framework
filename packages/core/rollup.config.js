import path from 'pathe'
import dts from 'rollup-plugin-dts'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const coreExternal = [...(await external(__dirname))]
  const publicFiles = ['src/framework/index.ts', 'src/shared/index.ts']

  const cliFiles = [
    'src/cli/index.ts',
    'src/cli/logger/transport.ts',
    ...publicFiles,
  ]

  return [
    ...cliFiles.map((filePath) => {
      return {
        input: path.join(__dirname, filePath),
        output: [
          {
            file: path.join(
              distDir(__dirname),
              filePath.replace('src/', '').replace('.ts', '.js')
            ),
            format: 'esm',
            exports: 'auto',
          },
        ],
        plugins: plugins(__dirname),
        external: coreExternal,
      }
    }),
    ...publicFiles.flatMap((filePath) => {
      return [
        {
          input: path.join(__dirname, filePath),
          output: [
            {
              file: path.join(
                distDir(__dirname),
                filePath.replace('src/', '').replace('.ts', 'd.ts')
              ),
              format: 'esm',
              exports: 'auto',
            },
          ],
          plugins: [dts()],
          external: coreExternal,
        },
      ]
    }),
  ]
}

export default configuration
