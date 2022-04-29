import type { MainTarget } from '../../models/target'
import { glob, dirname, basename } from '../../../path'
import { ModuleLoader } from '../module-loader'

export async function loadMainTarget(
  manifestPath: string,
  moduleLoader: ModuleLoader
): Promise<MainTarget> {
  return {
    manifestPath,
    name: basename(manifestPath),
    directory: dirname(manifestPath),
    platforms: ['desktop'],
  }
}
