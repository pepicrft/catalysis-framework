import type { Plugin } from './plugin'

export type Configuration = {
  /**
   * The name of the project
   */
  name: string

  /**
   * Plugins to use with the project.
   */
  plugins?: Plugin[]
}
