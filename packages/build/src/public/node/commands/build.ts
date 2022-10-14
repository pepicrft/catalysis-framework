import { buildLogger } from '../../../private/node/logger.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { Interfaces } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Build extends GestaltCommand {
  static description = 'Build a project'

  static flags: Interfaces.FlagInput = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    buildLogger().success('Built')
  }
}
