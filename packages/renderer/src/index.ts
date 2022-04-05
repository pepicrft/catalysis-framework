import type { Renderer } from './renderer'

export { Renderer }

type RendererExport = Renderer | (() => Promise<Renderer>) | (() => Renderer)

/**
 * A utility function to define new renderers. Since the function has its argument and
 * return value typed, when using it from the renderer default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, renderers can use the '@type' annotation:
 *   @type {import('@gestaltjs/renderer').Renderer}
 *   const config = {...}
 *
 * @param renderer {Renderer | () => Promise<Renderer> | () => Renderer} Define a new renderer.
 * @returns A promise that resolves with the renderer.
 */
export function defineRenderer(renderer: RendererExport): RendererExport {
  return renderer
}
