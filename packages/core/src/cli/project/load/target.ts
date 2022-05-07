import { glob, join as pathJoin } from '../../path'
import { mainTargetFileName } from '../../constants'
import { Targets } from '../models/targets'
import { loadMainTarget } from './targets/main'
import { ModuleLoader } from './module-loader'

export async function loadTargets(
  projectDirectory: string,
  moduleLoader: ModuleLoader
): Promise<Targets> {
  const globPatterns = (directory: string) =>
    ['ts', 'js'].map((extension) =>
      pathJoin(
        projectDirectory,
        `targets/${directory}/*/${mainTargetFileName}.${extension}`
      )
    )
  const mainTargetPaths = await glob(globPatterns('main'), {
    onlyFiles: true,
    cwd: projectDirectory,
  })
  const sharedTargetPaths = await glob(globPatterns('shared'), {
    onlyFiles: true,
    cwd: projectDirectory,
  })
  const mainTargetsList = Object.fromEntries(
    (
      await Promise.all(
        mainTargetPaths.map((manifestPath) =>
          loadMainTarget(manifestPath, moduleLoader)
        )
      )
    ).map((target) => [target.name, target])
  )
  return {
    main: mainTargetsList,
  }
}
