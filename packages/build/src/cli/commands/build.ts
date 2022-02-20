import { Command } from '@oclif/core'
import logger from '../logger'

export default class Build extends Command {
  static description = 'Build your Gestalt application'

  async run(): Promise<void> {
    logger.success('Built')
  }
}
