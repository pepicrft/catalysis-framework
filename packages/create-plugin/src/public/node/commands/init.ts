import { createPluginLogger } from '../../../private/logger.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { Flags } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Init extends GestaltCommand {
  static description = 'Create a Gestalt plugin'

  static flags = {
    ...GestaltCommand.flags,
  }

  async run(): Promise<void> {
    createPluginLogger().info('Plugin created')
  }
}
