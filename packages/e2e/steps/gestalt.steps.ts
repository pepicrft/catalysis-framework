import { Then, When } from 'cucumber'
import { exec } from '../lib/system'
import { createAppDevPath } from '../lib/constants'

Then('I should be able to see the Gestalt help menu', function () {
  // const command = `${gestaltDevPath} --help`;
  // exec(command);
})

When(/I create an app named (.+) in the working directory/, function (name) {
  exec(`${createAppDevPath} --name=${name} --path=${this.temporaryDirectory}`)
})

Then(/I should be able to (.+) the (.+) app/, function (command, name) {
  exec(`cd ${this.temporaryDirectory}/${name} && pnpm ${command} `)
})
