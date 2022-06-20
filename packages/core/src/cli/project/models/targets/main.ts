import { RadixRouter } from 'radix3'
import { Route } from './main/route'
import type { MainTarget as UserMainTarget } from '../../../../common/target'

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
   * A path to the gestalt.main.{js,ts} file that describes the project.
   */
  manifestPath: string

  /** A router instance that contains all the routes of the target */
  router: RadixRouter<Route>

  /**
   * An object containing the layouts of the project. The key represents
   * the URL path of the layout, and the value the path to the file module
   * in the system. For example:
   *
   * routes/
   *   posts/
   *     _layout.jsx
   *     [post].ui.jsx
   *
   * Key: /posts
   * Value: /{target-path}/routes/posts/_layout.jsx
   */
  layouts: { [key: string]: string }
}
