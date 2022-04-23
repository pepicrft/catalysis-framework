import type { PluginOption } from 'vite'

export type UserRenderer = {
  /**
   * The file extension (without the dot) of the UI components. For example "jsx" or "svelte".
   */
  fileExtensions: string[]

  /**
   * A list of Vite plugins that are necessary for the build process to transpile the UI components.
   */
  vitePlugins: (PluginOption | PluginOption[])[]

  /**
   * A list of dependencies that are required in the project. For example "react".
   */
  requiredProjectDependencies: string[]
}
