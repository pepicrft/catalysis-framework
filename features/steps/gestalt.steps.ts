import {exec} from 'child_process';

import path from 'pathe';
import {Then} from 'cucumber';

Then(
  /I should be able to run (.+) successfully in the working directory/,
  function (command) {
    const gestaltExecutable = path.join(
      __dirname,
      '../../packages/gestalt/bin/gestalt-dev',
    );
    exec(`${gestaltExecutable} ${command} ${this.temporaryDirectory}`);
  },
);
