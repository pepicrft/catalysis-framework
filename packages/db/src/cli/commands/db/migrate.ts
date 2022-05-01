import { Command } from '@gestaltjs/core/cli'
import { dbLogger } from '../../logger'

// eslint-disable-next-line import/no-default-export
export default class Migrate extends Command {
  static description = 'Build your Gestalt project'

  static flags = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<void> {
    dbLogger().success('Migrated')
  }
}
