import { loadProject } from '@catalysisdev/core/node/project.js'
import { devProject } from '../../../private/node/services/dev.js'
import { projectFlags, globalFlags } from '@catalysisdev/core/node/command.js'
import { Command, Interfaces } from '@catalysisdev/core/node/oclif.js'
import { absolutePath } from '@catalysisdev/core/node/path.js'

// eslint-disable-next-line import/no-default-export
export default class Dev extends Command {
  static description = 'Serves a project for development'

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Dev)
    const project = await loadProject(absolutePath(flags.path))
    // const { onChange } = await devProject(project)
  }
}
