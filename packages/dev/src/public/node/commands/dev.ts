import { loadProject } from '@catalysisdev/core/node/project'
import { devProject } from '../../../private/node/services/dev.js'
import { projectFlags, globalFlags } from '@catalysisdev/core/node/command'
import { Command, Interfaces } from '@catalysisdev/core/node/oclif'
import { absolutePath } from '@catalysisdev/core/node/path'

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
