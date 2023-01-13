import { When } from '@cucumber/cucumber'
import { CatalysisWorld } from '../../world/catalysis.js'

When(
  'I should be able to build the project',
  async function (this: CatalysisWorld) {
    await this.runCatalysis(
      ['build', '--path', this.projectDirectory as string],
      {}
    )
  }
)

When(
  'I should be able to info the project',
  async function (this: CatalysisWorld) {
    await this.runCatalysis(
      ['info', '--path', this.projectDirectory as string],
      {}
    )
  }
)
