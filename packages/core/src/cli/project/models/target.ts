import { RadixRouter } from 'radix3'
import { Route } from './target/route'
import type { UserMainTarget, UserSharedTarget } from '../../../shared/target'

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
   * A path to the gestalt.target.{js,ts} file that describes the project.
   */
  manifestPath: string

  /** A router instance that contains all the routes of the target */
  router: RadixRouter<Route>
}

/**
 * This type augments the interface of UserSharedTarget adding properties and functions that are
 * internal to the framework. For example, the directory where the target is located,
 * which is obtained at loading time.
 */
export type SharedTarget = UserSharedTarget & {
  name: string
  directory: string
  manifestPath: string
}

type Targets = {
  /** Main targets. Deliverables like a web or a desktop app. */
  main: { [key: string]: MainTarget }

  /** Shared targets. They share functionality across other targets  */
  shared: { [key: string]: SharedTarget }
}

/**
 * A type that represents the targets' graph of a project.
 */
export class TargetsGraph {
  targets: Targets

  constructor(targets: Targets) {
    this.targets = targets
  }
}
