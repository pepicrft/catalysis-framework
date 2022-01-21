import shell from 'shelljs';
import type {ExecOptions} from 'shelljs';

import {isDebug} from './environment';

export const execSync = (command: string, options: ExecOptions) => {
  shell.exec(command, {silent: !isDebug});
};
