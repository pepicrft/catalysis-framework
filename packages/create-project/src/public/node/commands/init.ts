import { globalFlags } from '@catalysisdev/core/node/command.js'
import { Command, Flags, Interfaces } from '@catalysisdev/core/node/oclif.js'
import { absolutePath, resolvePath } from '@catalysisdev/core/node/path.js'
import { initPrompt } from '../../../private/node/prompts/init.js'
import { initService } from '../../../private/node/services/init.js'

// eslint-disable-next-line import/no-default-export
export default class Init extends Command {
  static description = 'Create a Catalysis project'

  static flags = {
    ...globalFlags(),
    local: Flags.boolean({
      name: 'local',
      char: 'l',
      env: 'CATALYSIS_LOCAL',
      description:
        'Intended for development to point to the local CLI repository',
      required: false,
      default: false,
    }),
    name: Flags.string({
      name: 'name',
      char: 'n',
      env: 'CATALYSIS_NAME',
      description: 'The name of the project',
      required: false,
    }),
    path: Flags.string({
      name: 'path',
      char: 'p',
      env: 'CATALYSIS_PATH',
      default: process.cwd(),
      // eslint-disable-next-line @typescript-eslint/require-await
      parse: async (input) => resolvePath(input),
      description:
        "The path to the directory that where the project's directory will be created",
      required: false,
    }),
    'package-manager': Flags.string({
      name: 'package-manager',
      char: 'd',
      env: 'CATALYSIS_PACKAGE_MANAGER',
      description:
        'The package manager to use. It defaults to the one used to run create-x and fallbacks to npm.',
      options: ['npm', 'yarn', 'pnpm'],
      required: false,
    }),
  }

  async run(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Creating a new Catalysis project...')

    const { flags } = await this.parse(Init)

    const options = { ...flags, ...(await initPrompt(flags)) }
    await initService({
      ...options,
      directory: absolutePath(options.path),
    })
  }
}
