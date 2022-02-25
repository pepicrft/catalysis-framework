import { Abort } from './error';
import { exec } from './system';
import {findUp, dirname} from './path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function run(args: string[], cwd?: string) {
  const tscPath = await findUp('node_modules/.bin/tsc', {cwd: __dirname});
  if (!tscPath) {
    throw new Abort('Could not locate typescript compiler', '')
  }

  await exec(tscPath, args, {stdio: 'inherit', cwd})
}
