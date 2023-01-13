import { join as joinPath } from 'pathe'
import { findPathUp } from '../../../public/node/fs.js'
import { moduleDirname } from '../../../public/node/path.js'

/** It represents a ES module */
type ESModule = {
  /** Module identifier  */
  identifier: string
  /** Module path */
  path: string
}

/**
 * An interface to represent the modules exported by the "catalysisdev" package.
 */
type catalysisdevPackageModules = {
  /** Represents the configuration module which exports the defineConfiguration module for defining a configuration. */
  configuration: ESModule
}

/**
 * This function returns the modules exported by the "catalysisdev" NPM package.
 * This is useful for tests that invoke a build system like Vite and need to instruct it on
 * how to resolve those modules.
 * @returns {catalysisdevPackageModules} An object representing the Node modules that are exported by the "catalysisdev" NPM package.
 */
export async function catalysisdevPackageModules(): Promise<catalysisdevPackageModules> {
  const catalysisdevPackageRuntimeDirectory = (await findPathUp(
    'catalysisdev/src/public/node',
    { type: 'directory', cwd: moduleDirname(import.meta.url) }
  )) as string
  return {
    configuration: {
      identifier: 'catalysisdev/configuration',
      path: joinPath(catalysisdevPackageRuntimeDirectory, 'configuration.ts'),
    },
  }
}
