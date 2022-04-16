import { Interfaces } from '@oclif/core'
import { Command } from '@gestaltjs/core/cli'
import logger from '../../logger'

export default class Migrate extends Command {
  static description = 'Build your Gestalt project'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    logger().success('Migrated')
  }
}
