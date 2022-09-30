import {
  UserConfiguration,
  UserPlugin,
} from '../../../../public/common/manifests'
import { AbsolutePath } from 'typed-file-system-path'

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
