import { Target } from '@gestaltjs/core/shared'

export { Target }

type TargetExport = Target | (() => Promise<Target>) | (() => Target)

/**
 * A utility function to define a project target. Since the function has its argument and
 * return value typed, when using it from the target default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, targets can use the '@type' annotation:
 *   @type {import('gestaltjs').Target}
 *   const target = {...}
 *
 * @param target {Target | () => Promise<Target> | () => Target} Define a new target.
 * @returns A promise that resolves with the target.
 */
export function defineTarget(target: TargetExport): TargetExport {
  return target
}
