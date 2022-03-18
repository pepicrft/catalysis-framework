import { fs, path, error } from './index'
import toml from '@iarna/toml'
import { z } from 'zod'

export const DirectoryNotFoundError = (directory: string) => {
  return new error.Abort(`The following directory was not found ${directory}`, {
    cause:
      'You might be running the command against a directory that does not exist in the system',
    next: 'Run the command targeting a directory with a GestaltJS project',
  })
}

export const ConfigFileNotFoundError = () => {
  return new error.Abort('The config file could not be found', {
    cause:
      'You might be running GestaltJS from a directory that does not contain a project',
    next: 'Run the command from a GestaltJS project. GestaltJS projects are identified by a directory containing a configuration file.',
  })
}

export const ValidationError = () => {
  return new error.Abort('Thre was a validation error', {
    cause: 'The configuration file has an invalid format',
    next: 'Check and fix the erros and try again.',
  })
}

type RenderingType = 'client' | 'server' | 'static'
type UIFramework = 'react' | 'vue' | 'svelte'

type SlugType = 'dynamic' | 'static'
interface SlugComponent {
  type: SlugType
  value: string
}
export interface App {
  directory: string
  configuration: Configuration
}

const ConfigurationSchema = z.object({
  name: z.string(),
})

export type Configuration = z.infer<typeof ConfigurationSchema>

export async function load(directory: string): Promise<App> {
  if (!(await fs.exists(directory))) {
    throw DirectoryNotFoundError(directory)
  }

  const configPath = await path.findUp('gestalt.config.toml', {
    type: 'file',
    cwd: directory,
  })
  if (!configPath) {
    throw ConfigFileNotFoundError()
  }

  const configFileString = await fs.readFile(configPath)
  const configFileObject = toml.parse(configFileString)

  let configFile
  try {
    configFile = await ConfigurationSchema.parseAsync(configFileObject)
  } catch (zodError: any) {
    throw ValidationError()
  }

  return {
    configuration: configFile,
    directory: path.dirname(configPath),
  }
}
