import type { MainTarget } from '../../../../common/manifests/targets/main'
import { parentDirectory, pathBasename, joinPath } from '../../../../node/path'
import { ModuleLoader } from '../module-loader'
import { loadRoutes } from './main/routes'
import { loadLayouts } from './main/layouts'
import type { UserMainTarget } from '../../../../common/manifests'

/**
 * Loads a main target into memory and returns it.
 * @param manifestPath {string} Path to the gestalt.main.{ts,js} file.
 * @param moduleLoader {ModuleLoader} Utility to load and transpile the manifest file.
 * @returns {Promise<MainTarget>} A promise that resolves with the loaded target or rejects with an error if the target is invalid.
 */
export async function loadMainTarget(
  manifestPath: string,
  moduleLoader: ModuleLoader
): Promise<MainTarget> {
  const directory = parentDirectory(manifestPath)
  const userMainTarget = ((await moduleLoader.load(manifestPath)) as any)
    .default as UserMainTarget
  const routesDirectory = joinPath(directory, 'routes')
  return {
    ...userMainTarget,
    manifestPath,
    name: pathBasename(parentDirectory(manifestPath)),
    directory,
    router: await loadRoutes(routesDirectory),
    layouts: await loadLayouts(routesDirectory),
  }
}