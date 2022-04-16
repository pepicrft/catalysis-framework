import { Plugin } from '@gestaltjs/plugins'
import { pluginFileName } from '../../constants'
import { glob } from '../../path'
import { createServer, ViteDevServer } from 'vite'
import { core as coreLogger } from '../../logger'
/**
 * This function looks for Gestalt plugins in the given directories.
 * It does the lookup in the node_modules directory relative to the given directories.
 * @param projectDirectory {string[]} The path to the project directory.
 * @returns A promise that resolves with all the loaded plugins.
 */
export async function loadPlugins(directories: string[]): Promise<Plugin[]> {
  const viteServer = await getViteServer()
  const pluginManifests = (
    await Promise.all(
      directories.flatMap(async (directory) => {
        const manifestFileNames = [`js`, `ts`].map(
          (extension) => `${pluginFileName}.${extension}`
        )
        const globPatterns = manifestFileNames.flatMap((filename) => [
          `node_modules/*/*/${filename}`,
          `node_modules/*/${filename}`,
        ])
        const pluginManifestFiles = await glob(globPatterns, {
          onlyFiles: true,
          cwd: directory,
        })
        return pluginManifestFiles
      })
    )
  ).flat()

  return (
    await Promise.all(
      pluginManifests.map((manifestPath) => {
        return loadPlugin(manifestPath, { viteServer })
      })
    )
  ).filter(
    // Eliminates undefined from the array
    (plugin) => plugin
  ) as Plugin[]
}

/**
 * Type that represents the options that we can pass for loading a plugin.
 */
type LoadPluginOptions = {
  /**
   * An instance of a ViteDevServer to use to load and transpile the plugin.
   */
  viteServer: ViteDevServer
}

/**
 * Given a path to a manifest and a Vite server, it loads and returns a plugin.
 * @param manifestPath {string} Path to the plugin manifest. For example /path/to/gestalt.plugin.ts
 * @param options {LoadPluginOptions} Options like the Vite dev server to load and transpile the plugin.
 * @returns A promise that resolves with the plugin or undefined if the plugin fails to load.
 */
export async function loadPlugin(
  manifestPath: string,
  options: LoadPluginOptions
): Promise<Plugin | undefined> {
  try {
    const module = await options.viteServer.ssrLoadModule(manifestPath)
    return module as Plugin
  } catch (error: any) {
    coreLogger().error(error)
    return undefined
  }
}

/**
 *
 * @returns {Promise<ViteDevServer>} A promise that resolves with the
 */
async function getViteServer(): Promise<ViteDevServer> {
  return await createServer({
    server: {
      middlewareMode: 'ssr',
      watch: {
        ignored: ['*'],
      },
    },
    clearScreen: false,
    logLevel: 'silent',
    resolve: {},
    optimizeDeps: {
      entries: [],
    },
  })
}
