import type { MainTarget } from '../../models/target'
import { dirname, basename, join as pathJoin } from '../../../path'
import { ModuleLoader } from '../module-loader'
import { loadRoutes } from './main/routes'
import type { UserMainTarget } from '../../../../shared/target'

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
    router: await loadRoutes(pathJoin(directory, 'routes')),
  }
}
