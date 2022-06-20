/**
 * A union that represents the platforms supported by a target.
 */
export type UserTargetPlatform = 'web' | 'desktop'

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
  platforms: UserTargetPlatform[]

  /**
   * The list of the databases the target has access to. Databases are referenced
   * using their identifier, which is the name of the database's target directory.
   * For example, the database  targets/databases/main/gestalt.database.ts has the
   * identifier "main".
   */
  databases?: string[]
}
