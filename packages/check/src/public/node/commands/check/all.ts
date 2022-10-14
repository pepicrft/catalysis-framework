import { Interfaces, Flags } from '@oclif/core'
import { loadProject } from '@gestaltjs/core/node/project'
import { checkCode } from '../../../../internal/node/services/code.js'
import { checkStyle } from '../../../../internal/node/services/style.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { absolutePath } from '@gestaltjs/core/node/path'

// eslint-disable-next-line import/no-default-export
export default class All extends GestaltCommand {
  static description = 'Check code and style.'

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
    const { flags } = await this.parse(All)
    const project = await loadProject(absolutePath(flags.path))

    await checkCode(project.directory)
    await checkStyle({
      fix: flags.fix,
      project: project,
    })
  }
}
