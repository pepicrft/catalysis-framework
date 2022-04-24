import { UserServerRenderer } from '@gestaltjs/core/shared'

/**
 * Interface of the arguemnt and return type of definePlugin.
 */
type ServerRendererExport =
  | UserServerRenderer
  | (() => Promise<UserServerRenderer>)
  | (() => UserServerRenderer)

/**
 * A utility function to define a new server renderer. Since the function has its argument and
 * return value typed, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, renderers can use the '@type' annotation:
 *   @type {import('@gestaltjs/plugins').ServerRenderer}
 *   const config = {...}
 *
 * @param renderer {ServerRendererExport | () => Promise<ServerRendererExport> | () => ServerRendererExport} Define a new server renderer.
 * @returns A promise that resolves with the server renderer.
 */
export function defineServerRenderer(
  renderer: ServerRendererExport
): ServerRendererExport {
  return renderer
}
