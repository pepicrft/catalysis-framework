import { buildLogger } from '../logger'
import { GestaltCommand } from '@gestaltjs/core/node/command'

// eslint-disable-next-line import/no-default-export
export default class Build extends GestaltCommand {
  static description = 'Build your Gestalt project'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    buildLogger().success('Built')
  }
}
