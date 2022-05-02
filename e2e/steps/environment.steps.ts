// eslint-disable-next-line import/no-nodejs-modules
import { Given, After, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber'
import tmp from 'tmp'
import rimraf from 'rimraf'
import path from 'pathe'
import fs from 'fs-extra'
import { exec } from '../lib/system'
import { rootDirectory } from '../lib/constants'

if (process.env.DEBUG === '1') {
  setDefaultTimeout(-1)
}

Given('I have a working directory', function () {
  this.temporaryDirectory = tmp.dirSync().name
  const dataHomeDirectory = path.join(this.temporaryDirectory, 'XDG_DATA_HOME')
  const configHomeDirectory = path.join(
    this.temporaryDirectory,
    'XDG_CONFIG_HOME'
  )
  const stateHomeDirectory = path.join(
    this.temporaryDirectory,
    'XDG_STATE_HOME'
  )
  const cacheHomeDirectory = path.join(
    this.temporaryDirectory,
    'XDG_CACHE_HOME'
  )

  this.temporaryEnv = {
    XDG_DATA_HOME: dataHomeDirectory,
    XDG_CONFIG_HOME: configHomeDirectory,
    XDG_STATE_HOME: stateHomeDirectory,
    XDG_CACHE_HOME: cacheHomeDirectory,
  }
})

Given(/I have the fixture (.+) in the working directory/, function (fixture) {
  const from = path.join(__dirname, '../../fixtures', fixture)
  const to = this.temporaryDirectory
  fs.copySync(from, to)
})

/**
 * Before running the acceptance tests, we
 */
BeforeAll({ timeout: 2 * 60 * 1000 }, async function () {
  // eslint-disable-next-line no-console
  console.log('Building CLIs before running tests...')
  await exec('pnpm', ['build'], { cwd: rootDirectory })
})

After(async function () {
  if (this.temporaryDirectory) {
    rimraf.sync(this.temporaryDirectory)
  }
})
