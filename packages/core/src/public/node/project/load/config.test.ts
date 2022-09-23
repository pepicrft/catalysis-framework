import { describe, test, expect, vi } from 'vitest'
import { loadConfig, watchConfig } from './config.js'
import { Configuration } from '../../../common/models/configuration.js'
import { absolutePath } from '../../path.js'

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
        manifestPath: absolutePath(manifestPath),
      },
    }
    vi.mocked(moduleLoader.load).mockResolvedValue(module)

    // When
    const got = await loadConfig(manifestPath, moduleLoader as any)

    // Then
    expect(got.name).toEqual('Project')
  })

  test('watches the configuration through the module loader', async () => {
    // Given
    const watch = vi.fn()
    const load = vi.fn()
    const moduleLoader = {
      watch,
      load,
    }
    const manifestPath = '/test/gestalt.config.js'
    const module: { default: Configuration } = {
      default: {
        name: 'Project',
        manifestPath: absolutePath(manifestPath),
      },
    }
    vi.mocked(moduleLoader.load).mockResolvedValue(module)

    // When
    let gotConfiguration: Configuration | undefined
    await watchConfig(manifestPath, moduleLoader as any, (configuration) => {
      gotConfiguration = configuration
    })

    // Then
    const callback = watch.mock.calls[0][1]
    await callback(manifestPath)
    expect(gotConfiguration).toEqual(module.default)
  })
})
