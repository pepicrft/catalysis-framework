import { globalFlags, projectFlags } from '@catalysisdev/core/node/command.js'
import { Command, Interfaces } from '@catalysisdev/core/node/oclif.js'

// eslint-disable-next-line import/no-default-export
export default class Build extends Command {
  static description = 'Build a project'

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async run(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Built')
  }
}
