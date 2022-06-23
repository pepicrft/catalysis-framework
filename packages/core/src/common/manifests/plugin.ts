import type { UserAdapter } from '../../node/plugin/adapter'

/**
 * The interface represents a Gestalt plugin. Plugins extend, augment, or replace Gestalt's
 * functionality, and also add new functionality.
 */
export type UserPlugin = {
  // The plugin name.
  name: string

  // The plugin description.
  description: string

  /**
   * An adapter instructs Gestalt on how to build and output a Gestalt project for distribution.
   */
  adapter?: UserAdapter
}

/**
 * Interface of the arguemnt and return type of definePlugin.
 */
type PluginExport = <T>(options?: T) => UserPlugin | Promise<UserPlugin>

/**
 * A utility function to define new plugins. Since the function has its argument and
 * return value typed, when using it from the plugin default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, plugins can use the '@type' annotation:
 *   @type {import('@gestaltjs/core/node/plugin').Plugin}
 *   const plugin = {...}
 *
 * @param plugin {<T>(options: T) => plugin.Plugin} Define a new plugin.
 * @returns A promise that resolves with the plugin.
 */
export function definePlugin(plugin: PluginExport): PluginExport {
  return plugin
}
