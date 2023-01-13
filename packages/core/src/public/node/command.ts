import { Flags } from '@oclif/core'
import { resolvePath } from './path.js'

export function globalFlags() {
  return {
    verbose: Flags.boolean({
      name: 'verbose',
      char: 'v',
      env: 'CATALYSIS_VERBOSE',
      description:
        'Output additional information that might be useful for debugging.',
      required: false,
    }),
    json: Flags.boolean({
      name: 'json',
      char: 'j',
      env: 'CATALYSIS_JSON',
      description: 'Outputs the command result encoded as a JSON.',
      required: false,
    }),
    env: Flags.string({
      name: 'env',
      char: 'e',
      options: ['development', 'production', 'test'],
      env: 'CATALYSIS_ENV',
      default: 'development',
      description: 'The environment used with the project.',
      required: false,
    }),
  }
}

export function projectFlags() {
  return {
    path: Flags.string({
      name: 'path',
      char: 'p',
      env: 'CATALYSIS_PATH',
      default: process.cwd(),
      // eslint-disable-next-line @typescript-eslint/require-await
      parse: async (input) => resolvePath(input),
      description: 'The path to the directory from where the command will run.',
      required: false,
    }),
  }
}
