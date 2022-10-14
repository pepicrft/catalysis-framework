import { loadProject } from '@gestaltjs/core/node/project'
import { checkCode } from '../../../../internal/node/services/code.js'
import { globalFlags, projectFlags } from '@gestaltjs/core/node/command'
import { absolutePath } from '@gestaltjs/core/node/path'
import { Command } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Code extends Command {
  static description = 'Check code using Typescript'

  static flags = {
    ...globalFlags(),
    ...projectFlags(),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Code)
    const project = await loadProject(absolutePath(flags.path))
    await checkCode(project.directory)
  }
}
