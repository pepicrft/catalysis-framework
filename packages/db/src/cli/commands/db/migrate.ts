import { Command } from '@oclif/core'
import logger from '../../logger'

export default class Migrate extends Command {
  static description = 'Build your Gestalt application'

  async run(): Promise<void> {
    logger.success('Migrated')
  }
}
