import { MainTarget } from '@gestaltjs/core/common/target'
export { useContext } from '@gestaltjs/core/common/context'

type MainTargetExport =
  | MainTarget
  | (() => Promise<MainTarget>)
  | (() => MainTarget)

/**
 * A utility function to define a main target target. Since the function has its argument and
 * return value typed, when using it from the target default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, targets can use the '@type' annotation:
 *   @type {import('gestaltjs/target').MainTarget}
 *   const target = {...}
 *
 * @param target {Target | () => Promise<MainTarget> | () => MainTarget} Define a new target.
 * @returns A promise that resolves with the target.
 */
export function defineMainTarget(target: MainTargetExport): MainTargetExport {
  return target
}
