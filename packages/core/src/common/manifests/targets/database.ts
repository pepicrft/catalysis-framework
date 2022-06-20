import type { UserDatabaseTarget } from '../user/database'

/**
 * This type augments the interface of UserDatabaseTarget adding properties and functions that are
 * internal to the framework. For example, the directory where the target is located,
 * which is obtained at loading time.
 */
export type DatabaseTarget = UserDatabaseTarget & {
  /**
   * The target name.
   */
  name: string
  /**
   * The path to the directory that contains the target.
   */
  directory: string
  /**
   * A path to the gestalt.main.{js,ts} file that describes the project.
   */
  manifestPath: string
}
