import type { UserPlugin } from './plugin'

export type UserConfiguration = {
  /**
   * The name of the project
   */
  name: string

  /**
   * Plugins to use with the project.
   */
  plugins?: UserPlugin[]
}
