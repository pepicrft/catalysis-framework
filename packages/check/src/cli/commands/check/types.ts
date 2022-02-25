import { Command, Flags } from '@oclif/core'
import logger from '../../logger'
import { tsc, app} from '@gestaltjs/core/cli'

export default class Types extends Command {
  static description = 'Check types using Typescript'

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

    const { flags } = await this.parse(Types)
    const loadedApp = await app.load(flags.path)

    await tsc.run(["--noEmit"], loadedApp.directory)
    logger().success('Types checked')
  }
}
