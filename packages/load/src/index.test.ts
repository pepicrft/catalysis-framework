import {assert, describe, expect, it, test, beforeEach, afterEach} from 'vitest';
import { load } from '.';
import path from 'pathe'
import tmp, { tmpdir } from "tmp";
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
    name: "asdgas"
  };
  `
  const configPath = path.join(tmpDir.name, "gestalt.config.cjs")
  fs.writeFileSync(configPath, configContent);

  // When
  await load(tmpDir.name)

  // Then

})
