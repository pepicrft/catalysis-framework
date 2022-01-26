import {Command} from '@oclif/core';

export default class Db extends Command {
  static description = 'Manage your database';

  static examples = [
    `$ oex db --help
`,
  ];

  static flags = {};

  static args = [];

  async run(): Promise<void> {
    console.log('Working in your database...');
  }
}
