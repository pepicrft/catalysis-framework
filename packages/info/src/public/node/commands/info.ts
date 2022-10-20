import { loadProject } from '@gestaltjs/core/node/project'
import { infoLogger } from '../../../private/node/logger.js'
import { formatJson } from '../../../private/node/formatters/json.js'
import { prettyFormat } from '../../../private/node/formatters/pretty.js'
import { globalFlags, projectFlags } from '@gestaltjs/core/node/command'
import { Command, Flags, Interfaces } from '@gestaltjs/core/node/oclif'
import { absolutePath } from '@gestaltjs/core/node/path'

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
