// eslint-disable-next-line import/no-nodejs-modules
import { Given, After, setDefaultTimeout } from '@cucumber/cucumber'
import tmp from 'tmp'
import rimraf from 'rimraf'
import { join as joinPath } from 'pathe'
import fs from 'fs-extra'

if (process.env.DEBUG === '1') {
  setDefaultTimeout(-1)
}

Given('I have a working directory', function (this: GestaltWorld) {
  this.temporaryDirectory = tmp.dirSync().name
  const dataHomeDirectory = joinPath(this.temporaryDirectory, 'XDG_DATA_HOME')
  const configHomeDirectory = joinPath(
    this.temporaryDirectory,
    'XDG_CONFIG_HOME'
  )
  const stateHomeDirectory = joinPath(this.temporaryDirectory, 'XDG_STATE_HOME')
  const cacheHomeDirectory = joinPath(this.temporaryDirectory, 'XDG_CACHE_HOME')

  this.temporaryEnvironment = {
    XDG_DATA_HOME: dataHomeDirectory,
    XDG_CONFIG_HOME: configHomeDirectory,
    XDG_STATE_HOME: stateHomeDirectory,
    XDG_CACHE_HOME: cacheHomeDirectory,
  }
})

Given(/I have the fixture (.+) in the working directory/, function (fixture) {
  const from = joinPath(__dirname, '../../fixtures', fixture)
  const to = this.temporaryDirectory
  fs.copySync(from, to)
})

After(async function () {
  if (this.temporaryDirectory) {
    rimraf.sync(this.temporaryDirectory)
  }
})
