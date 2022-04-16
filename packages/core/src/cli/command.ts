import { Command, Flags, Interfaces } from '@oclif/core'

export default abstract class extends Command {
  static flags: Interfaces.FlagInput<any> = {
    verbose: Flags.boolean({
      name: 'verbose',
      char: 'v',
      description:
        'Output additional information that might be useful for debugging.',
      required: false,
    }),
  }
}
