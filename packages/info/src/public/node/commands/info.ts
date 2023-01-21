import { loadProject } from '@catalysisdev/core/node/project'
import { formatJson } from '../../../private/node/formatters/json.js'
import { prettyFormat } from '../../../private/node/formatters/pretty.js'
import { globalFlags, projectFlags } from '@catalysisdev/core/node/command'
import { Command, Flags, Interfaces } from '@catalysisdev/core/node/oclif'
import { absolutePath } from '@catalysisdev/core/node/path'

// eslint-disable-next-line import/no-default-export
export default class Info extends Command {
  static description = 'Output an overview of a project'

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
  }

  async run(): Promise<any> {
    const { flags } = await this.parse(Info)
    const loadedProject = await loadProject(absolutePath(flags.path))
    if (flags.json) {
      // eslint-disable-next-line no-console
      console.log(formatJson({ project: loadedProject }))
    } else {
      // eslint-disable-next-line no-console
      console.log(prettyFormat({ project: loadedProject }))
    }
  }
}
