import toml from '@iarna/toml'
import App from './app'
import { Abort } from '../error'
import constants from '../constants'
import { exists as fileExists, readFile } from '../fs'
import { findUp as findPathUp, dirname, join as pathJoin } from '../path'
import type Configuration from '../../shared/configuration'
import { Schema as ConfigurationSchema } from '../../shared/configuration'

export const DirectoryNotFoundError = (directory: string) => {
  return new Abort(`The following directory was not found ${directory}`, {
    cause:
      'You might be running the command against a directory that does not exist in the system',
    next: 'Run the command targeting a directory with a GestaltJS project',
  })
}

export const ConfigFileNotFoundError = () => {
  return new Abort('The config file could not be found', {
    cause:
      'You might be running GestaltJS from a directory that does not contain a project',
    next: 'Run the command from a GestaltJS project. GestaltJS projects are identified by a directory containing a configuration file.',
  })
}

export default async function load(from: string): Promise<App> {
  const directory = await locateAppDirectory(from)
  const configuration = await loadAndValidateConfiguration(
    pathJoin(directory, constants.files.configuration)
  )
  return {
    configuration,
    directory,
    routes: [],
  }
}

/**
 * Loads and validates the gestalt.config.toml configuration file of an app.
 * @param configurationFilePath {string} Path to the app configuration file gestalt.config.toml
 * @returns {Promise<Configuration>} Promise that resolves with the configuration or that rejects if the loading and validation of the configuration fails.
 */
async function loadAndValidateConfiguration(
  configurationFilePath: string
): Promise<Configuration> {
  const configFileString = await readFile(configurationFilePath)
  const configFileObject = toml.parse(configFileString)

  return await ConfigurationSchema.parseAsync(configFileObject)
}

/**
 * Locates the app directory by traversing up the directory hierarchy.
 * @param from {string} Path to directory to locate the app from.
 * @returns {Promise<string>} Promise that resolves with the path to the app directory
 * if it was located or rejects if the app directory cannot be found.
 */
async function locateAppDirectory(from: string): Promise<string> {
  if (!(await fileExists(from))) {
    throw DirectoryNotFoundError(from)
  }
  const configPath = await findPathUp(constants.files.configuration, {
    type: 'file',
    cwd: from,
  })
  if (!configPath) {
    throw ConfigFileNotFoundError()
  }
  return dirname(configPath)
}
