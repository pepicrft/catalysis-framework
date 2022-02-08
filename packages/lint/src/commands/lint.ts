import {Command} from '@oclif/core';

export default class Lint extends Command {
  static description = 'Lint the project';

  async run(): Promise<void> {
    console.log("Linting...")
  }
}
