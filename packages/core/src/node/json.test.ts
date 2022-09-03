import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../testing/temporary.js'
import { writeFile } from './fs.js'
import {
  JSONFileNotFoundError,
  JSONFileParseError,
  readJsonFile,
} from './json.js'
import { joinPath } from './path.js'
import parseJson from 'parse-json'

describe('readJsonFile', () => {
  test("throws a JSONFileNotFoundError error if it doesn't exist", async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const jsonPath = joinPath(tmpDir, 'test.json')

      // When/Then
      await expect(async () => {
        await readJsonFile(jsonPath)
      }).rejects.toThrow(JSONFileNotFoundError(jsonPath))
    })
  })

  test('throws a JSONFileParseError error if the JSON is invalid', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const invalidJson = `
{
  "test": {
    "invalid
  }
}
      `
      const jsonPath = joinPath(tmpDir, 'test.json')
      await writeFile(jsonPath, invalidJson)
      let internalError: any | undefined

      try {
        parseJson(invalidJson)
      } catch (error: any) {
        internalError = error
      }

      // When/Then
      await expect(async () => {
        await readJsonFile(jsonPath)
      }).rejects.toThrow(JSONFileParseError(jsonPath, internalError))
    })
  })
})
