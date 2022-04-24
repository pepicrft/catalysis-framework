import { Flags, Interfaces } from '@oclif/core'
import { project, Command } from '@gestaltjs/core/cli'
import { checkCode } from '../../services/code'

// eslint-disable-next-line import/no-default-export
export default class Code extends Command {
  static description = 'Check code using Typescript'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
    path: Flags.string({
      char: 'p',
      description:
        'The path to the directory containing the Gestalt project. Defaults to current working directory.',
      hidden: false,
      multiple: false,
      env: 'GESTALT_PATH',
      default: process.cwd(),
      required: false,
    }),
  }
  async run(): Promise<void> {
    const { flags } = await this.parse(Code)
    const loadedProject = await project.loadProject(flags.path)

    await checkCode(loadedProject.directory)
  }
}
