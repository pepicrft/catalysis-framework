import { glob, dirname, basename, join as pathJoin } from '../../path'
import { targetFileName } from '../../constants'
import { TargetsGraph } from '../models/target'
import type { SharedTarget } from '../models/target'
import { loadMainTarget } from './target/main'
import { ModuleLoader } from './module-loader'

export async function loadTargetsGraph(
  projectDirectory: string,
  moduleLoader: ModuleLoader
): Promise<TargetsGraph> {
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
  const sharedTargetsList = Object.fromEntries(
    (
      await Promise.all(
        sharedTargetPaths.map((manifestPath) => loadSharedTarget(manifestPath))
      )
    ).map((target) => [target.name, target])
  )

  return new TargetsGraph({
    main: mainTargetsList,
    shared: sharedTargetsList,
  })
}

async function loadSharedTarget(manifestPath: string): Promise<SharedTarget> {
  return {
    manifestPath,
    name: basename(manifestPath),
    directory: dirname(manifestPath),
    shared: '',
  }
}
