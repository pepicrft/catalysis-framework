import path from 'pathe'
import fg from 'fast-glob'

import { external, plugins, distDir } from '../../configurations/rollup.config'

const gestaltExternal = [
  ...external,
  '@oclif/core',
  '@gestaltjs/core/cli',
  '@gestaltjs/core/framework',
]
const gestaltPlugins = [...plugins(__dirname)]
const gestaltFeatures = ['build', 'db', 'lint', 'serve', 'test', 'check', 'env']
const gestaltCommands = gestaltFeatures.flatMap((feature) => {
  return fg.sync([
    path.join(__dirname, `../${feature}/src/cli/commands/**/*.ts`),
    `!${path.join(__dirname, `../${feature}/src/cli/commands/**/*.test.ts`)}`,
  ])
})

const configuration = () => [
  {
    input: [path.join(__dirname, 'src/index.ts'), ...gestaltCommands],
    output: [
      {
        dir: distDir(__dirname),
        format: 'esm',
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.facadeModuleId.includes('src/cli/commands')) {
            // Preserves the commands/... path
            return `commands/${chunkInfo.facadeModuleId
              .split('src/cli/commands')
              .slice(-1)[0]
              .replace('ts', 'js')}`
          } else {
            return '[name].js'
          }
        },
      },
    ],
    plugins: gestaltPlugins,
    external: gestaltExternal,
  },
]

export default configuration
