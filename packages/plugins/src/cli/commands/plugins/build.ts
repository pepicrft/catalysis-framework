import { pluginsLogger } from '../../logger'
import { Command } from '@gestaltjs/core/cli'
import { Interfaces } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Build extends Command {
  static description = 'Build the plugin'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<void> {
    pluginsLogger().success('Built')
  }
}
