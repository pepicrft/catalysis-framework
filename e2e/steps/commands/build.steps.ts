import { When } from '@cucumber/cucumber'
import { GestaltWorld } from '../../world/gestalt.js'

When(
  'I should be able to build the project',
  async function (this: GestaltWorld) {
    await this.runGestalt(
      ['build', '--path', this.projectDirectory as string],
      {}
    )
  }
)

When(
  'I should be able to info the project',
  async function (this: GestaltWorld) {
    await this.runGestalt(
      ['info', '--path', this.projectDirectory as string],
      {}
    )
  }
)
