import type { Configuration } from './configuration'

/**
 * Interface that represents a Gestalt application.
 */
export default interface App {
  /** Directory where the app lives */
  directory: string

  /** App configuration */
  configuration: Configuration
}
