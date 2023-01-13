import { buildLogger } from '../../../private/node/logger.js'
import { globalFlags, projectFlags } from '@catalysisdev/core/node/command'
import { Command, Interfaces } from '@catalysisdev/core/node/oclif'

// eslint-disable-next-line import/no-default-export
export default class Build extends Command {
  static description = 'Build a project'

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async run(): Promise<void> {
    buildLogger().success('Built')
  }
}
