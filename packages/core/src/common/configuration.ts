import type { Plugin } from '../node/plugin'

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
