import { Plugin } from '@gestaltjs/plugins'

class PluginLoadError extends Error {}

/**
 * This function looks for Gestalt plugins in the given directories.
 * It does the lookup in the node_modules directory relative to the given directories.
 * @param projectDirectory {string[]} The path to the project directory.
 * @returns A promise that resolves with all the loaded plugins.
 */
export async function loadPlugins(directories: string[]): Promise<Plugin[]> {
  return []
}
