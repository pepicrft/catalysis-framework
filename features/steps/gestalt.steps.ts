import { Then } from 'cucumber';

import { exec } from '../lib/system';
import { gestaltDevPath } from '../lib/constants';

Then('I should be able to see the Gestalt help menu', function() {
  const command = `${gestaltDevPath} --help`;
  exec(command);
});
