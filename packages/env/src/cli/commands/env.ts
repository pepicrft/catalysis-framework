import { Command } from '@oclif/core'
import envService from '../services/env'

export default class Env extends Command {
  static description = 'Output environment information'

  async run(): Promise<void> {
    // How to parse flags with OCLIF - gestalt env --json
    await envService()
  }
}
