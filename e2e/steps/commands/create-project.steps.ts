import { When } from '@cucumber/cucumber'
import { randomString } from '../../lib/random.js'
import { join as joinPath } from 'pathe'
import { CatalysisWorld } from '../../world/catalysis.js'

When(
  'I create a project',
  { timeout: 120 * 1000 },
  async function (this: CatalysisWorld) {
    const projectName = randomString()
    await this.runCreateProject(
      ['--path', this.temporaryDirectory, '--name', projectName],
      {}
    )
    this.projectDirectory = joinPath(this.temporaryDirectory, projectName)
  }
)
