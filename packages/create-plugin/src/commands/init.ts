import { Command } from '@gestaltjs/core/cli'
import { createPluginLogger } from '../logger'

// eslint-disable-next-line import/no-default-export
export default class Init extends Command {
  static description = 'Create a Gestalt plugin'

  static flags = {
    ...Command.flags,
  }

  async run(): Promise<void> {
    createPluginLogger().info('Plugin created')
  }
}
