import { Command } from '@oclif/core'
import logger from '../logger'

export default class Serve extends Command {
  static description = 'Serve your Gestalt application'

  async run(): Promise<void> {
    logger().success('Served')
  }
}

