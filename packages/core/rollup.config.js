import * as path from 'pathe'
import fg from 'fast-glob'
import { external, plugins, distDir } from '../../configurations/rollup.config'

const configuration = async () => {
  const coreExternal = [...(await external(__dirname))]
  const publicFiles = ['src/runtime/index.ts', 'src/shared/index.ts']
  const nodeFiles = await fg('src/node/*.ts', {
    ignore: 'src/node/*.test.ts',
  })

  const cliFiles = [
    'src/cli/index.ts',
    'src/cli/logger/transport.ts',
    ...publicFiles,
  ]

  return [
    {
      input: nodeFiles,
      output: [
        {
          dir: path.join(distDir(__dirname), 'node'),
          format: 'esm',
          exports: 'auto',
          sourcemap: true,
        },
      ],
      plugins: plugins(__dirname),
      external: coreExternal,
    },
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
            sourcemap: true,
          },
        ],
        plugins: plugins(__dirname),
        external: coreExternal,
      }
    }),
  ]
}

// eslint-disable-next-line import/no-default-export
export default configuration
