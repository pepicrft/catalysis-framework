import {Command} from '@oclif/core';
import {output} from "@gestaltjs/core/cli";

export default class Build extends Command {
  static description = 'Build your Gestalt application';

  async run(): Promise<void> {
    output.success("Built")
  }
}
