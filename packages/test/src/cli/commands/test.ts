import { Command } from '@oclif/core'
import logger from '../logger'

export default class Test extends Command {
  static description = 'Test your Gestalt project'

  async run(): Promise<void> {
    logger().success('Tested')
  }
}
