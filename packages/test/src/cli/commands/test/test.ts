import { testLogger } from '../../logger'
import { Command, loader } from '@gestaltjs/core/cli'
import { configureTests } from '../../services/test'

// eslint-disable-next-line import/no-default-export
export default class Test extends Command {
  static description = 'Test your Gestalt project'

  static flags = {
    ...Command.globalFlags,
    ...Command.projectFlags,
  }

  async run(): Promise<void> {
    // gestalt gest --path catalysis
    // how to use xxxx programmatically

    // import {expect} from "gestat"

    // vitest
    /**
     * normal usage project/
     *   vitest.config.js / vite.config.js
     *
     * gestalt project/
     *   No vitest.config.js
     */
    /**
     * SERVICE
     *
     * import {vitest} from "vitest"
     *
     * vitest.run({ directory: project.directory, ...config})
     *
     */
    const { flags } = await this.parse(Test)
    const { project } = await loader.load(flags.path)
    await configureTests(project.directory)
    testLogger().success('Tested')
  }
}
