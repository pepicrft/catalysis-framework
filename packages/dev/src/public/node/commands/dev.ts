import { loadProject } from '@gestaltjs/core/node/project'
import { devProject } from '../../../private/node/services/dev.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { Flags } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Dev extends GestaltCommand {
  static description = 'Dev your Gestalt project'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Dev)
    const project = await loadProject(flags.path)
    const { onChange } = await devProject(project)
  }
}
