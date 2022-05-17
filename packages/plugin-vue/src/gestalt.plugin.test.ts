import VuePlugin from './gestalt.plugin'
import { describe, test, expect } from 'vitest'

describe('plugin', () => {
  test('attributes', async () => {
    // Given
    const plugin = await VuePlugin()

    // Then
    expect(plugin.name).toEqual('vue')
    expect(plugin.renderer?.extensions).toEqual(['vue'])
  })
})
