import { Command } from '@oclif/core'
import { output } from '@gestaltjs/core/cli'

export default class Check extends Command {
  static description = 'Check your Gestalt application'

  async run(): Promise<void> {
    output.success('checked')
  }
}
