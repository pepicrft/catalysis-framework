import { Command } from '@oclif/core'
import { path } from '@gestaltjs/core/cli'

export default class Init extends Command {
  static description = 'Create a Gestalt project'

  async run(): Promise<void> {
    const directory = await path.findUp('node_modules', {
      type: 'directory',
    })
    this.log(`Creating app at path ${directory}`)
  }
}
