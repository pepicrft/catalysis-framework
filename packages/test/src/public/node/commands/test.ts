import { testLogger } from '../../../private/node/logger.js'
import { projectFlags, globalFlags } from '@gestaltjs/core/node/command'
import { Command } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Test extends Command {
  static description = "Run a project's tests"

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
  }

  async run(): Promise<void> {
    testLogger().success('Tested')
  }
}
