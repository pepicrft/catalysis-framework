import Project from '../models/project'
import { Abort } from '$cli/error'
import { dirname } from '$cli/path'

import {
  lookupConfigurationPathTraversing,
  load as loadConfiguration,
} from './config'

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

export default async function load(from: string): Promise<Project> {
  const configurationPath = await lookupConfigurationPathTraversing(from)
  if (!configurationPath) {
    throw ConfigFileNotFoundError()
  }
  const directory = dirname(configurationPath)
  const configuration = await loadConfiguration(configurationPath)
  return {
    configuration,
    directory,
    routes: [],
  }
}
