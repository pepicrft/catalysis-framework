import { loadProject } from '@catalysisdev/core/node/project.js'
import { formatJson } from '../../../private/node/formatters/json.js'
import { prettyFormat } from '../../../private/node/formatters/pretty.js'
import { globalFlags, projectFlags } from '@catalysisdev/core/node/command.js'
import { Command, Interfaces } from '@catalysisdev/core/node/oclif.js'
import { absolutePath } from '@catalysisdev/core/node/path.js'

// eslint-disable-next-line import/no-default-export
export default class Routes extends Command {
  static description = "Output a project's routes"

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
  }

  async run(): Promise<any> {
    const { flags } = await this.parse(Routes)
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
