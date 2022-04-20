import { plugin } from '@gestaltjs/core/cli'

export type Plugin = plugin.Plugin

/**
 * Interface of the arguemnt and return type of definePlugin.
 */
type PluginExport =
  | plugin.Plugin
  | (() => Promise<plugin.Plugin>)
  | (() => plugin.Plugin)

/**
 * A utility function to define new plugins. Since the function has its argument and
 * return value typed, when using it from the plugin default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, plugins can use the '@type' annotation:
 *   @type {import('@gestaltjs/plugins').Plugin}
 *   const config = {...}
 *
 * @param plugin {Plugin | () => Promise<Plugin> | () => Plugin} Define a new plugin.
 * @returns A promise that resolves with the plugin.
 */
export function definePlugin(plugin: PluginExport): PluginExport {
  return plugin
}
