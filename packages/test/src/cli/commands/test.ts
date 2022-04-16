import logger from '../logger'
import { Command } from '@gestaltjs/core/cli'
import { Interfaces } from '@oclif/core'

export default class Test extends Command {
  static description = 'Test your Gestalt project'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    logger().success('Tested')
  }
}
