import { inTemporarydirectory } from '../../../internal/node/testing/temporary.js'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createViteBundler } from './vite.js'
import { createServer } from 'vite'

beforeEach(() => {
  vi.mock('vite')
})

describe('create', () => {
  test('it initializes Vite with the right configuration', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given/When
      const cacheDirectory = tmpDir.pathAppendingComponent('cache')
      await createViteBundler({
        directory: tmpDir,
        cacheDirectory,
      })

      // Then
      expect(createServer).toHaveBeenCalledWith({
        root: tmpDir.pathString,
        cacheDir: cacheDirectory?.pathString,
        esbuild: {},
        server: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          middlewareMode: 'true',
        },
        clearScreen: false,
        logLevel: 'silent',
        optimizeDeps: {
          entries: [],
        },
        resolve: {
          alias: undefined,
        },
        build: {
          watch: {},
        },
      })
    })
  })

  test('it closes Vite when close is called', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const vite = {
        close: vi.fn(),
      } as any
      vi.mocked(createServer).mockResolvedValue(vite)
      const cacheDirectory = tmpDir.pathAppendingComponent('cache')

      // When
      const got = await createViteBundler({
        directory: tmpDir,
        cacheDirectory,
      })

      // When
      await got.close()

      // Then
      expect(vite.close).toHaveBeenCalled()
    })
  })
})
