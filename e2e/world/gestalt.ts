import { setWorldConstructor } from '@cucumber/cucumber'
import {
  createProjectExecutablePath,
  gestaltExecutablePath,
} from '../lib/constants.js'
import { exec } from '../lib/system.js'

export interface WorldConstructorParams {
  temporaryDirectory: string
}

type RunOptions = { cwd?: string; env?: NodeJS.ProcessEnv }

export class GestaltWorldImpl implements GestaltWorld {
  public temporaryDirectory: string
  public temporaryEnvironment: any | undefined
  public projectDirectory: string | undefined

  constructor({ temporaryDirectory }: WorldConstructorParams) {
    this.temporaryDirectory = temporaryDirectory
  }

  async runGestalt(args: string[], options: RunOptions = {}) {
    await exec(gestaltExecutablePath, args, options)
  }
  async runCreateProject(args: string[], options: RunOptions = {}) {
    await exec(createProjectExecutablePath, args, options)
  }
}

setWorldConstructor(GestaltWorldImpl)
