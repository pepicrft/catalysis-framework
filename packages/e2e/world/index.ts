import {setWorldConstructor} from 'cucumber';

export interface WorldConstructorParams {
  temporaryDirectory: string;
}

export class World {
  public temporaryDirectory: string;

  constructor({temporaryDirectory}: WorldConstructorParams) {
    this.temporaryDirectory = temporaryDirectory;
  }
}

setWorldConstructor(World);
