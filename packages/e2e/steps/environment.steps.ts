import { execSync } from 'child_process'

import { Given, After, Then } from 'cucumber'
import tmp from 'tmp'
import rimraf from 'rimraf'
import path from 'pathe'
import fs from 'fs-extra'

Given('I have a working directory', function () {
  this.temporaryDirectory = tmp.dirSync().name
})

Given(/I have the fixture (.+) in the working directory/, function (fixture) {
  const from = path.join(__dirname, '../../fixtures', fixture)
  const to = this.temporaryDirectory
  fs.copySync(from, to)
})

Then('I install the fixture dependencies', function () {
  execSync('pnpm install', { stdio: 'inherit', cwd: this.temporaryDirectory })
})

After(async function () {
  if (this.temporaryDirectory) {
    rimraf.sync(this.temporaryDirectory)
  }
})
