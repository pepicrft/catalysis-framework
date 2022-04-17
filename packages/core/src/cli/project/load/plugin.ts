import { Plugin } from '@gestaltjs/plugins'
import { pluginFileName } from '../../constants'
import { glob, join as joinPath, dirname } from '../../path'
import { createServer, ViteDevServer } from 'vite'
import { Abort } from '../../error'
import { pathExists, readFile } from '../../fs'
import { content, pathToken, fileToken } from '../../logger'

type PluginWithName = Plugin & { name: string }

/**
 * Returns an error to throw when the plugin doesn't have a package.json in its directory.
 * @param pluginDirectory {string} Path to the directory containing the plugin.
 * @returns {Abort} An abort error.
 */
export const PackageJsonNotFoundError = (pluginDirectory: string) => {
  return new Abort(
    content`The plugin in directory ${pathToken(
      pluginDirectory
    )} doesn't have a ${pathToken('package.json')}`,
    {
      cause: content`The package manager might have corrupted the package containing the plugin by not creating the ${fileToken(
        'package.json'
      )} file`,
      next: content`Make sure the plugin contains the ${fileToken(
        'package.json'
      )} file`,
    }
  )
}

/**
 * Returns an error to throw when the plugin's package.json lacks the name attribute.
 * @param pluginDirectory {string} Path to the directory containing the plugin.
 * @returns {Abort} An abort error.
 */
export const NoNameInPackageJsonError = (pluginDirectory: string) => {
  return new Abort(
    content`The package.json of the plugin in directory ${pathToken(
      pluginDirectory
    )} doesn't have a "name" attribute which is necessary for loading it as a plugin.`,
    {
      cause:
        'The author of the plugin might have forgotten to set the "name" attribute in the package.json',
      next: content`If you are the author of the plugin, edit the ${pathToken(
        'package.json'
      )} and set the "name" attribute. Otherwise, report or contribute to the plugin.`,
    }
  )
}

/** An interface that describes the options that can be passed for loading */
export type ViteOptions = {
  alias?: { find: string; replacement: string }[]
}

/**
 * This function looks for Gestalt plugins in the given directories.
 * It does the lookup in the node_modules directory relative to the given directories.
 * @param projectDirectory {string[]} The path to the project directory.
 * @param viteOptions {ViteOptions} An options object to configure the Vite dev instance that's used to load the plugin.
 * @returns A promise that resolves with all the loaded plugins.
 */
export async function loadPlugins(
  directories: string[],
  viteOptions: ViteOptions = {}
): Promise<PluginWithName[]> {
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
        return pluginManifestFiles.map((relativePath) =>
          joinPath(directory, relativePath)
        )
      })
    )
  ).flat()

  return (
    await Promise.all(
      pluginManifests.map(async (manifestPath) => {
        const viteServer = await getViteServer(
          dirname(manifestPath),
          viteOptions
        )
        return await loadPlugin(manifestPath, { viteServer })
      })
    )
  ).filter(
    // Eliminates undefined from the array
    (plugin) => plugin
  ) as PluginWithName[]
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
): Promise<PluginWithName | undefined> {
  const pluginDirectory = dirname(manifestPath)
  const packageJsonPath = joinPath(pluginDirectory, 'package.json')
  if (!(await pathExists(packageJsonPath))) {
    throw PackageJsonNotFoundError(pluginDirectory)
  }
  const packageJsonString = await readFile(packageJsonPath)
  const packageJson = JSON.parse(packageJsonString)
  if (!packageJson.name) {
    throw NoNameInPackageJsonError(pluginDirectory)
  }
  const module = await options.viteServer.ssrLoadModule(manifestPath)
  return {
    ...(module as Plugin),
    name: packageJson.name,
  }
}

/**
 * Creates a new instance of the Vite dev server to transpile and load the plugin modules.
 * @param root {string} The path to the directory containing the plugin.
 * @param viteOptions {ViteOptions} An options object to configure the Vite dev instance that's used to load the plugin.
 * @returns {Promise<ViteDevServer>} A promise that resolves with the instance of Vite or fails if it can't be created.
 */
async function getViteServer(
  root: string,
  viteOptions: ViteOptions
): Promise<ViteDevServer> {
  return await createServer({
    root: root,
    server: {
      middlewareMode: 'ssr',
      watch: {
        ignored: ['*'],
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
  })
}
