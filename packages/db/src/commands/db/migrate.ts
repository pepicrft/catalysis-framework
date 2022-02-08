import {Command} from '@oclif/core';
import path from 'pathe';
import { system } from '@gestaltjs/core/cli';
import { prismaExecutablePath } from 'src/utils/paths';

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
    const { args } = await this.parse(Migrate);
    const directory = path.resolve(args.path);
    const prismaPath = prismaExecutablePath();
    await system.exec(`${prismaPath} migrate dev`, {
      cwd: directory,
      silent: false
    })
  }
}
