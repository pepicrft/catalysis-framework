import { Flags } from '@oclif/core'
import { project, Command } from '@gestaltjs/core/cli'

import { checkStyle } from '../../services/style'

// eslint-disable-next-line import/no-default-export
export default class Style extends Command {
  static description = 'Check the code style using ESLint.'

  static flags = {
    ...Command.globalFlags,
    ...Command.projectFlags,
    fix: Flags.boolean({
      char: 'f',
      description: 'When passed, it fixes the fixable style issues.',
      default: false,
      required: false,
      env: 'GESTALT_FIX',
    }),
  }
  async run(): Promise<void> {
    const { flags } = await this.parse(Style)
    const loadedProject = await project.loadProject(flags.path)

    await checkStyle({
      fix: flags.fix,
      project: loadedProject,
    })
  }
}
