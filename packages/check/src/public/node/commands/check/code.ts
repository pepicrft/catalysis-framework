import { loadProject } from '@gestaltjs/core/node/project'
import { checkCode } from '../../../../internal/node/services/code.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { absolutePath } from '@gestaltjs/core/node/path'
import { Interfaces } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Code extends GestaltCommand {
  static description = 'Check code using Typescript'

  static flags: Interfaces.FlagInput = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Code)
    const project = await loadProject(absolutePath(flags.path))
    await checkCode(project.directory)
  }
}
