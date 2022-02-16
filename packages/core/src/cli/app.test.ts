import {expect, test} from 'vitest';
import { load, errors } from './app'
import tempy from 'tempy'
import { path, fs } from "./index"
import toml from "@iarna/toml";

test('Load throws an error - directory does not exist', async () => {
  // When/Then
  const directory = '/invalid-path';
  await expect(load(directory)).rejects.toThrowError(errors.directoryNotFound(directory));
});

test('Load throws an error - config file not found', async () => {
  await tempy.directory.task(async (tempDirectory) => {
    await expect(load(tempDirectory)).rejects.toThrowError(errors.configFileNotFound());
  })

});

test('Load throws an error - config file is invalid', async () => {
  await tempy.directory.task(async (tempDirectory) => {
    // Given
    const invalidConfig = {}
    const configurationPath = path.join(tempDirectory, "gestalt.config.toml")

    const invalidConfigFileContent = toml.stringify(invalidConfig)
    await fs.writeFile(configurationPath, invalidConfigFileContent);

    // Write
    await expect(load(tempDirectory)).rejects.toThrowError(errors.validation());
  })
});
