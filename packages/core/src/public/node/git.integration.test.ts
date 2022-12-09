import { describe, expect, test } from 'vitest'
import { isGitAvailable } from './git.js'

describe('isGitAvailable', () => {
  /**
   * Since the project is part of a Git repository it's safe to assume
   * that Git is present from this integration test.
   */
  test('returns true', async () => {
    await expect(isGitAvailable()).resolves.toEqual(true)
  })
})
