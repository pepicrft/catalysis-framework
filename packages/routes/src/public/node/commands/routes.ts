import { loadProject } from '@gestaltjs/core/node/project'
import { routesLogger } from '../../../private/node/logger.js'
import { formatJson } from '../../../private/node/formatters/json.js'
import { prettyFormat } from '../../../private/node/formatters/pretty.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { Flags } from '@oclif/core'
import { absolutePath } from '@gestaltjs/core/node/path'

// eslint-disable-next-line import/no-default-export
export default class Routes extends GestaltCommand {
  static description = "Output a project's routes"

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<any> {
    const { flags } = await this.parse(Routes)
    const loadedProject = await loadProject(absolutePath(flags.path))
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
