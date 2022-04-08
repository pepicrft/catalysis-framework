import { Command } from '@oclif/core'
import logger from '../logger'
import { error } from '@gestaltjs/core/cli'

export default class Build extends Command {
  static description = 'Build your Gestalt project'

  async run(): Promise<void> {
    throw new error.Bug('Message', {
      cause: "We couldn't generate whatever",
    })
    logger().success('Built')
  }
}
