import { setContext, _useContext } from './context.js'
import { describe, test, expect } from 'vitest'
import { decodeJSON, encodeJSON } from './json.js'

describe('setContext', () => {
  test('serializes the context as a JSON and sets it to the env', () => {
    // Given
    const env: { CATALYSIS_INTERNAL_CONTEXT?: string } = {}

    // When
    setContext({ environment: 'production' }, env)

    // Then
    expect(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      decodeJSON(env.CATALYSIS_INTERNAL_CONTEXT as string).environment
    ).toEqual('production')
  })
})

describe('useContext', () => {
  test('returns the context if it exists', () => {
    // Given
    const env: { CATALYSIS_INTERNAL_CONTEXT?: string } = {
      CATALYSIS_INTERNAL_CONTEXT: encodeJSON({ environment: 'production' }),
    }

    // When
    const got = _useContext(env)

    // Then
    expect(got.environment).toEqual('production')
  })

  test('returns a default context if it has not been set', () => {
    // Given
    const env = {}

    // When
    const got = _useContext(env)

    // Then
    expect(got.environment).toEqual('development')
  })
})
