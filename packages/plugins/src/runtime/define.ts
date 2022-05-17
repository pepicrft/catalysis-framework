import { plugin } from '@gestaltjs/core/shared'

/**
 * Interface of the arguemnt and return type of definePlugin.
 */
type PluginExport = <T>(options?: T) => plugin.Plugin | Promise<plugin.Plugin>

/**
 * A utility function to define new plugins. Since the function has its argument and
 * return value typed, when using it from the plugin default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, plugins can use the '@type' annotation:
 *   @type {import('@gestaltjs/plugins').Plugin}
 *   const plugin = {...}
 *
 * @param plugin {<T>(options: T) => plugin.Plugin} Define a new plugin.
 * @returns A promise that resolves with the plugin.
 */
export function define(plugin: PluginExport): PluginExport {
  return plugin
}
