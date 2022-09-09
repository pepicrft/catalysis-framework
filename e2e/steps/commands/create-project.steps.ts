import { When } from '@cucumber/cucumber'
import { randomString } from '../../lib/random.js'
import { join as joinPath } from 'pathe'

When(
  'I create a project',
  { timeout: 30 * 1000 },
  async function (this: GestaltWorld) {
    const projectName = randomString()
    await this.runCreateProject([
      '--path',
      this.temporaryDirectory,
      '--name',
      projectName,
    ])
    this.projectDirectory = joinPath(this.temporaryDirectory, projectName)
  }
)
