import { gestalt as gestaltEnvironment } from './environment.js'
import { describe, test, expect } from 'vitest'

describe('gestalt', () => {
  test('returns development when GESTALT_ENV=development', () => {
    // Given
    const env = { GESTALT_ENV: 'development' }

    // When
    const got = gestaltEnvironment(env)

    // Then
    expect(got).toBe('development')
  })

  test('returns development when GESTALT_ENV=production', () => {
    // Given
    const env = { GESTALT_ENV: 'production' }

    // When
    const got = gestaltEnvironment(env)

    // Then
    expect(got).toBe('production')
  })

  test('returns development when GESTALT_ENV is not set', () => {
    // Given
    const env = {}

    // When
    const got = gestaltEnvironment(env)

    // Then
    expect(got).toBe('development')
  })
})
