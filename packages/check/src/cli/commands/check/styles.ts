import { Command, Flags } from '@oclif/core'
import { project } from '@gestaltjs/core/cli'
import checkStylesService from '../../services/styles'
export default class Styles extends Command {
  static description = 'Check styles using ESLint'

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
    fix: Flags.boolean({
      char: 'f',
      description: 'When passed, it fixes the fixable style issues.',
      default: false,
      required: false,
      env: 'GESTALT_FIX',
    }),
  }
  async run(): Promise<void> {
    const { flags } = await this.parse(Styles)
    const loadedProject = await project.load(flags.path)

    await checkStylesService({
      fix: flags.fix,
      project: loadedProject,
    })
  }
}
