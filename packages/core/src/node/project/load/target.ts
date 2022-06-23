import { glob, joinPath } from '../../../node/path'
import { webTargetFileName } from '../../../common/constants'
import { loadWebTarget } from './targets/web'
import { ModuleLoader } from './module-loader'
import { WebTarget } from '../../../common/models/targets/web'

export async function loadTargets(
  projectDirectory: string,
  moduleLoader: ModuleLoader
): Promise<{ [name: string]: WebTarget }> {
  const globPatterns = (filename: string) =>
    ['ts', 'js'].map((extension) =>
      joinPath(projectDirectory, `targets/*/${filename}.${extension}`)
    )
  const webTargetPaths = await glob(globPatterns(webTargetFileName), {
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
