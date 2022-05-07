import { RadixRouter } from 'radix3'
import { Route } from './main/route'
import type { UserMainTarget } from '../../../../shared/targets'

/**
 * This type augments the interface of UserMainTarget adding properties and functions that are
 * internal to the framework. For example, the directory where the target is located,
 * which is obtained at loading time.
 */
export type MainTarget = UserMainTarget & {
  /**
   * The target name.
   */
  name: string
  /**
   * The path to the directory that contains the target.
   */
  directory: string
  /**
   * A path to the gestalt.main.target.{js,ts} file that describes the project.
   */
  manifestPath: string

  /** A router instance that contains all the routes of the target */
  router: RadixRouter<Route>
}
