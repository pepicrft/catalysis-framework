import { Command } from '@oclif/core'
import logger from '../logger'

export default class Env extends Command {
  static description = 'Output environment information'

  async run(): Promise<void> {
    logger().success('Env')
  }
}
