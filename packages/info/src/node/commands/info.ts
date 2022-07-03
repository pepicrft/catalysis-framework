import { loadProject } from '@gestaltjs/core/node/project'
import { infoLogger } from '../logger.js'
import { formatJson } from '../formatters/json.js'
import { prettyFormat } from '../formatters/pretty.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { Flags } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Info extends GestaltCommand {
  static description = 'Output an overview of a Gestalt project'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<any> {
    const { flags } = await this.parse(Info)
    const loadedProject = await loadProject(flags.path)
    if (flags.json) {
      infoLogger().rawInfo(formatJson({ project: loadedProject }), {
        project: loadedProject,
      })
    } else {
      infoLogger().rawInfo(prettyFormat({ project: loadedProject }), {
        project: loadedProject,
      })
    }
  }
}
