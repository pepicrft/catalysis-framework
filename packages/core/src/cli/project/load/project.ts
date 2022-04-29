import { Project } from '../models/project'
import { Abort } from '../../error'
import { dirname, join as pathJoin } from '../../path'
import { loadTargetsGraph } from './target'
import { lookupConfigurationPathTraversing, loadConfig } from './config'
import { getModuleLoader } from './module-loader'

/**
 * Error thrown when we can't find a directory containing a Gestalt configuration file.
 * @returns {Abort} An abort error.
 */
export const ConfigFileNotFoundError = () => {
  return new Abort('The config file could not be found', {
    cause:
      'You might be running GestaltJS from a directory that does not contain a project',
    next: 'Run the command from a GestaltJS project. GestaltJS projects are identified by a directory containing a configuration file.',
  })
}

/**
 * It traverses up the directory hiearchy looking up a Gestalt project.
 * It it finds one it returns it.
 * @param fromDirectory {string} Directory from where we traverse up the directory hierarchy lookin up a Getalt project.
 * @returns
 */
export async function loadProject(fromDirectory: string): Promise<Project> {
  const configurationPath = await lookupConfigurationPathTraversing(
    fromDirectory
  )
  if (!configurationPath) {
    throw ConfigFileNotFoundError()
  }
  const directory = dirname(configurationPath)
  const moduleLoader = await getModuleLoader(directory)
  try {
    const configuration = await loadConfig(configurationPath, moduleLoader)
    const targetsGraph = await loadTargetsGraph(directory, moduleLoader)
    return {
      configuration,
      directory,
      sourcesGlob: pathJoin(directory, `src/**/*.{ts,js}`),
      targetsGraph,
    }
  } finally {
    await moduleLoader.close()
  }
}
