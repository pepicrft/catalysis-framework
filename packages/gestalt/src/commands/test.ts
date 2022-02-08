import {execSync} from 'child_process';

import path from 'pathe';
import {Command} from '@oclif/core';

export default class Test extends Command {
  static description = 'Execute the tests within your application';

  static flags = {};

  static args = [
    {
      name: 'path',
      description: 'The directory that contains the app',
      required: true,
    },
  ];

  async run(): Promise<void> {
    const {args} = await this.parse(Test);
    const files = path.join(args.path, '**/*.test.ts');
    const vitestExecutable = path.join(
      __dirname,
      '../../../../node_modules/.bin/vitest',
    );
    const command = `${vitestExecutable} run ${files}`;
    execSync(command, {stdio: 'inherit', cwd: args.path});
  }
}
