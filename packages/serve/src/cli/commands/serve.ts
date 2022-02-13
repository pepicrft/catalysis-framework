import { Command } from '@oclif/core'
import { output } from '@gestaltjs/core/cli'

export default class Serve extends Command {
    static description = 'Serve your Gestalt application'

    async run(): Promise<void> {
        output.success('Served')
    }
}
