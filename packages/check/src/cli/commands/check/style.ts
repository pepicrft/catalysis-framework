import { Flags } from '@oclif/core'
import { project } from '@gestaltjs/core/cli'
import { GestaltCommand } from '@gestaltjs/core/node/command'

import { checkStyle } from '../../services/style'

// eslint-disable-next-line import/no-default-export
export default class Style extends GestaltCommand {
  static description = 'Check the code style using ESLint.'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
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
    const loadedProject = await project.load(flags.path)

    await checkStyle({
      fix: flags.fix,
      project: loadedProject,
    })
  }
}
