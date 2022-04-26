import { glob, dirname, basename } from '../../path'
import { targetFileName } from '../../constants'
import { TargetsGraph } from '../models/target'
import type { MainTarget, SharedTarget } from '../models/target'

export async function loadTargetsGraph(
  projectDirectory: string
): Promise<TargetsGraph> {
  const globPatterns = (directory: string) =>
    ['ts', 'js'].map(
      (extension) => `targets/${directory}/*/${targetFileName}.${extension}`
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
        mainTargetPaths.map((manifestPath) => loadMainTarget(manifestPath))
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

async function loadMainTarget(manifestPath: string): Promise<MainTarget> {
  return {
    manifestPath,
    name: basename(manifestPath),
    directory: dirname(manifestPath),
    platforms: ['desktop'],
  }
}

async function loadSharedTarget(manifestPath: string): Promise<SharedTarget> {
  return {
    manifestPath,
    name: basename(manifestPath),
    directory: dirname(manifestPath),
    shared: '',
  }
}
