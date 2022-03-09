import toml from '@iarna/toml'
import App from './app'
import { Abort } from '../error'
import constants from '../constants'
import { exists as fileExists, readFile } from '../fs'
import { findUp as findPathUp, dirname, join as pathJoin } from '../path'
import type { Configuration } from './configuration'
import { Schema as ConfigurationSchema } from './configuration'

/**
 * Returns an error that's thrown when the directory doesn't exist.
 * @param directory {directory} Directory where we attempted to load the app from
 * @returns {error.Abort} Error.
 */
export const DirecoryNotFoundError = (directory: string) => {
  return new Abort(`App does not exist in directory ${directory}`)
}

/** Error that's thrown when the app directory doesn't contain a Gestalt configuration file.  */
export const ConfigFileNotFounderror = new Abort(
  'The config file could not be found',
  `Make sure the directory or any of its ascendants contains a ${constants.files.configuration} that identifies the app.`
)

export default async function load(from: string): Promise<App> {
  const directory = await locateAppDirectory(from)
  const configuration = await loadAndValidateConfiguration(
    pathJoin(directory, constants.files.configuration)
  )
  return {
    configuration,
    directory,
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
    throw DirecoryNotFoundError(from)
  }
  const configPath = await findPathUp(constants.files.configuration, {
    type: 'file',
    cwd: from,
  })
  if (!configPath) {
    throw ConfigFileNotFounderror
  }
  return dirname(configPath)
}
