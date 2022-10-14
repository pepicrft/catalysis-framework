import { Interfaces, Flags } from '@oclif/core'
import { loadProject } from '@gestaltjs/core/node/project'
import { GestaltCommand } from '@gestaltjs/core/node/command'

import { checkStyle } from '../../../../internal/node/services/style.js'
import { absolutePath } from '@gestaltjs/core/node/path'

// eslint-disable-next-line import/no-default-export
export default class Style extends GestaltCommand {
  static description = 'Check the code style using ESLint.'

  static flags: Interfaces.FlagInput = {
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
    const project = await loadProject(absolutePath(flags.path))

    await checkStyle({
      fix: flags.fix,
      project: project,
    })
  }
}
