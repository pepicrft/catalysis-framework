import { createProjectLogger } from '../logger'
import { GestaltCommand } from '@gestaltjs/core/node/command'

// eslint-disable-next-line import/no-default-export
export default class Init extends GestaltCommand {
  static description = 'Create a Gestalt project'

  static flags = {
    ...GestaltCommand.flags,
  }

  async run(): Promise<void> {
    createProjectLogger().info('Initialized')
  }
}
