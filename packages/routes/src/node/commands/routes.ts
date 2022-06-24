import { loadProject } from '@gestaltjs/core/node/project'
import { routesLogger } from '../logger'
import { formatJson } from '../formatters/json'
import { prettyFormat } from '../formatters/pretty'
import { GestaltCommand } from '@gestaltjs/core/node/command'

// eslint-disable-next-line import/no-default-export
export default class Routes extends GestaltCommand {
  static description = 'Output the aggregated routes of a project'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<any> {
    const { flags } = await this.parse(Routes)
    const loadedProject = await loadProject(flags.path)
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
