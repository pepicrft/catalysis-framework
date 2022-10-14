import { globalFlags, projectFlags } from '@gestaltjs/core/node/command'
import { Flags, Command } from '@oclif/core'
import { loadProject } from '@gestaltjs/core/node/project'
import {
  GenerateMiddlewareLanguage,
  generateMiddlewareService,
  GENERATE_MIDDLEWARE_LANGUAGES,
} from '../../../../private/node/services/commands/generate/middleware.js'
import { absolutePath } from '@gestaltjs/core/node/path'

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
      env: 'GESTALT_LANGUAGE',
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
      name: args.name,
      language: flags.language as GenerateMiddlewareLanguage,
      project: project,
    })
  }
}
