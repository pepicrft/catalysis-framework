import { describe, expect, test } from 'vitest'
import { getLocalPackagesOverrides } from './packages.js'

describe('getLocalPackagesOverrides', () => {
  test('returns a non-empty list of overrides', async () => {
    // Given
    const got = await getLocalPackagesOverrides()

    // Then
    expect(got).not.toEqual({})
  })
})
