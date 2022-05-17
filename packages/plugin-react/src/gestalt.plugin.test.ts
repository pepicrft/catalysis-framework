import ReactPlugin from './gestalt.plugin'
import { describe, test, expect } from 'vitest'

describe('plugin', () => {
  test('attributes', async () => {
    // Given
    const plugin = await ReactPlugin()

    // Then
    expect(plugin.name).toEqual('react')
    expect(plugin.renderer?.extensions).toEqual(['jsx', 'tsx'])
  })
})
