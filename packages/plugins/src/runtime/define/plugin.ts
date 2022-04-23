import { UserPlugin } from '@gestaltjs/core/shared'

/**
 * Interface of the arguemnt and return type of definePlugin.
 */
type PluginExport =
  | UserPlugin
  | (() => Promise<UserPlugin>)
  | (() => UserPlugin)

/**
 * A utility function to define new plugins. Since the function has its argument and
 * return value typed, when using it from the plugin default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, plugins can use the '@type' annotation:
 *   @type {import('@gestaltjs/plugins').UserPlugin}
 *   const config = {...}
 *
 * @param plugin {Plugin | () => Promise<Plugin> | () => Plugin} Define a new plugin.
 * @returns A promise that resolves with the plugin.
 */
export function definePlugin(plugin: PluginExport): PluginExport {
  return plugin
}
