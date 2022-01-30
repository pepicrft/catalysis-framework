import {Command} from '@oclif/core';

export default class Test extends Command {
  static description = 'Run the tests';

  async run(): Promise<void> {
    console.log("Testing...")
  }
}
