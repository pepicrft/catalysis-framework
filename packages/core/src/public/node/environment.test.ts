import { catalysis as catalysisEnvironment } from './environment.js'
import { describe, test, expect } from 'vitest'

describe('catalysis', () => {
  test('returns development when CATALYSIS_ENV=development', () => {
    // Given
    const env = { CATALYSIS_ENV: 'development' }

    // When
    const got = catalysisEnvironment(env)

    // Then
    expect(got).toBe('development')
  })

  test('returns development when CATALYSIS_ENV=production', () => {
    // Given
    const env = { CATALYSIS_ENV: 'production' }

    // When
    const got = catalysisEnvironment(env)

    // Then
    expect(got).toBe('production')
  })

  test('returns development when CATALYSIS_ENV is not set', () => {
    // Given
    const env = {}

    // When
    const got = catalysisEnvironment(env)

    // Then
    expect(got).toBe('development')
  })
})
