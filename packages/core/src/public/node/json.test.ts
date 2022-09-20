import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../testing/temporary.js'
import { writeFile } from './fs.js'
import {
  JSONFileNotFoundError,
  JSONFileDecodeError,
  JSONDecodeError,
  decodeJsonFile,
  decodeJson,
  encodeJson,
} from './json.js'
import { joinPath } from './path.js'
import parseJson from 'parse-json'

describe('decodeJsonFile', () => {
  test('returns the Javascript object when the JSON is valid', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const validJson = '{ "name": "test" }'
      const jsonPath = joinPath(tmpDir, 'test.json')
      await writeFile(jsonPath, validJson)

      // When
      const { name } = await decodeJsonFile(jsonPath)

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
        await decodeJsonFile(jsonPath)
      }).rejects.toThrow(JSONFileNotFoundError(jsonPath))
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
        await decodeJsonFile(jsonPath)
      }).rejects.toThrow(JSONFileDecodeError(jsonPath, internalError))
    })
  })
})

describe('decodeJson', () => {
  test('returns the object when the JSON is valid', () => {
    // Given
    const validJson = `{ "name": "test" }`

    // When
    const { name } = decodeJson(validJson)

    // Then
    expect(name).toEqual('test')
  })

  test('throws a JSONDecodeError error if the JSON is invalid', () => {
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
      parseJson(invalidJson)
    } catch (error: any) {
      internalError = error
    }

    // When/Then
    expect(() => {
      decodeJson(invalidJson)
    }).toThrow(JSONDecodeError(internalError))
  })
})

describe('encodeJson', () => {
  test('returns the JSON string representation given an object', () => {
    // Given
    const object = { name: 'test' }

    // When
    const got = encodeJson(object)

    // Then
    expect(got).toMatchInlineSnapshot('"{\\"name\\":\\"test\\"}"')
  })
})
