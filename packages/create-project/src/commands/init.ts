import { Command } from '@gestaltjs/core/cli'
import { createProjectLogger } from '../logger'

// eslint-disable-next-line import/no-default-export
export default class Init extends Command {
  static description = 'Create a Gestalt project'

  static flags = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    createProjectLogger().info('Initialized')
  }
}
