import { execSync } from 'child_process'
import gestaltPackage from '../../../gestaltjs/package.json'
import { Command, Flags } from '@oclif/core'
import { path } from '@gestaltjs/core/cli'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class Init extends Command {
  static description = 'Create a Gestalt project'
  static flags = {
    path: Flags.string({
      char: 'p',
      description: 'project path',
    }),
  }
  static args = [
    {
      name: 'name',
      required: true,
      description: 'app name',
    },
  ]
  async run(): Promise<void> {
    const { args, flags } = await this.parse(Init)
    const projectPath = flags.path ? path.resolve(flags.path) : process.cwd()
    const plopfilePath = path.resolve(__dirname)
    this.log(`Creating ${args.name} app at path ${projectPath}`)
    execSync(
      `cd ${plopfilePath} && plop -- --name ${args.name} --path ${projectPath} --version ${gestaltPackage.version}`
    )
  }
}
