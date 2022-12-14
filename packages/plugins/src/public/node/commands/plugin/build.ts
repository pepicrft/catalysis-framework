import { globalFlags, projectFlags } from '@gestaltjs/core/node/command'
import { Command, Interfaces } from '@gestaltjs/core/node/oclif'

// eslint-disable-next-line import/no-default-export
export default class Build extends Command {
  static description = 'Build a project'

  static flags = {
    ...globalFlags(),
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async run(): Promise<void> {
    // noop
  }
}
