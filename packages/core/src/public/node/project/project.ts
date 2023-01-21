import { AbsolutePath } from '../path.js'
import type { Configuration } from './configuration.js'

/**
 * Interface that represents a Catalysis project.
 */
export interface Project {
  /** Directory where the project lives */
  readonly directory: AbsolutePath

  /** Project configuration */
  readonly configuration: Configuration

  /** A glob pattern to look up the sources of the project */
  readonly sourcesGlob: string

  /** Returns the directory that contains the source code */
  readonly sourceDirectory: AbsolutePath

  /** Returns the directory that contains the middlewares */
  readonly middlewaresDirectory: AbsolutePath
}
