import {execSync} from 'child_process';

import {Command} from '@oclif/core';
import path from 'pathe';

export default class Migrate extends Command {
  static description = 'Migrate the data in your database';

  static examples = [
    `$ oex db migrate --help
`,
  ];

  static flags = {};

  static args = [
    {
      name: 'path',
      description: 'The directory that contains the app',
      required: true,
    },
  ];

  async run(): Promise<void> {
    const {args} = await this.parse(Migrate);
    const directory = path.resolve(args.path);
    execSync('prisma migrate dev', {stdio: 'inherit', cwd: directory});
  }
}
