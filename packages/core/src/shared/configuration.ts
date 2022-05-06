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

export type UserConfigurationOptions = {
  /**
   * The environment set by the user when interacting
   * with the project.
   */
  environment: 'development' | 'production' | 'test'
}
