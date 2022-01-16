import {Given, After} from '@cucumber/cucumber';
import tmp from 'tmp';
import rimraf from 'rimraf';

Given('I have a working directory', function () {
  this.temporaryDirectory = tmp.dirSync().name;
});

After(async function () {
  rimraf.sync(this.temporaryDirectory);
});
