import { glob, dirname, basename, join as pathJoin } from '../../path'
import { targetFileName } from '../../constants'
import { Targets } from '../models/target'
import { loadMainTarget } from './target/main'
import { ModuleLoader } from './module-loader'

export async function loadTargets(
  projectDirectory: string,
  moduleLoader: ModuleLoader
): Promise<Targets> {
  const globPatterns = (directory: string) =>
    ['ts', 'js'].map((extension) =>
      pathJoin(
        projectDirectory,
        `targets/${directory}/*/${targetFileName}.${extension}`
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
