import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../testing/temporary.js'
import { writeFile } from './fs.js'
import {
  JSONFileNotFoundError,
  JSONFileParseError,
  JSONParseError,
  parseJsonFile,
  parseJson,
} from './json.js'
import { joinPath } from './path.js'
import externalParseJson from 'parse-json'

describe('parseJsonFile', () => {
  test('returns the Javascript object when the JSON is valid', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const validJson = '{ "name": "test" }'
      const jsonPath = joinPath(tmpDir, 'test.json')
      await writeFile(jsonPath, validJson)

      // When
      const { name } = await parseJsonFile(jsonPath)

      // Then
      expect(name).toEqual('test')
    })
  })

  test("throws a JSONFileNotFoundError error if it doesn't exist", async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const jsonPath = joinPath(tmpDir, 'test.json')

      // When/Then
      await expect(async () => {
        await parseJsonFile(jsonPath)
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
        externalParseJson(invalidJson)
      } catch (error: any) {
        internalError = error
      }

      // When/Then
      await expect(async () => {
        await parseJsonFile(jsonPath)
      }).rejects.toThrow(JSONFileParseError(jsonPath, internalError))
    })
  })
})

describe('parseJson', () => {
  test('returns the object when the JSON is valid', async () => {
    // Given
    const validJson = `{ "name": "test" }`

    // When
    const { name } = await parseJson(validJson)

    // Then
    expect(name).toEqual('test')
  })

  test('throws a JSONParseError error if the JSON is invalid', async () => {
    // Given
    const invalidJson = `
    {
      "test": {
        "invalid
      }
    }
          `
    let internalError: any | undefined

    try {
      externalParseJson(invalidJson)
    } catch (error: any) {
      internalError = error
    }

    // When/Then
    await expect(async () => {
      await parseJson(invalidJson)
    }).rejects.toThrow(JSONParseError(internalError))
  })
})
