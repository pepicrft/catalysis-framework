import { loadMainTarget } from './main'
import { describe, test, expect, vi } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { models } from '@gestaltjs/testing'
import { parentDirectory, pathBaseName, joinPath } from '../../../../node/path'
import { loadRoutes } from './main/routes'
import { createRouter } from 'radix3'
import { Route } from '../../models/targets/main/route'

vi.mock('./main/routes')

describe('loadMainTarget', () => {
  test('loads the target successfully', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const manifestPath = joinPath(tmpDir, 'gestalt.main.js')
      const load = vi.fn()
      const mainTarget = models.testMainTarget()
      const moduleLoader: any = { load }
      const router = createRouter<Route>()
      load.mockResolvedValue(mainTarget)
      vi.mocked(loadRoutes).mockResolvedValue(router)

      // When
      const got = await loadMainTarget(manifestPath, moduleLoader)

      // Then
      expect(got.manifestPath).toEqual(manifestPath)
      expect(got.name).toEqual(pathBaseName(parentDirectory(manifestPath)))
      expect(got.directory).toEqual(parentDirectory(manifestPath))
      expect(got.router).toBe(router)
    })
  })
})
