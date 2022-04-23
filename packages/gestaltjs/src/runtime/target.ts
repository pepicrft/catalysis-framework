import { UserMainTarget, UserSharedTarget } from '@gestaltjs/core/shared'

export { UserMainTarget, UserSharedTarget }

type UserMainTargetExport =
  | UserMainTarget
  | (() => Promise<UserMainTarget>)
  | (() => UserMainTarget)

type UserSharedTargetExport =
  | UserSharedTarget
  | (() => Promise<UserSharedTarget>)
  | (() => UserSharedTarget)

/**
 * A utility function to define a main target target. Since the function has its argument and
 * return value typed, when using it from the target default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, targets can use the '@type' annotation:
 *   @type {import('gestaltjs/target').UserMainTarget}
 *   const target = {...}
 *
 * @param target {Target | () => Promise<UserMainTarget> | () => UserMainTarget} Define a new target.
 * @returns A promise that resolves with the target.
 */
export function defineUserMainTarget(
  target: UserMainTargetExport
): UserMainTargetExport {
  return target
}

/**
 * A utility function to define a main target target. Since the function has its argument and
 * return value typed, when using it from the target default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, targets can use the '@type' annotation:
 *   @type {import('gestaltjs/target').UserSharedTarget}
 *   const target = {...}
 *
 * @param target {Target | () => Promise<UserSharedTarget> | () => UserSharedTarget} Define a new target.
 * @returns A promise that resolves with the target.
 */
export function defineUserSharedTarget(
  target: UserSharedTargetExport
): UserSharedTargetExport {
  return target
}
