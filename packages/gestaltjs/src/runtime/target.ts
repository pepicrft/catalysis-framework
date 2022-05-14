import { target } from '@gestaltjs/core/shared'
export { useContext } from '@gestaltjs/core/shared'

type MainTargetExport =
  | target.Main
  | (() => Promise<target.Main>)
  | (() => target.Main)

/**
 * A utility function to define a main target target. Since the function has its argument and
 * return value typed, when using it from the target default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, targets can use the '@type' annotation:
 *   @type {import('gestaltjs/target').target.Main}
 *   const target = {...}
 *
 * @param target {Target | () => Promise<target.Main> | () => target.Main} Define a new target.
 * @returns A promise that resolves with the target.
 */
export function defineMainTarget(target: MainTargetExport): MainTargetExport {
  return target
}
