import { UserConfiguration } from '../../../../public/common/manifests.js'
import { AbsolutePath } from 'typed-file-system-path'

/** Options to create a ConfigurationImpl instance */
type ConfigurationImplInitOptions = {
  /** The path to the catalysis.config.{js,ts} file */
  path: AbsolutePath

  /** The content of the loaded configuration file module */
  userConfiguration: UserConfiguration
}

export class ConfigurationImpl implements UserConfiguration {
  path: AbsolutePath
  name: string

  constructor(options: ConfigurationImplInitOptions) {
    this.path = options.path
    this.name = options.userConfiguration.name
  }
}
