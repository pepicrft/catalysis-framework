import {Command} from '@oclif/core';

export default class Serve extends Command {
  static description = 'Serve the project';

  async run(): Promise<void> {
    console.log("Linting...")
  }
}
