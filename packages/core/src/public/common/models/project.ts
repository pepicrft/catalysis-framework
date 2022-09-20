import type { Configuration } from './configuration'
import { WebTarget } from './targets/web'

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

  /** The web targets of the project */
  targets: { [name: string]: WebTarget }
}
