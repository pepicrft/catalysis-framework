import { testLogger } from '../logger'
import { Command } from '@gestaltjs/core/cli'
import { Interfaces } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Test extends Command {
  static description = 'Test your Gestalt project'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    testLogger().success('Tested')
  }
}
