import { project } from '@gestaltjs/core/cli'
import { checkCode } from '../../services/code'
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
    const loadedProject = await project.load(flags.path)
    await checkCode(loadedProject.directory)
  }
}
