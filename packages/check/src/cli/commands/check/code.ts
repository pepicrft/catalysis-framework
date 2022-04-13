import { Command, Flags } from '@oclif/core'
import { project } from '@gestaltjs/core/cli'
import checkCodeService from '../../services/code'
export default class Code extends Command {
  static description = 'Check code using Typescript'

  static flags = {
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
    const loadedProject = await project.load(flags.path)

    await checkCodeService(loadedProject.directory)
  }
}
