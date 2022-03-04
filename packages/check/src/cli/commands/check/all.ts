import { Command } from '@oclif/core'
import code from './code'
import styles from './styles'
export default class Check extends Command {
  static description = 'Check code types and style'
  async run(): Promise<void> {
    await code.run()
    await styles.run()
  }
}
