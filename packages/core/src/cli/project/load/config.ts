import { createServer } from 'vite'
import { configurationFileName } from '$cli/constants'
import { findUp as findPathUp } from '$cli/path'
import Configuration from '$shared/configuration'

/** An interface that describes the options that can be passed for loading */
export type LoadOptions = {
  alias?: { find: string; replacement: string }[]
}

/**
 * This function transpiles, loads, and returns a Gestalt project configuration.
 * @param configurationPath {string} The path to the configuration file to be loaded. For example, /path/to/project/gestalt.config.ts
 * @param options {LoadOptions} Additional options to customize the loading of the configuration.
 * @returns A promise that resolves with the Configuration.
 */
export async function load(
  configurationPath: string,
  options: LoadOptions = {}
): Promise<Configuration> {
  const vite = await createServer({
    server: { middlewareMode: 'ssr' },
    resolve: {
      alias: options?.alias ?? [],
    },
    optimizeDeps: {
      entries: [],
    },
  })
  const module = await vite.ssrLoadModule(configurationPath)
  return module.default as Configuration
}

/**
 * This function transpiles, loads, and returns a Gestalt project configuration.
 * @param configurationPath {string} The path to the configuration file to be loaded. For example, /path/to/project/gestalt.config.ts
 * @param options {LoadOptions} Additional options to customize the loading of the configuration.
 * @returns A promise that resolves with the Configuration.
 */
export async function watch(
  configurationPath: string,
  options: LoadOptions = {}
): Promise<Configuration> {
  const vite = await createServer({
    server: { middlewareMode: 'ssr' },
    resolve: {
      alias: options?.alias ?? [],
    },
    optimizeDeps: {
      entries: [],
    },
    plugins: [
      {
        name: 'watch-config',
        handleHotUpdate: (context) => {
          return []
        },
      },
    ],
  })
  const module = await vite.ssrLoadModule(configurationPath)
  return module.default as Configuration
}

/**
 * Given a directory that represents the root of a Gestalt app, it returns
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
