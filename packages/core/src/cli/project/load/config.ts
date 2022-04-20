import { createServer, ViteDevServer } from 'vite'
import { configurationFileName } from '../../constants'
import { findUp as findPathUp, dirname, basename } from '../../path'
import Configuration from '../../../shared/configuration'

/** An interface that describes the options that can be passed for loading */
export type ViteOptions = {
  alias?: { find: string; replacement: string }[]
}

/**
 * This function transpiles, loads, and returns a Gestalt project configuration.
 * @param configurationPath {string} The path to the configuration file to be loaded. For example, /path/to/project/gestalt.config.ts
 * @param viteOptions {ViteOptions} Options to configure Vite, which is used internally to transpile the configuration.
 * @returns A promise that resolves with the Configuration.
 */
export async function load(
  configurationPath: string,
  viteOptions: ViteOptions = {}
): Promise<Configuration> {
  const vite = await createServer({
    server: {
      middlewareMode: 'ssr',
      hmr: false,
      watch: {
        ignored: ['*', `!${basename(configurationPath)}`],
      },
    },
    clearScreen: false,
    logLevel: 'info',
    resolve: {
      alias: viteOptions?.alias ?? [],
    },
    optimizeDeps: {
      entries: [],
    },
  })
  const module = await vite.ssrLoadModule(configurationPath)
  const configuration = module.default as Configuration
  await vite.close()
  return configuration
}

/**
 * Options to initialize the configuration watcher.
 */
type ConfigWatcherOptions = {
  /**
   * Vite server that's used to watch and transpile changes in the configuration object.
   */
  vite: ViteDevServer
}
/**
 * When watching configuration changes, we need to keep an instance of the internal server
 * that's subscribed to the changes. We do so by returning a watcher object that contains
 * a reference to the Vite server.
 */
export class ConfigWatcher {
  options: ConfigWatcherOptions

  constructor(options: ConfigWatcherOptions) {
    this.options = options
  }

  /**
   * Closes the internal Vite server.
   */
  async close() {
    await this.options.vite.close()
  }
}

/**
 * This function transpiles, loads, and returns a Gestalt project configuration.
 * @param configurationPath {string} The path to the configuration file to be loaded. For example, /path/to/project/gestalt.config.ts
 * @param viteOptions {ViteOptions} Options to configure Vite, which is used internally to transpile the configuration.
 * @returns A promise that resolves with the Configuration.
 */
export async function watch(
  configurationPath: string,
  viteOptions: ViteOptions = {},
  onChange: (configuration: Configuration) => Promise<void>
): Promise<ConfigWatcher> {
  const vite = await createServer({
    root: dirname(configurationPath),
    server: {
      middlewareMode: 'ssr',
      watch: {
        ignored: ['*', `!${basename(configurationPath)}`],
      },
    },
    clearScreen: false,
    logLevel: 'silent',
    resolve: {
      alias: viteOptions?.alias ?? [],
    },
    optimizeDeps: {
      entries: [],
    },
    plugins: [
      {
        name: 'config-watch',
        handleHotUpdate: async (context) => {
          if (context.file === configurationPath) {
            await onChange(
              (
                await vite.ssrLoadModule(configurationPath)
              ).default as Configuration
            )
          }
          return context.modules
        },
      },
    ],
  })
  onChange(
    (await vite.ssrLoadModule(configurationPath)).default as Configuration
  )
  return new ConfigWatcher({ vite })
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
