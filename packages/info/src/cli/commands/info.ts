import { Command, loader } from '@gestaltjs/core/cli'
import { infoLogger } from '../logger'

// eslint-disable-next-line import/no-default-export
export default class Info extends Command {
  static description = 'Output an overview of a Gestalt project'

  static flags = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Info)
    const app = await loader.load(flags.path)
    infoLogger().success('Information')
  }
}
