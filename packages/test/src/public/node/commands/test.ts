import { testLogger } from '../../../private/node/logger.js'
import { projectFlags, globalFlags } from '@catalysisdev/core/node/command'
import { Command, Interfaces } from '@catalysisdev/core/node/oclif'

// eslint-disable-next-line import/no-default-export
export default class Test extends Command {
  static description = "Run a project's tests"

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async run(): Promise<void> {
    testLogger().success('Tested')
  }
}
