import { testLogger } from '../logger'
import { Command } from '@gestaltjs/core/cli'

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
    testLogger().success('Tested')
  }
}
