import { Command } from '@oclif/core'
import { output } from '@gestaltjs/core/cli'

export default class Test extends Command {
    static description = 'Test your Gestalt application'

    async run(): Promise<void> {
        output.success('Tested')
    }
}
