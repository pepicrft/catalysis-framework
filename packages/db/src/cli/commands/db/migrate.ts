import { Command } from '@oclif/core'
import logger from '../../logger'

export default class Migrate extends Command {
  static description = 'Build your Gestalt project'

  async run(): Promise<void> {
    logger().success('Migrated')
  }
}
