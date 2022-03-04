import { Command, Flags } from '@oclif/core'
import { app } from '@gestaltjs/core/cli'
import checkStylesService from '../../services/styles'
export default class Styles extends Command {
  static description = 'Check styles using ESLint'

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
    fix: Flags.boolean({
      char: 'f',
      description: 'option to fix style conflicts',
      default: false,
      required: false,
      env: 'GESTALT_FIX',
    }),
  }
  async run(): Promise<void> {
    const { flags } = await this.parse(Styles)
    const loadedApp = await app.load(flags.path)

    await checkStylesService({
      fix: flags.fix,
      app: loadedApp,
    })
  }
}
