import { UserWebTarget } from '@gestaltjs/core/common/manifests'
export { useContext } from '@gestaltjs/core/common/context'

type UserWebTargetExport =
  | UserWebTarget
  | (() => Promise<UserWebTarget>)
  | (() => UserWebTarget)

/**
 * A utility function to define a main target target. Since the function has its argument and
 * return value typed, when using it from the target default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * @param target {Target | () => Promise<UserWebTarget> | () => UserWebTarget} Define a new target.
 * @returns A promise that resolves with the target.
 */
export function defineUserWebTarget(
  target: UserWebTargetExport
): UserWebTargetExport {
  return target
}
