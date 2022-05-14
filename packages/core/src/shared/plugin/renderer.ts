import type { PluginOption } from 'vite'
import { Program } from 'estree'
import { SourceMap } from 'magic-string'

export type ESTreeProgram = Program

/**
 * Renderer plugins are hooked into Gestalt by leveraging Rollup plugins and virtual modules.
 * When loading a module for rendering a component, either server or client side, it'll obtain
 * the module from the plugin, and the output that it'll get adheres to this type.
 */
export type RendererOutputModule =
  | string
  | null
  | {
      code: string
      map?: string | SourceMap
      ast?: Program
      moduleSideEffects?: boolean | 'no-treeshake' | null
      syntheticNamedExports?: boolean | string | null
      meta?: { [plugin: string]: any } | null
    }

export type UserServerRenderer = {
  /**
   * A function that returns the ESM that renders a component server-side.
   * Internally, Gestalt creates a plugin dynamically where his hydrate function represents the load hook of
   * the plugin. You can read more about the load hook here:
   *
   * @param componentModuleId {string} The identifier of the ESM that default-exports the component to render.
   *
   * @returns {RendererOutputModule} The module that will be used server-side to render the component.
   */
  render: (
    componentModuleId: string
  ) => Promise<RendererOutputModule> | RendererOutputModule
}

export type UserClientRenderer = {
  /**
   * A function that returns the ESM that hydrates a server-side rendered component.
   * Internally, Gestalt creates a plugin dynamically where his hydrate function represents the load hook of
   * the plugin. You can read more about the load hook here:
   *   https://rollupjs.org/guide/en/#load
   *
   * @param componentModuleId {string} The identifier of the ESM that default-exports the component to hydrate.
   * @param domElementSelector {string} Them DOM selector where the component was mounted server-side.
   *
   * @returns {RendererOutputModule} The module that will load client-side to hydrate the component.
   */
  hydrate: (
    componentModuleId: string,
    domElementSelector: string
  ) => Promise<RendererOutputModule> | RendererOutputModule
}

export type UserRendererAlias = { find: string; replacement: string }

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
   * Renderer modules might import modules like "react-dom" that Gestalt doesn't know
   * how to resolve. This function instructs Gestalt on how to resolve those.
   */
  aliases: () => UserRendererAlias[] | Promise<UserRendererAlias[]>

  /**
   * The client-side renderer that hydrates the server-side-rendered page.
   */
  client: UserClientRenderer

  /**
   * The server-side renderer.
   */
  server: UserServerRenderer
}
