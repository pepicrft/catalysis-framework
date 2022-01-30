import {Command} from '@oclif/core';

export default class TypeCheck extends Command {
  static description = 'Type-check the code';

  async run(): Promise<void> {
    console.log("Type-checking...")
  }
}
