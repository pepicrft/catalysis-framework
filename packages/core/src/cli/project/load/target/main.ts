import type { MainTarget } from '../../models/target'
import {
  glob,
  dirname,
  basename,
  join as pathJoin,
  relative as relativePath,
  parse as parsePath,
} from '../../../path'
import { ModuleLoader } from '../module-loader'
import { createRouter } from 'radix3'
import type { UserMainTarget } from '../../../../shared/target'
import { Route } from '../../models/target'
import { RadixRouter } from 'radix3'

/**
 * Loads a main target into memory and returns it.
 * @param manifestPath {string} Path to the gestalt.target.{ts,js} file.
 * @param moduleLoader {ModuleLoader} Utility to load and transpile the manifest file.
 * @returns {Promise<MainTarget>} A promise that resolves with the loaded target or rejects with an error if the target is invalid.
 */
export async function loadMainTarget(
  manifestPath: string,
  moduleLoader: ModuleLoader
): Promise<MainTarget> {
  const directory = dirname(manifestPath)
  const userMainTarget = ((await moduleLoader.load(manifestPath)) as any)
    .default as UserMainTarget
  return {
    ...userMainTarget,
    manifestPath,
    name: basename(dirname(manifestPath)),
    directory,
    router: await loadRoutes(directory),
  }
}

/**
 * Loads the routes of a main target.
 * @param directory {string} Path to the target's directory.
 * @returns A promise that resolves with the router.
 */
async function loadRoutes(directory: string): Promise<RadixRouter<Route>> {
  const router = createRouter<Route>()
  const routesDirectory = pathJoin(directory, 'routes')
  const files = await glob(pathJoin(routesDirectory, '**/*'))
  files.forEach((routeFilePath) => {
    const routeFilePathWithoutExtension = pathJoin(
      dirname(routeFilePath),
      parsePath(basename(routeFilePath)).name
    )
    let urlPath = `/${relativePath(
      routesDirectory,
      routeFilePathWithoutExtension
    )}`
    if (urlPath.match(/^\/.+\/index$/)) {
      urlPath = urlPath.replace('/index', '')
    }
    if (urlPath.match(/^\/index$/)) {
      urlPath = urlPath.replace('/index', '/')
    }
    router.insert(urlPath, { filePath: routeFilePath, type: 'ui' })
  })
  return router
}
