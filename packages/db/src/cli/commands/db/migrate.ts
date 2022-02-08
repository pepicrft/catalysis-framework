import {Command} from '@oclif/core';
import {output} from "@gestaltjs/core/cli";

export default class Migrate extends Command {
  static description = 'Build your Gestalt application';

  async run(): Promise<void> {
    output.success("Migrated")
  }
}
