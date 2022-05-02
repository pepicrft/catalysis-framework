import { setWorldConstructor } from '@cucumber/cucumber'

export interface WorldConstructorParams {
  temporaryDirectory: string
}

export class World {
  public temporaryDirectory: string
  public temporaryEnvironment: any | undefined
  public projectDirectory: string | undefined

  constructor({ temporaryDirectory }: WorldConstructorParams) {
    this.temporaryDirectory = temporaryDirectory
  }
}

setWorldConstructor(World)
