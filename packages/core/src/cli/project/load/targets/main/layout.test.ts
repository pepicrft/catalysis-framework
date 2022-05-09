import { describe, test, expect, vi } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { join as pathJoin, dirname } from '../../../../path'
import { loadLayouts } from './layouts'
import { writeFile, makeDirectory } from '../../../../fs'

describe('loadLayouts', () => {
  test('loads layouts named _layout.* in any subdirectory', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const settingsLayoutPath = pathJoin(tmpDir, 'settings/_layout.jsx')
      const homeLayout = pathJoin(tmpDir, '_layout.jsx')
      await makeDirectory(dirname(settingsLayoutPath))
      await makeDirectory(dirname(homeLayout))
      await writeFile(settingsLayoutPath, '')
      await writeFile(homeLayout, '')

      // When
      const got = await loadLayouts(tmpDir)

      // Then
      expect(got['/']).toEqual(homeLayout)
      expect(got['/settings']).toEqual(settingsLayoutPath)
    })
  })
})
