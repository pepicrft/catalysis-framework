import logger from '../logger'
import { error, Command } from '@gestaltjs/core/cli'
import { Interfaces } from '@oclif/core'

export default class Build extends Command {
  static description = 'Build your Gestalt project'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    throw new error.Abort('Message', {
      cause: "We couldn't generate whatever",
      next: 'Do x',
    })
    logger().success('Built')
  }
}
