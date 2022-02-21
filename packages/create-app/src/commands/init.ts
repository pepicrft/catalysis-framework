import { execSync } from 'child_process'
import gestaltPackage from '../../../gestalt/package.json'

import { Command, Flags } from '@oclif/core'
import { path } from '@gestaltjs/core/cli'
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
    const plopfilePath = path.resolve('') // absolute path to dist?
    this.log(`Creating ${args.name} app at path ${projectPath}`)
    execSync(
      `cd ${plopfilePath} && plop -- --name ${args.name} --path ${projectPath} --version ${gestaltPackage.version}`
    )
  }
}
