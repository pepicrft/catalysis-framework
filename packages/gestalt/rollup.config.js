import path from 'pathe'
import fg from 'fast-glob'

import {
  external,
  plugins,
  distDir,
  features,
} from '../../configurations/rollup.config'

const gestaltExternal = [
  ...external,
  '@oclif/core',
  '@gestaltjs/core/cli',
  '@gestaltjs/core/framework',
]
const gestaltPlugins = [...plugins(__dirname)]
const gestaltCommands = features.flatMap((feature) => {
  return fg.sync([
    path.join(__dirname, `../${feature}/src/cli/commands/**/*.ts`),
    `!${path.join(__dirname, `../${feature}/src/cli/commands/**/*.test.ts`)}`,
  ])
})
const featuresLoggerTransport = features.flatMap((feature) => {
  return path.join(__dirname, `../${feature}/src/cli/logger/transport.ts`)
})

const configuration = () => [
  {
    input: [
      path.join(__dirname, 'src/index.ts'),
      ...gestaltCommands,
      ...featuresLoggerTransport,
    ],
    output: [
      {
        dir: distDir(__dirname),
        format: 'esm',
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.facadeModuleId.includes('src/cli/commands')) {
            // Preserves the commands/... path
            return `cli/commands/${chunkInfo.facadeModuleId
              .split('src/cli/commands')
              .slice(-1)[0]
              .replace('ts', 'js')}`
          } else if (chunkInfo.facadeModuleId.includes('src/cli/logger')) {
            return `cli/logger/transports/${chunkInfo.facadeModuleId
              .split('src/cli/logger')
              .slice(-1)[0]
              .replace(
                'transport',
                path.basename(
                  chunkInfo.facadeModuleId.split('src/cli/logger')[0]
                )
              )
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
