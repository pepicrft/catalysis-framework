import { describe, test, expect } from 'vitest'
import { decodeJSON, encodeJSON, DecodeJSONError } from './json.js'
import parseJson from 'parse-json'
import { Abort } from '../common/error.js'

describe('decodeJSON', () => {
  test('returns the object when the JSON is valid', () => {
    // Given
    const validJson = `{ "name": "test" }`

    // When
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name } = decodeJSON(validJson)

    // Then
    expect(name).toEqual('test')
  })

  test('throws an abort error if the JSON is invalid', () => {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      internalError = error
    }

    // When/Then
    expect(() => {
      decodeJSON(invalidJson)
    }).toThrow(DecodeJSONError)
  })
})

describe('encodeJSON', () => {
  test('returns the JSON string representation given an object', () => {
    // Given
    const object = { name: 'test' }

    // When
    const got = encodeJSON(object)

    // Then
    expect(got).toMatchInlineSnapshot('"{\\"name\\":\\"test\\"}"')
  })
})
