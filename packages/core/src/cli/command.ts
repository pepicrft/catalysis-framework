import { Command, Flags, Interfaces } from '@oclif/core'
import { resolve as pathResolve } from './path'

// eslint-disable-next-line import/no-default-export
export default abstract class extends Command {
  static globalFlags: Interfaces.FlagInput<any> = {
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
  }

  static projectFlags: Interfaces.FlagInput<any> = {
    path: Flags.string({
      name: 'path',
      char: 'p',
      env: 'GESTALT_PATH',
      default: process.cwd(),
      parse: async (input) => pathResolve(input),
      description: 'The path to the directory from where the command will run.',
      required: false,
    }),
  }
}
