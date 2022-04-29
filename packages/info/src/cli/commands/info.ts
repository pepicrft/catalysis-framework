import { Command, loader } from '@gestaltjs/core/cli'
import { infoLogger } from '../logger'
import { formatJson } from '../formatters/json'
import { prettyFormat } from '../formatters/pretty'

// eslint-disable-next-line import/no-default-export
export default class Info extends Command {
  static description = 'Output an overview of a Gestalt project'

  static flags = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<any> {
    const { flags } = await this.parse(Info)
    const { project } = await loader.load(flags.path)
    if (flags.json) {
      infoLogger().rawInfo(formatJson(project), { project })
    } else {
      infoLogger().rawInfo(prettyFormat(project), { project })
    }
  }
}
