import { isRunningInVerbose } from './cli'
import { test, expect, describe } from 'vitest'

describe('isRunningInVerbose', () => {
  test('returns true when --verbose is passed', () => {
    // Given
    const argv = ['gestalt', 'build', '--verbose']

    // When
    const got = isRunningInVerbose(argv)

    // Then
    expect(got).toBe(true)
  })

  test('returns true when -v is passed', () => {
    // Given
    const argv = ['gestalt', 'build', '-v']

    // When
    const got = isRunningInVerbose(argv)

    // Then
    expect(got).toBe(true)
  })

  test('returns false when neither -v nor --verbose are set', () => {
    // Given
    const argv = ['gestalt', 'build']

    // When
    const got = isRunningInVerbose(argv)

    // Then
    expect(got).toBe(false)
  })
})
