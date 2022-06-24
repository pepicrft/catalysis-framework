import { pluginsLogger } from '../../logger'
import { GestaltCommand } from '@gestaltjs/core/node/command'

// eslint-disable-next-line import/no-default-export
export default class Build extends GestaltCommand {
  static description = 'Build the plugin'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    pluginsLogger().success('Built')
  }
}
