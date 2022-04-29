import { Interfaces } from '@oclif/core'
import { Command } from '@gestaltjs/core/cli'
import { infoLogger } from '../logger'

// eslint-disable-next-line import/no-default-export
export default class Info extends Command {
  static description = 'Output an overview of a Gestalt project'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    infoLogger().success('Information')
  }
}
