import {Command} from '@oclif/core';

export default class Build extends Command {
  static description = 'Build the project';

  async run(): Promise<void> {
    console.log("Building...")
  }
}
