import { AbsolutePath } from '../../node/path.js'
import type { UserConfiguration } from '../manifests/configuration'
import { UserPlugin } from '../manifests/plugin.js'

/** Options to create a ConfigurationImpl instance */
type ConfigurationImplInitOptions = {
  /** The path to the gestalt.config.{js,ts} file */
  path: AbsolutePath

  /** The content of the loaded configuration file module */
  userConfiguration: UserConfiguration
}

export class ConfigurationImpl implements UserConfiguration {
  path: AbsolutePath
  name: string
  plugins?: UserPlugin[]

  constructor(options: ConfigurationImplInitOptions) {
    this.path = options.path
    this.name = options.userConfiguration.name
    this.plugins = options.userConfiguration.plugins
  }
}

export type Configuration = UserConfiguration & {
  /** The path to the gestalt.config.{js,ts} file */
  path: AbsolutePath
}
