import { loadMainTarget } from './main'
import { describe, test, expect, vi } from 'vitest'
import { testMainTarget } from '@gestaltjs/testing/node/models'
import { inTemporarydirectory } from '@gestaltjs/testing/node/temporary'
import { parentDirectory, pathBasename, joinPath } from '../../../../node/path'
import { loadRoutes } from './main/routes'
import { createRouter } from 'radix3'
import { Route } from '../../models/targets/main/route'

vi.mock('./main/routes')

describe('loadMainTarget', () => {
  test('loads the target successfully', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const manifestPath = joinPath(tmpDir, 'gestalt.main.js')
      const load = vi.fn()
      const mainTarget = testMainTarget()
      const moduleLoader: any = { load }
      const router = createRouter<Route>()
      load.mockResolvedValue(mainTarget)
      vi.mocked(loadRoutes).mockResolvedValue(router)

      // When
      const got = await loadMainTarget(manifestPath, moduleLoader)

      // Then
      expect(got.manifestPath).toEqual(manifestPath)
      expect(got.name).toEqual(pathBasename(parentDirectory(manifestPath)))
      expect(got.directory).toEqual(parentDirectory(manifestPath))
      expect(got.router).toBe(router)
    })
  })
})
