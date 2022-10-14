import { globalFlags } from '@gestaltjs/core/node/command'
import { Command, Flags } from '@oclif/core'
import { absolutePath, resolvePath } from '@gestaltjs/core/node/path'
import { initPrompt } from '../../../private/node/prompts/init.js'
import { initService } from '../../../private/node/services/init.js'
import { createProjectLogger } from '../../../private/node/logger.js'
import { content } from '@gestaltjs/core/node/logger'

// eslint-disable-next-line import/no-default-export
export default class Init extends Command {
  static description = 'Create a Gestalt project'

  static flags = {
    ...globalFlags(),
    local: Flags.boolean({
      name: 'local',
      char: 'l',
      env: 'GESTALT_LOCAL',
      description:
        'Intended for development to point to the local CLI repository',
      required: false,
      default: false,
    }),
    name: Flags.string({
      name: 'name',
      char: 'n',
      env: 'GESTALT_NAME',
      description: 'The name of the project',
      required: false,
    }),
    path: Flags.string({
      name: 'path',
      char: 'p',
      env: 'GESTALT_PATH',
      default: process.cwd(),
      parse: async (input) => resolvePath(input),
      description:
        "The path to the directory that where the project's directory will be created",
      required: false,
    }),
    'package-manager': Flags.string({
      name: 'package-manager',
      char: 'd',
      env: 'GESTALT_PACKAGE_MANAGER',
      description:
        'The package manager to use. It defaults to the one used to run create-x and fallbacks to npm.',
      options: ['npm', 'yarn', 'pnpm'],
      required: false,
    }),
  }

  async run(): Promise<void> {
    createProjectLogger().info(
      content`Creating a new Gestalt project...\n`,
      {},
      { sameProcess: true }
    )

    const { flags } = await this.parse(Init)

    const options = { ...flags, ...(await initPrompt(flags)) }
    await initService({
      ...options,
      directory: absolutePath(options.path),
    })
  }
}
