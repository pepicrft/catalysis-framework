import { testLogger } from '../logger'
import { GestaltCommand } from '@gestaltjs/core/node/command'

// eslint-disable-next-line import/no-default-export
export default class Test extends GestaltCommand {
  static description = 'Test your Gestalt project'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    testLogger().success('Tested')
  }
}
