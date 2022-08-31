import { dbLogger } from '../../logger.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { Flags } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Migrate extends GestaltCommand {
  static description = 'Migrate the database'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    dbLogger().success('Migrated')
  }
}
