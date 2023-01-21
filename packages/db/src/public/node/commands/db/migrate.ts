import { projectFlags, globalFlags } from '@catalysisdev/core/node/command.js'
import { Command, Flags, Interfaces } from '@catalysisdev/core/node/oclif.js'

// eslint-disable-next-line import/no-default-export
export default class Migrate extends Command {
  static description = 'Migrate the database'

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async run(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Migrated')
  }
}
