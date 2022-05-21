import { Project } from '../models/project'
import { Abort } from '../../../shared/error'
import { parentDirectory, joinPath } from '../../../node/path'
import { loadTargets } from './target'
import { lookupConfigurationPathTraversing, loadConfig } from './config'
import { getModuleLoader } from './module-loader'
import { fileToken, content } from '../../logger'
import { validateProject } from '../validate/project'

/**
 * Error thrown when we can't find a directory containing a Gestalt configuration file.
 * @returns {Abort} An abort error.
 */
export const ConfigFileNotFoundError = () => {
  return new Abort('The config file could not be found', {
    cause:
      'You might be running Gestalt from a directory that does not contain a project',
    next: content`Run the command from a directory that contains a Gestalt project or any subdirectory. Gestalt projects are identified by a directory containing a ${fileToken(
      'gestalt.config.{js,ts}'
    )} configuration file.`,
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
  const directory = parentDirectory(configurationPath)
  const moduleLoader = await getModuleLoader(directory)
  try {
    const configuration = await loadConfig(configurationPath, moduleLoader)
    const targets = await loadTargets(directory, moduleLoader)
    const project = {
      configuration,
      directory,
      sourcesGlob: joinPath(directory, `src/**/*.{ts,js}`),
      targets,
    }
    await validateProject(project)
    return project
  } finally {
    await moduleLoader.close()
  }
}
