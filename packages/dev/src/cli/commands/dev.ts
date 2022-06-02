import { project } from '@gestaltjs/core/cli'
import { devProject } from '../services/dev'
import { GestaltCommand } from '@gestaltjs/core/node/command'

// eslint-disable-next-line import/no-default-export
export default class Dev extends GestaltCommand {
  static description = 'Dev your Gestalt project'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Dev)
    const loadedProject = await project.load(flags.path)
    const { onChange } = await devProject(loadedProject)
  }
}
