import { setWorldConstructor } from '@cucumber/cucumber'
import {
  createProjectExecutablePath,
  catalysisExecutablePath,
} from '../lib/constants.js'
import { exec } from '../lib/system.js'

export interface WorldConstructorParams {
  temporaryDirectory: string
}

export type RunOptions = { cwd?: string; env?: NodeJS.ProcessEnv }

export interface CatalysisWorld {
  temporaryDirectory: string
  temporaryEnvironment: any | undefined
  projectDirectory: string | undefined

  runCatalysis(args: string[], options: RunOptions): Promise<void>
  runCreateProject(args: string[], options: RunOptions): Promise<void>
}

export class CatalysisWorldImpl implements CatalysisWorld {
  public temporaryDirectory: string
  public temporaryEnvironment: any | undefined
  public projectDirectory: string | undefined

  constructor({ temporaryDirectory }: WorldConstructorParams) {
    this.temporaryDirectory = temporaryDirectory
  }

  async runCatalysis(args: string[], options: RunOptions = {}) {
    await exec(catalysisExecutablePath, args, options)
  }
  async runCreateProject(args: string[], options: RunOptions = {}) {
    await exec(createProjectExecutablePath, args, options)
  }
}

setWorldConstructor(CatalysisWorldImpl)
