import { parentDirectory, pathBasename, joinPath } from '../../../path.js'
import { ModuleLoader } from '../module-loader.js'
import { loadRoutes } from './web/routes.js'
import { loadLayouts } from './web/layouts.js'
import { UserWebTarget } from '../../../../common/manifests/web.js'
import { WebTarget } from '../../../../common/models/targets/web.js'

/**
 * Loads a web target into memory and returns it.
 * @param manifestPath {string} Path to the gestalt.web.{ts,js} file.
 * @param moduleLoader {ModuleLoader} Utility to load and transpile the manifest file.
 * @returns {Promise<WebTarget>} A promise that resolves with the loaded target or rejects with an error if the target is invalid.
 */
export async function loadWebTarget(
  manifestPath: string,
  moduleLoader: ModuleLoader
): Promise<WebTarget> {
  const directory = parentDirectory(manifestPath)
  const userWebTarget = ((await moduleLoader.load(manifestPath)) as any)
    .default as UserWebTarget
  const routesDirectory = joinPath(directory, 'routes')
  return {
    ...userWebTarget,
    manifestPath,
    name: pathBasename(parentDirectory(manifestPath)),
    directory,
    router: await loadRoutes(routesDirectory),
    layouts: await loadLayouts(routesDirectory),
  }
}
