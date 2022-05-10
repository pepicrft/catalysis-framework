import { Command } from '@gestaltjs/core/cli'
import { generateLogger } from '../../logger'
import { generateTargetPrompt } from '../../prompts/target'

// eslint-disable-next-line import/no-default-export
export default class Target extends Command {
  static description = 'Generate a new target'

  static args = [
    { name: 'name', description: 'The name of the target', required: true },
  ]
  static flags = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Target)
    const options = await generateTargetPrompt({})
    generateLogger().success('Generated')
  }
}
