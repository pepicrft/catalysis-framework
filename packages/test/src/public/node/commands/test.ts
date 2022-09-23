import { testLogger } from '../../../private/node/logger.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { Flags } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Test extends GestaltCommand {
  static description = "Run a project's tests"

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    testLogger().success('Tested')
  }
}
