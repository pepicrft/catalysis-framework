import { Command, Flags } from '@oclif/core'
import { resolvePath } from '../node/path'

// eslint-disable-next-line import/no-default-export
export default abstract class extends Command {
  static globalFlags = {
    verbose: Flags.boolean({
      name: 'verbose',
      char: 'v',
      env: 'GESTALT_VERBOSE',
      description:
        'Output additional information that might be useful for debugging.',
      required: false,
    }),
    json: Flags.boolean({
      name: 'json',
      char: 'j',
      env: 'GESTALT_JSON',
      description: 'Outputs the command result encoded as a JSON.',
      required: false,
    }),
    env: Flags.string({
      name: 'env',
      char: 'e',
      options: ['development', 'production', 'test'],
      env: 'GESTALT_ENV',
      default: 'development',
      description: 'The environment used with the project.',
      required: false,
    }),
  }

  static projectFlags = {
    path: Flags.string({
      name: 'path',
      char: 'p',
      env: 'GESTALT_PATH',
      default: process.cwd(),
      parse: async (input) => resolvePath(input),
      description: 'The path to the directory from where the command will run.',
      required: false,
    }),
  }
}
