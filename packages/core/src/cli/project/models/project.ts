import type { Configuration } from '../../../shared/configuration'

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
}
