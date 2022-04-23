import path from 'pathe'
// eslint-disable-next-line import/no-nodejs-modules
import { fileURLToPath } from 'node:url'

export function packagesDirectory(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
}

/** It represents a ES module */
type ESModule = {
  /** Module identifier  */
  identifier: string
  /** Module path */
  path: string
}

/**
 * An interface to represent the modules exported by the "gestaltjs" package.
 */
type GestaltJSPackageModules = {
  /** Represents the support module which provides a set of convenient tools for building Gestalt projects. */
  support: ESModule

  /** Represents the configuration module which exports the defineConfiguration module for defining a configuration. */
  configuration: ESModule

  plugins: ESModule
}

/**
 * This function returns the modules exported by the "gestaltjs" NPM package.
 * This is useful for tests that invoke a build system like Vite and need to instruct it on
 * how to resolve those modules.
 * @returns {GestaltJSPackageModules} An object representing the Node modules that are exported by the "gestaltjs" NPM package.
 */
export function gestaltjsPackageModules(): GestaltJSPackageModules {
  const gestaltjsPackageRuntimeDirectory = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../gestaltjs/src/runtime'
  )
  const pluginsSourceDirectory = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../plugins/src/runtime'
  )
  return {
    support: {
      identifier: 'gestaltjs/support',
      path: path.join(gestaltjsPackageRuntimeDirectory, 'support.ts'),
    },
    configuration: {
      identifier: 'gestaltjs/configuration',
      path: path.join(gestaltjsPackageRuntimeDirectory, 'configuration.ts'),
    },
    plugins: {
      identifier: '@gestaltjs/plugins',
      path: path.join(pluginsSourceDirectory, 'index.ts'),
    },
  }
}
