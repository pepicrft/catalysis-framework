import { project } from '@gestaltjs/core/cli'
import { infoLogger } from '../logger'
import { formatJson } from '../formatters/json'
import { prettyFormat } from '../formatters/pretty'
import { GestaltCommand } from '@gestaltjs/core/node/command'

// eslint-disable-next-line import/no-default-export
export default class Info extends GestaltCommand {
  static description = 'Output an overview of a Gestalt project'

  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<any> {
    const { flags } = await this.parse(Info)
    const loadedProject = await project.load(flags.path)
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
