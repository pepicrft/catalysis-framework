import { Flags, Interfaces } from '@oclif/core'
import { project, Command } from '@gestaltjs/core/cli'

import { checkStyle } from '../../services/style'

// eslint-disable-next-line import/no-default-export
export default class Style extends Command {
  static description = 'Check the code style using ESLint.'

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
    const { flags } = await this.parse(Styles)
    const loadedProject = await project.load(flags.path)

    await checkStyle({
      fix: flags.fix,
      project: loadedProject,
    })
  }
}
