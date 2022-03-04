import { Command, Flags } from '@oclif/core'
import { app } from '@gestaltjs/core/cli'
import checkCodeService from '../../services/code'
export default class Code extends Command {
  static description = 'Check code using Typescript'

  static flags = {
    path: Flags.string({
      char: 'p',
      description: 'path to the directory from where check will be executed',
      hidden: false,
      multiple: false,
      env: 'GESTALT_PATH',
      default: process.cwd(),
      required: false,
    }),
  }
  async run(): Promise<void> {
    const { flags } = await this.parse(Code)
    const loadedApp = await app.load(flags.path)

    await checkCodeService(loadedApp.directory)
  }
}
