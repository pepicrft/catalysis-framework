import {Command} from '@oclif/core';
import {output} from "@gestaltjs/core/cli";

export default class Lint extends Command {
  static description = 'Lint your Gestalt application';

  async run(): Promise<void> {
    output.success("Linted")
  }
}
