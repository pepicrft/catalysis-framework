import { describe, expect, test } from 'vitest'
import { getVersionForGeneratedProject } from './versions.js'

describe('getVersionForGeneratedProject', () => {
  test('It returns a non-empty version string', async () => {
    // When
    const got = await getVersionForGeneratedProject()

    // Then
    expect(got).not.toBe('')
  })
})
