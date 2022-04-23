import type { Configuration } from './configuration'
import { TargetsGraph } from './target'

/**
 * Interface that represents a Gestalt project.
 */
export interface Project {
  /** Directory where the project lives */
  directory: string

  /** Project configuration */
  configuration: Configuration

  /** Application sources glob */
  sourcesGlob: string

  /** The graph representing the targets of the project */
  targetsGraph: TargetsGraph
}
