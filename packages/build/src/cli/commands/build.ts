import { buildLogger } from '../logger'
import { Command } from '@gestaltjs/core/cli'

// eslint-disable-next-line import/no-default-export
export default class Build extends Command {
  static description = 'Build your Gestalt project'

  static flags = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<void> {
    buildLogger().success('Built')
  }
}
