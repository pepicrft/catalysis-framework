import path from 'pathe'
import { fileURLToPath } from 'url'

export function packagesDirectory(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
}

type GestaltJSPackageModule = {
  name: string
  path: string
}

type GestaltJSPackageModules = {
  support: GestaltJSPackageModule
  configuration: GestaltJSPackageModule
}

export function gestaltjsPackageModules(): GestaltJSPackageModules {
  const frameworkDirectory = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../gestaltjs/src/framework'
  )
  return {
    support: {
      name: 'gestaltjs/support',
      path: path.join(frameworkDirectory, 'support.ts'),
    },
    configuration: {
      name: 'gestaltjs/configuration',
      path: path.join(frameworkDirectory, 'configuration.ts'),
    },
  }
}
