import { buildLogger } from '../../../private/node/logger.js'
import { globalFlags, projectFlags } from '@gestaltjs/core/node/command'
import { Interfaces, Command } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Build extends Command {
  static description = 'Build a project'

  static flags: Interfaces.FlagInput = {
    ...globalFlags(),
    ...projectFlags(),
  }

  async run(): Promise<void> {
    buildLogger().success('Built')
  }
}
