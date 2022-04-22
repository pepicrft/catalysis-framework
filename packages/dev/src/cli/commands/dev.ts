import { Interfaces } from '@oclif/core'
import { Command } from '@gestaltjs/core/cli'
import { devLogger } from '../logger'

// eslint-disable-next-line import/no-default-export
export default class Serve extends Command {
  static description = 'Serve your Gestalt project'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    devLogger().success('Served')
  }
}
