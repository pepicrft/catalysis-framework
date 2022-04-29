import { loadMainTarget } from './main'
import { describe, test, expect, vi } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { models } from '@gestaltjs/testing'
import {
  glob,
  dirname,
  basename,
  join as pathJoin,
  relative as relativePath,
  parse as parsePath,
} from '../../../path'
import { writeFile, makeDirectory } from '../../../fs'

describe('loadMainTarget', () => {
  test('loads the target successfully', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const manifestPath = pathJoin(tmpDir, 'gestalt.target.js')
      const load = vi.fn()
      const mainTarget = models.testMainTarget()
      const moduleLoader: any = { load }
      load.mockResolvedValue(mainTarget)
      const aboutFilePath = pathJoin(tmpDir, 'routes/about.jsx')
      const settingsFilePath = pathJoin(tmpDir, 'routes/settings/index.jsx')
      await makeDirectory(dirname(aboutFilePath))
      await makeDirectory(dirname(settingsFilePath))
      await writeFile(aboutFilePath, '')
      await writeFile(settingsFilePath, '')

      // When
      const got = await loadMainTarget(manifestPath, moduleLoader)

      // Then
      const aboutRoute = got.router.lookup('/about')
      expect(aboutRoute?.type).toEqual('ui')
      expect(aboutRoute?.filePath).toEqual(aboutFilePath)
      const settingsRoute = got.router.lookup('/settings')
      expect(settingsRoute?.type).toEqual('ui')
      expect(settingsRoute?.filePath).toEqual(settingsFilePath)
    })
  })
})
