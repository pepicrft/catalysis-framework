import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../../internal/node/testing/temporary.js'
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
      const jsonPath = tmpDir.appending('test.json')
      await writeFile(jsonPath.pathString, validJson)

      // When
      const { name } = await decodeJsonFile(jsonPath.pathString)

      // Then
      expect(name).toEqual('test')
    })
  })

  test("throws a JSONFileNotFoundError error if it doesn't exist", async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const jsonPath = tmpDir.appending('test.json')

      // When/Then
      await expect(async () => {
        await decodeJsonFile(jsonPath.pathString)
      }).rejects.toThrow(JSONFileNotFoundError(jsonPath.pathString))
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
      const jsonPath = tmpDir.appending('test.json')
      await writeFile(jsonPath.pathString, invalidJson)
      let internalError: any | undefined

      try {
        parseJson(invalidJson)
      } catch (error: any) {
        internalError = error
      }

      // When/Then
      await expect(async () => {
        await decodeJsonFile(jsonPath.pathString)
      }).rejects.toThrow(
        JSONFileDecodeError(jsonPath.pathString, internalError)
      )
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
