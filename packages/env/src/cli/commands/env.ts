import { Command } from '@oclif/core'
import { output } from '@gestaltjs/core/cli'
import { environment, terminal } from '@gestaltjs/core/cli'

export default class Env extends Command {
  static description =
    'Outputs environment information for troubleshooting issues'

  async run(): Promise<void> {
    const got = await environment.info()
    const binaries = got.Binaries
    if (binaries) {
      output.message(terminal.formatCyan(terminal.formatBold('Binaries')))
      if (binaries.Node) {
        output.message(
          `  Node (${binaries.Node.version}): ${terminal.formatGray(
            binaries.Node.path
          )}`
        )
      }
      if (binaries.Yarn) {
        output.message(
          `  Yarn (${binaries.Yarn.version}): ${terminal.formatGray(
            binaries.Yarn.path
          )}`
        )
      }
      if (binaries.npm) {
        output.message(
          `  npm (${binaries.npm.version}): ${terminal.formatGray(
            binaries.npm.path
          )}`
        )
      }
    }
  }
}
