import logger from '../../logger'
import { error, Command } from '@gestaltjs/core/cli'
import { Interfaces } from '@oclif/core'

export default class Build extends Command {
  static description = 'Build the plugin'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    logger().success('Built')
  }
}
