import { Flags } from '@oclif/core'
import { project } from '@gestaltjs/core/cli'
import { checkCode } from '../../services/code'
import { checkStyle } from '../../services/style'
import { GestaltCommand } from '@gestaltjs/core/node/command'

// eslint-disable-next-line import/no-default-export
export default class All extends GestaltCommand {
  static description = 'Check code and style.'

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
    const { flags } = await this.parse(All)
    const loadedProject = await project.load(flags.path)

    await checkCode(loadedProject.directory)
    await checkStyle({
      fix: flags.fix,
      project: loadedProject,
    })
  }
}
