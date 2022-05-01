import { testLogger } from '../logger'
import { Command } from '@gestaltjs/core/cli'

// eslint-disable-next-line import/no-default-export
export default class Test extends Command {
  static description = 'Test your Gestalt project'

  static flags = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<void> {
    testLogger().success('Tested')
  }
}
