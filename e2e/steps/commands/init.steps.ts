import { When } from '@cucumber/cucumber'
import { randomString } from '../../lib/random.js'

When('I create a project', async function (this: GestaltWorld) {
  await this.runCreateProject([
    '--path',
    this.temporaryDirectory,
    '--name',
    randomString(),
  ])
})
