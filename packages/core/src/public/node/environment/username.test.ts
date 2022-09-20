import { describe, expect, test } from 'vitest'
import { getUsername } from './username.js'

describe('getUsername', () => {
  test('returns a non-empty user', async () => {
    // Given/When
    const got = getUsername()

    // Then
    expect(got).not.toEqual('')
  })
})
