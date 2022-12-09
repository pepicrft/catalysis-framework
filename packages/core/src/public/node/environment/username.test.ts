import { describe, expect, test } from 'vitest'
import { getUsername } from './username.js'

describe('getUsername', () => {
  test('returns a non-empty user', () => {
    // Given/When
    const got = getUsername()

    // Then
    expect(got).not.toEqual('')
  })
})
