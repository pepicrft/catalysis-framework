import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../../internal/node/testing/temporary.js'
import { writeFile } from './fs.js'
import {
  JSONFileDecodeError,
  decodeJSONFile,
  JSONFileNotFoundError,
} from './json.js'
import parseJson from 'parse-json'

describe('decodeJSONFile', () => {
  test('returns the Javascript object when the JSON is valid', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const validJson = '{ "name": "test" }'
      const jsonPath = tmpDir.pathAppendingComponent('test.json')
      await writeFile(jsonPath, validJson)

      // When
      const { name } = await decodeJSONFile(jsonPath)

      // Then
      expect(name).toEqual('test')
    })
  })

  test("throws a JSONFileNotFoundError error if it doesn't exist", async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const jsonPath = tmpDir.pathAppendingComponent('test.json')

      // When/Then
      await expect(async () => {
        await decodeJSONFile(jsonPath)
      }).rejects.toThrow(JSONFileNotFoundError)
    })
  })

  test('throws a JSONFileDecodeError error if the JSON is invalid', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const invalidJson = `
{
  "test": {
    "invalid
  }
}
      `
      const jsonPath = tmpDir.pathAppendingComponent('test.json')
      await writeFile(jsonPath, invalidJson)
      let internalError: any | undefined

      try {
        parseJson(invalidJson)
      } catch (error: any) {
        internalError = error
      }

      // When/Then
      await expect(async () => {
        await decodeJSONFile(jsonPath)
      }).rejects.toThrow(new JSONFileDecodeError(jsonPath, internalError))
    })
  })
})
