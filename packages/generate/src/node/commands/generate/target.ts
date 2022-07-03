import { generateLogger } from '../../logger.js'
import { generateTargetPrompt } from '../../prompts/target.js'
import { GestaltCommand } from '@gestaltjs/core/node/command'
import { Flags } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Target extends GestaltCommand {
  static description = 'Generate a new target'

  static args = [
    { name: 'name', description: 'The name of the target', required: true },
  ]
  static flags = {
    ...GestaltCommand.globalFlags,
    ...GestaltCommand.projectFlags,
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Target)
    const options = await generateTargetPrompt({})
    generateLogger().success('Generated')
  }
}
