import { Command, Flags } from '@oclif/core'
import dev from '../services/dev'

export default class Serve extends Command {
  static description = 'Serve your Gestalt application'

  static flags = {
    path: Flags.string({
      char: 'p',
      description: 'path to the directory containing a Gestalt app',
      default: process.cwd(),
    })
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Serve)

    await dev(flags.path);
  }
}
