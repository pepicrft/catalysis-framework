import { Command, Flags } from '@oclif/core'
import serve from '../utilities/serve'

export default class Serve extends Command {
  static description = 'Serve your Gestalt application'

  static flags = {
    path: Flags.string({
      char: 'p',
      description: 'Directory from where to serve the app',
      env: 'PATH',
      default: process.cwd(),
      required: false,
    }),
  }

  async run(): Promise<void> {
    // gestalt serve --path ~/my-app --port 3000
    // find the app by traversing the directory structure up.
    // NPM package: find-up
    //.  await fs.findUp("gestalt.toml");
    /**
     * app/
     *   gestalt.toml
     *.  package.json
     *.  src/
     *.     routes/
     *.         home/
     *.            <------ gestalt serve
     *
     */
    const { flags } = await this.parse(Serve)
    const loadedApp = await app.load(flags.path)
    await serve(loadedApp)
  }
}
