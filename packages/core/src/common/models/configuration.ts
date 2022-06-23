import type { UserConfiguration } from '../manifests/configuration'

export type Configuration = UserConfiguration & {
  /** The path to the gestalt.config.{js,ts} file */
  manifestPath: string
}
