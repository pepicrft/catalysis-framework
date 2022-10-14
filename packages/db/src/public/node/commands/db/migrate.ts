import { dbLogger } from '../../../../private/logger.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { Interfaces } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Migrate extends GestaltCommand {
  static description = 'Migrate the database'

  static flags: Interfaces.FlagInput = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    dbLogger().success('Migrated')
  }
}
