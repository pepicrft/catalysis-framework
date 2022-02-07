import {Command} from '@oclif/core';

export default class Migrate extends Command {
  static description = 'Migrate the database';

  async run(): Promise<void> {
    console.log("Migrating...")
  }
}
