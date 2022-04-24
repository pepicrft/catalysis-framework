import { Interfaces, Flags } from '@oclif/core'
import { Command } from '@gestaltjs/core/cli'
import { loader } from '@gestaltjs/core/cli'
import { devProject } from '../services/dev'

// eslint-disable-next-line import/no-default-export
export default class Dev extends Command {
  static description = 'Dev your Gestalt project'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
    path: Flags.string({
      char: 'p',
      description:
        'The path to the directory containing the Gestalt project. Defaults to current working directory.',
      hidden: false,
      multiple: false,
      env: 'GESTALT_PATH',
      default: process.cwd(),
      required: false,
    }),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Dev)
    const { project, plugins } = await loader.load(flags.path)
    const { onChange } = await devProject(project)
  }
}
