import { loadProject } from '@gestaltjs/core/node/project'
import { checkCode } from '../../services/code.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'

// eslint-disable-next-line import/no-default-export
export default class Code extends GestaltCommand {
  static description = 'Check code using Typescript'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Code)
    const project = await loadProject(flags.path)
    await checkCode(project.directory)
  }
}
