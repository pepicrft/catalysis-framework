/**
 * There are two target types that are represented by this union:
 *   - main: A main target is a deliverable. For example, a deployable website, or a desktop app.
 *   - shared: A shared target is a non-delierable target that shares functionality across other main and share targets.
 *             For example, a design system.
 */
export type TargetType = 'main' | 'shared'

/**
 * This type declares the interface of a main target defined by the user.
 * Note there's also an internal counterpart type, MainTarget, that augments
 * this type with additional properties and methods that are internal to the framework.
 * For example the directory containing the target.
 */
export type UserMainTarget = {
  product: 'web' | 'desktop'
}

/**
 * This type declares the interface of a shared target defined by the user.
 * Note there's also an internal counterpart type, SharedTarget, that augments
 * this type with additional properties and methods that are internal to the framework.
 * For example the directory containing the target.
 */
export type UserSharedTarget = {
  shared: ''
}
