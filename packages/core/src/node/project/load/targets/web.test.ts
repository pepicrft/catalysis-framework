import { loadWebTarget } from './web'
import { describe, test, expect, vi } from 'vitest'
import { testWebTarget } from '@gestaltjs/testing/node/fixtures'
import { inTemporarydirectory } from '@gestaltjs/testing/node/temporary'
import { parentDirectory, pathBasename, joinPath } from '../../../path'
import { loadRoutes } from './web/routes'
import { createRouter } from 'radix3'
import { Route } from '../../../../common/models/targets/web/route'
import { webTargetFileName } from '../../../../common/constants'

vi.mock('./web/routes')

describe('loadWebTarget', () => {
  test('loads the target successfully', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const manifestPath = joinPath(tmpDir, `${webTargetFileName}.js`)
      const load = vi.fn()
      const webTarget = testWebTarget()
      const moduleLoader: any = { load }
      const router = createRouter<Route>()
      load.mockResolvedValue(webTarget)
      vi.mocked(loadRoutes).mockResolvedValue(router)

      // When
      const got = await loadWebTarget(manifestPath, moduleLoader)

      // Then
      expect(got.manifestPath).toEqual(manifestPath)
      expect(got.name).toEqual(pathBasename(parentDirectory(manifestPath)))
      expect(got.directory).toEqual(parentDirectory(manifestPath))
      expect(got.router).toBe(router)
    })
  })
})
