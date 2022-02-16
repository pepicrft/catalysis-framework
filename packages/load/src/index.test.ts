import {expect, test, beforeEach, afterEach, vi} from 'vitest';
import { load } from '.';
import path from 'pathe';
import tmp from "tmp";
import type { DirResult } from "tmp";
import fs from "fs";

let tmpDir: DirResult;
beforeEach(() => {
  tmpDir = tmp.dirSync()
})

afterEach(() => {
  fs.rmSync(tmpDir.name, {recursive: true, force: true});
})

test("load throws an error given that the directory doesn't exist", async () => {
  // Given
  const directory = "/gestalt/invalid"

  // When/Then
  await expect(load(directory)).rejects.toThrowError();
});


test("loads App config file", async () => {
  //Given
  const configContent = `
  module.exports = {
    "name": "asdgas"
  };
  `
  const configPath = path.join(tmpDir.name, "gestalt.config.cjs")
  fs.writeFileSync(configPath, configContent);

  // When
  await expect(load(configPath)).toBeDefined();

  // Then

})

test("function load returns an object containing the property name", async () => {

  //Given
  const directory = tmpDir.name;

  //When/Then

  const spyLoad = vi.fn(load);

  const result = spyLoad(directory);

  await expect(result).toHaveProperty("name");

  //Test failing: AssertionError: expected {} to have deep nested property ''

})
