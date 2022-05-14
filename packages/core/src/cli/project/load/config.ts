import { configurationFileName } from '../../constants'
import { findUp as findPathUp } from '../../../shared/path'
import { Configuration } from '../models/configuration'
import { ModuleLoader } from './module-loader'

/**
 * This function transpiles, loads, and returns a Gestalt project configuration.
 * @param configurationPath {string} The path to the configuration file to be loaded. For example, /path/to/project/gestalt.config.ts
 * @param moduleLoader {ModuleLoader} Utility to load and transpile the module from the file system.
 * @returns A promise that resolves with the Configuration.
 */
export async function loadConfig(
  configurationPath: string,
  moduleLoader: ModuleLoader
): Promise<Configuration> {
  const module: any = await moduleLoader.load(configurationPath)
  const configuration = module.default as Configuration
  return {
    ...configuration,
    manifestPath: configurationPath,
  }
}

/**
 * This function transpiles, loads, and returns a Gestalt project configuration.
 * @param configurationPath {string} The path to the configuration file to be loaded. For example, /path/to/project/gestalt.config.ts
 * @param moduleLoader {ModuleLoader} Utility to load and transpile the module from the file system.
 * @returns A promise that resolves with the Configuration.
 */
export async function watchConfig(
  configurationPath: string,
  moduleLoader: ModuleLoader,
  onChange: (configuration: Configuration) => Promise<void> | void
) {
  moduleLoader.watch(configurationPath, async (_) => {
    onChange(
      ((await moduleLoader.load(configurationPath)) as any)
        .default as Configuration
    )
  })
}

/**
 * Given a directory that represents the root of a Gestalt project, it returns
 * the path to the configuration file.
 * @param directory {string} Directory where to locate the configuration file.
 * @returns A promise that resolves with the path if the file could be located.
 */
export async function lookupConfigurationPathTraversing(
  fromDirectory: string
): Promise<string | undefined> {
  return await findPathUp(
    [`${configurationFileName}.ts`, `${configurationFileName}.js`],
    { type: 'file', cwd: fromDirectory }
  )
}
