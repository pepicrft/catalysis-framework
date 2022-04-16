import { Flags, Interfaces } from '@oclif/core'
import { project, Command } from '@gestaltjs/core/cli'
import checkCodeService from '../../services/code'
import checkStylesService from '../../services/styles'

export default class All extends Command {
  static description = 'Check code and style.'

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
    fix: Flags.boolean({
      char: 'f',
      description: 'When passed, it fixes the fixable style issues.',
      default: false,
      required: false,
      env: 'GESTALT_FIX',
    }),
  }
  async run(): Promise<void> {
    const { flags } = await this.parse(All)
    const loadedProject = await project.load(flags.path)

    await checkCodeService(loadedProject.directory)
    await checkStylesService({
      fix: flags.fix,
      project: loadedProject,
    })
  }
}
