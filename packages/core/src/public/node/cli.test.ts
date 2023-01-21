import { isRunningInVerbose } from './cli.js'
import { test, expect, describe } from 'vitest'

describe('isRunningInVerbose', () => {
  test('returns true when --verbose is passed', () => {
    // Given
    const argv = ['catalysis', 'build', '--verbose']

    // When
    const got = isRunningInVerbose(argv)

    // Then
    expect(got).toBe(true)
  })

  test('returns true when -v is passed', () => {
    // Given
    const argv = ['catalysis', 'build', '-v']

    // When
    const got = isRunningInVerbose(argv)

    // Then
    expect(got).toBe(true)
  })

  test('returns false when neither -v nor --verbose are set', () => {
    // Given
    const argv = ['catalysis', 'build']

    // When
    const got = isRunningInVerbose(argv)

    // Then
    expect(got).toBe(false)
  })
})
