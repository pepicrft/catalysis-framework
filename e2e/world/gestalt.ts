import { setWorldConstructor } from '@cucumber/cucumber'
import {
  createProjectExecutablePath,
  gestaltExecutablePath,
} from '../lib/constants.js'
import { exec } from '../lib/system.js'

export interface WorldConstructorParams {
  temporaryDirectory: string
}

export type RunOptions = { cwd?: string; env?: NodeJS.ProcessEnv }

export interface GestaltWorld {
  temporaryDirectory: string
  temporaryEnvironment: any | undefined
  projectDirectory: string | undefined

  runGestalt(args: string[], options: RunOptions): Promise<void>
  runCreateProject(args: string[], options: RunOptions): Promise<void>
}

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
