/**
 * A union that represents the platforms supported by a target.
 */
export type UserMainTargetPlatform = 'web' | 'desktop'

/**
 * This type declares the interface of a main target defined by the user.
 * Note there's also an internal counterpart type, MainTarget, that augments
 * this type with additional properties and methods that are internal to the framework.
 * For example the directory containing the target.
 */
export type UserMainTarget = {
  /**
   * Platforms supported by the target.
   */
  platforms: UserMainTargetPlatform[]
}
