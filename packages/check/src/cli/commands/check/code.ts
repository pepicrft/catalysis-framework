import { Flags, Interfaces } from '@oclif/core'
import { project, Command } from '@gestaltjs/core/cli'
import { checkCode } from '../../services/code'

// eslint-disable-next-line import/no-default-export
export default class Code extends Command {
  static description = 'Check code using Typescript'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }
  async run(): Promise<void> {
    const { flags } = await this.parse(Code)
    const loadedProject = await project.loadProject(flags.path)

    await checkCode(loadedProject.directory)
  }
}
