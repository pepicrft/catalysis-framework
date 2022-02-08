import {exec} from 'child_process';

import path from 'pathe';
import {Then} from 'cucumber';
import { gestaltDevPath } from '../lib/constants';

Then('I should be able to see the Gestalt help menu', function() {
  const command = `${gestaltDevPath} --help`;
  exec(command);
});

Then(
  /I should be able to run (.+) successfully in the working directory/,
  function (command) {
    const gestaltExecutable = path.join(
      __dirname,
      gestaltDevPath,
    );
    exec(`${gestaltExecutable} ${command} ${this.temporaryDirectory}`);
  },
);
