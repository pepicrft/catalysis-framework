import type { UserConfiguration } from '../../../shared/configuration'

export type Configuration = UserConfiguration & {
  /** The path to the gestalt.config.{js,ts} file */
  manifestPath: string
}
