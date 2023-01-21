import { globalFlags, projectFlags } from '@catalysisdev/core/node/command.js'
import { Command, Flags, Interfaces } from '@catalysisdev/core/node/oclif.js'
import { loadProject } from '@catalysisdev/core/node/project.js'
import {
  GenerateMiddlewareLanguage,
  generateMiddlewareService,
  GENERATE_MIDDLEWARE_LANGUAGES,
} from '../../../../private/node/services/commands/generate/middleware.js'
import { absolutePath } from '@catalysisdev/core/node/path.js'

// eslint-disable-next-line import/no-default-export
export default class Middleware extends Command {
  static description = 'Generates a new middleware'

  static args = [
    { name: 'name', description: 'The name of the target', required: true },
  ]
  static flags = {
    ...globalFlags(),
    ...projectFlags(),
    language: Flags.string({
      name: 'language',
      char: 'l',
      env: 'CATALYSIS_LANGUAGE',
      default: process.cwd(),
      options: GENERATE_MIDDLEWARE_LANGUAGES,
      description: 'The programming language used in the generated middleware',
      required: false,
    }),
  }

  async run(): Promise<void> {
    const { flags, args } = await this.parse(Middleware)
    const project = await loadProject(absolutePath(flags.path))
    await generateMiddlewareService({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      name: args.name,
      language: flags.language,
      project: project,
    })
  }
}
