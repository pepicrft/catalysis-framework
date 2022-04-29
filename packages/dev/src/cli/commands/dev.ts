import { Interfaces, Flags } from '@oclif/core'
import { Command } from '@gestaltjs/core/cli'
import { loader } from '@gestaltjs/core/cli'
import { devProject } from '../services/dev'

// eslint-disable-next-line import/no-default-export
export default class Dev extends Command {
  static description = 'Dev your Gestalt project'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Dev)
    const { project, plugins } = await loader.load(flags.path)
    const { onChange } = await devProject(project)
  }
}
