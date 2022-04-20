import Project from '../models/project'
import { Abort } from '../../error'
import { dirname } from '../../path'
import {
  lookupConfigurationPathTraversing,
  loadConfig,
} from './config'
import type { ViteOptions } from "./config"

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
 * @param viteOptions {ViteOptions} Options to configure the Vite instance used for loading the configuration.
 * @returns
 */
export async function loadProject(fromDirectory: string, viteOptions: ViteOptions = {}): Promise<Project> {
  const configurationPath = await lookupConfigurationPathTraversing(fromDirectory)
  if (!configurationPath) {
    throw ConfigFileNotFoundError()
  }
  const directory = dirname(configurationPath)
  const configuration = await loadConfig(configurationPath, viteOptions)
  return {
    configuration,
    directory,
    sourcesGlob: `${directory}/src/**/*.{ts,js}`,
  }
}
