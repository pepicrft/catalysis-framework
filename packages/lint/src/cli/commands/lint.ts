import { Command } from '@oclif/core'
import logger from '../logger'

export default class Lint extends Command {
  static description = 'Lint your Gestalt application'

  async run(): Promise<void> {
    logger.success('Linted')
  }
}
