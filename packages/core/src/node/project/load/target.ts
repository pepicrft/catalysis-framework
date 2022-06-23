import { glob, joinPath } from '../../../node/path'
import { webTargetFileName } from '../../../common/constants'
import { loadWebTarget } from './targets/web'
import { ModuleLoader } from './module-loader'
import { WebTarget } from '../../../common/models/targets/web'

export async function loadTargets(
  projectDirectory: string,
  moduleLoader: ModuleLoader
): Promise<{ [name: string]: WebTarget }> {
  const globPatterns = (directory: string) =>
    ['ts', 'js'].map((extension) =>
      joinPath(
        projectDirectory,
        `targets/${directory}/*/${webTargetFileName}.${extension}`
      )
    )
  const webTargetPaths = await glob(globPatterns('main'), {
    onlyFiles: true,
    cwd: projectDirectory,
  })
  const webTargets = Object.fromEntries(
    (
      await Promise.all(
        webTargetPaths.map((manifestPath) =>
          loadWebTarget(manifestPath, moduleLoader)
        )
      )
    ).map((target) => [target.name, target])
  )
  return {
    ...webTargets,
  }
}
