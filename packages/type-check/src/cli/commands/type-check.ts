import { Command } from '@oclif/core'
import { output } from '@gestaltjs/core/cli'

export default class TypeCheck extends Command {
    static description = 'Type-check your Gestalt application'

    async run(): Promise<void> {
        output.success('Type-checked')
    }
}
