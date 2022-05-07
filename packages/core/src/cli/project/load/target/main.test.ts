import { loadMainTarget } from './main'
import { describe, test, expect, vi } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { models } from '@gestaltjs/testing'
import { dirname, basename, join as pathJoin } from '../../../path'
import { writeFile, makeDirectory } from '../../../fs'
import { loadRoutes } from './main/routes'
import { createRouter } from 'radix3'
import { Route } from '../../models/target'

vi.mock('./main/routes')

describe('loadMainTarget', () => {
  test('loads the target successfully', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const manifestPath = pathJoin(tmpDir, 'gestalt.target.js')
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
      expect(got.name).toEqual(basename(dirname(manifestPath)))
      expect(got.directory).toEqual(dirname(manifestPath))
      expect(got.router).toBe(router)
    })
  })
})
