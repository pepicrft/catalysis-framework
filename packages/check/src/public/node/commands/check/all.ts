import { Command, Flags, Interfaces } from '@catalysisdev/core/node/oclif.js'
import { loadProject } from '@catalysisdev/core/node/project.js'
import { checkCode } from '../../../../internal/node/services/code.js'
import { checkStyle } from '../../../../internal/node/services/style.js'
import { globalFlags, projectFlags } from '@catalysisdev/core/node/command.js'
import { absolutePath } from '@catalysisdev/core/node/path.js'

// eslint-disable-next-line import/no-default-export
export default class All extends Command {
  static description = 'Check code and style.'

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
    fix: Flags.boolean({
      char: 'f',
      description: 'When passed, it fixes the fixable style issues.',
      default: false,
      required: false,
      env: 'CATALYSIS_FIX',
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
