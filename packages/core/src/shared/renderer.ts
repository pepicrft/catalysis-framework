import type { PluginOption } from 'vite'

type UserServerRendererRenderOutput = { html: string }

export type UserServerRenderer = {
  /**
   * A function that runs server-side to render a given component
   */
  render: (
    component: any
  ) => Promise<UserServerRendererRenderOutput> | UserServerRendererRenderOutput
}

export type UserClientRenderer = {
  /**
   * A function that takes the UI component and the DOM element where
   * the component needs to be hydrated.
   */
  hydrate: (component: any, domElement: HTMLElement) => Promise<void> | void
}

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
   * The client-side renderer that hydrates the server-side-rendered page.
   */
  client: UserClientRenderer

  /**
   * The server-side renderer.
   */
  server: UserServerRenderer
}
