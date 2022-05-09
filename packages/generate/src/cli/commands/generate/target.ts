import { Command } from '@gestaltjs/core/cli'
import { generateLogger } from '../../logger'

// eslint-disable-next-line import/no-default-export
export default class Target extends Command {
  static description = 'Generate a new target'

  static flags = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<void> {
    generateLogger().success('Generated')
  }
}
