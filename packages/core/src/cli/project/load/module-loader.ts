import { createServer } from 'vite'

// eslint-disable-next-line @typescript-eslint/ban-types
export type ModuleLoader = {
  /**
   * This function transpiles, loads, and returns the module at the given path.
   */
  load: <T>(modulePath: string) => Promise<T>

  /**
   * Subscribes to changes in modules whose path's prefix
   * matches the passed prefix.
   */
  watch: (
    pathPrefix: string,
    onChange: (modulePath: string) => void | Promise<void>
  ) => void

  /**
   * Closes the module loader.
   */
  close: () => Promise<void>
}

/**
 * It returns an instance of ModuleLoader that can to load and watch changes to modules.
 * @param projectDirectory {string} The path to the project directory.
 * @returns {Promise<Module>} A promise that resolves with the module loader instance.
 */
export async function getModuleLoader(
  projectDirectory: string
): Promise<ModuleLoader> {
  const watchers: {
    [key: string]: (modulePath: string) => void | Promise<void>
  } = {}
  const viteServer = await createServer({
    root: projectDirectory,
    cacheDir: undefined,
    server: {
      middlewareMode: 'ssr',
    },
    clearScreen: false,
    logLevel: 'silent',
    optimizeDeps: {
      entries: [],
    },
    build: {
      watch: {},
    },
    plugins: [
      {
        name: 'config-watch',
        handleHotUpdate: async (context) => {
          const watcherKey = Object.keys(watchers).find((pathPrefix) =>
            context.file.startsWith(pathPrefix)
          )
          if (!watcherKey) {
            return context.modules
          }
          await watchers[watcherKey](context.file)
          return context.modules
        },
      },
    ],
  })
  return {
    load: async <T>(modulePath: string) => {
      const module = await viteServer.ssrLoadModule(modulePath)
      return module as T
    },
    watch: (pathPrefix, onChange) => {
      watchers[pathPrefix] = onChange
    },
    close: viteServer.close,
  }
}
