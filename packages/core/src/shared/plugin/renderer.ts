import type { PluginOption } from 'vite'

export type UserRendererAlias = { find: string; replacement: string }

export type UserRenderer = {
  /**
   * The file extension (without the dot) of the UI components. For example "jsx" or "svelte".
   */
  extensions: string[]

  /**
   * A list of Vite plugins that are necessary for the build process to transpile the UI components.
   */
  plugins: (PluginOption | PluginOption[])[]

  /**
   * Renderer modules might import modules that Gestalt doesn't know
   * how to resolve. Aliases instructs Gestalt on how to resolve those.
   */
  aliases?: UserRendererAlias[]

  /**
   * A function that returns the ESM that hydrates a server-side rendered component.
   * Internally, Gestalt creates a plugin dynamically where his hydrate function represents the load hook of
   * the plugin. You can read more about the load hook here:
   *   https://rollupjs.org/guide/en/#load
   *
   * @param componentModuleId {string} The identifier of the ESM that default-exports the component to hydrate.
   * @param domElementSelector {string} Them DOM selector where the component was mounted server-side.
   *
   * @returns {Module} The module that will load client-side to hydrate the component.
   */
  hydrate: {
    content: (
      componentModuleId: string,
      domElementSelector: string
    ) => Promise<string> | string
    extension: string
  }

  /**
   * A function that returns the ESM that renders a component server-side.
   * Internally, Gestalt creates a plugin dynamically where his hydrate function represents the load hook of
   * the plugin. You can read more about the load hook here:
   *
   * @param componentModuleId {string} The identifier of the ESM that default-exports the component to render.
   *
   * @returns {Module} The module that will be used server-side to render the component.
   */
  ssr: {
    content: (componentModuleId: string) => Promise<string> | string
    extension: string
  }
}
