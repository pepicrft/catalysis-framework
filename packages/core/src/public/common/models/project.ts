import { AbsolutePath, absolutePath } from '../../node/path.js'
import type { Configuration } from './configuration'

export type ProjectImplConstructorOptions = {
  /** The directory that contains the project */
  directory: AbsolutePath

  /** The project's configuration loaded from the gestalt.config.{js,ts} file */
  configuration: Configuration
}

export class ProjectImpl implements Project {
  directory: AbsolutePath
  configuration: Configuration

  constructor(options: ProjectImplConstructorOptions) {
    this.directory = options.directory
    this.configuration = options.configuration
  }

  get sourceDirectory(): AbsolutePath {
    return this.directory.appending('src')
  }

  get middlewaresDirectory(): AbsolutePath {
    return this.sourceDirectory.appending('middlewares')
  }
}

/**
 * Interface that represents a Gestalt project.
 */
export interface Project {
  /** Directory where the project lives */
  readonly directory: AbsolutePath

  /** Project configuration */
  readonly configuration: Configuration

  /** Returns the directory that contains the source code */
  readonly sourceDirectory: AbsolutePath

  /** Returns the directory that contains the middlewares */
  readonly middlewaresDirectory: AbsolutePath
}
