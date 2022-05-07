import { Flags } from '@oclif/core'
import { project, Command } from '@gestaltjs/core/cli'
import { checkCode } from '../../services/code'
import { checkStyle } from '../../services/style'

// eslint-disable-next-line import/no-default-export
export default class All extends Command {
  static description = 'Check code and style.'

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
    const { flags } = await this.parse(All)
    const loadedProject = await project.load(flags.path)

    await checkCode(loadedProject.directory)
    await checkStyle({
      fix: flags.fix,
      project: loadedProject,
    })
  }
}
