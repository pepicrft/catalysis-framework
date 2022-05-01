import { UserClientRenderer } from '@gestaltjs/core/shared'

/**
 * A utility function to define a new client renderer. Since the function has its argument and
 * return value typed, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, renderers can use the '@type' annotation:
 *   @type {import('@gestaltjs/plugins').ClientRenderer}
 *   const config = {...}
 *
 * @param renderer {UserClientRenderer} Define a new client renderer.
 * @returns A promise that resolves with the client renderer.
 */
export function defineClientRenderer(
  renderer: UserClientRenderer
): UserClientRenderer {
  return renderer
}
