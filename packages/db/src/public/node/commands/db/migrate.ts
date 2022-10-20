import { dbLogger } from '../../../../private/logger.js'
import { projectFlags, globalFlags } from '@gestaltjs/core/node/command'
import { Command, Flags, Interfaces } from '@gestaltjs/core/node/oclif'

// eslint-disable-next-line import/no-default-export
export default class Migrate extends Command {
  static description = 'Migrate the database'

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
  }

  async run(): Promise<void> {
    dbLogger().success('Migrated')
  }
}
