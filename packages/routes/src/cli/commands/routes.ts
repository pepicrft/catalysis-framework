import { Command, project } from '@gestaltjs/core/cli'
import { routesLogger } from '../logger'
import { formatJson } from '../formatters/json'
import { prettyFormat } from '../formatters/pretty'

// eslint-disable-next-line import/no-default-export
export default class Routes extends Command {
  static description = 'Output the aggregated routes of a project'

  static flags = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<any> {
    const { flags } = await this.parse(Routes)
    const loadedProject = await project.load(flags.path)
    if (flags.json) {
      routesLogger().rawInfo(formatJson({ project: loadedProject }), {
        project: loadedProject,
      })
    } else {
      routesLogger().rawInfo(prettyFormat({ project: loadedProject }), {
        project: loadedProject,
      })
    }
  }
}
