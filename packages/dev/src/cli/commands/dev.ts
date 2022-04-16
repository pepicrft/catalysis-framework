import { Interfaces } from '@oclif/core'
import { Command } from '@gestaltjs/core/cli'
import logger from '../logger'

export default class Serve extends Command {
  static description = 'Serve your Gestalt project'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    logger().success('Served')
  }
}
