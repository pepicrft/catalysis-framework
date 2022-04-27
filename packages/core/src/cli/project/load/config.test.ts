import { describe, test, expect, vi } from 'vitest'
import { loadConfig, watchConfig } from './config'
import { Configuration } from '../models/configuration'

describe('loadConfig', () => {
  test('loads the configuration through the module loader', async () => {
    // Given
    const moduleLoader = {
      load: vi.fn(),
    }
    const manifestPath = '/test/gestalt.config.js'

    const module: { default: Configuration } = {
      default: {
        name: 'Project',
        manifestPath,
      },
    }
    vi.mocked(moduleLoader.load).mockResolvedValue(module)

    // When
    const got = await loadConfig(manifestPath, moduleLoader as any)

    // Then
    expect(got.name).toEqual('Project')
  })
})
