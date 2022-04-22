import { Interfaces } from '@oclif/core'
import { Command } from '@gestaltjs/core/cli'
import { dbLogger } from '../../logger'

// eslint-disable-next-line import/no-default-export
export default class Migrate extends Command {
  static description = 'Build your Gestalt project'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    dbLogger().success('Migrated')
  }
}
