import { describe, test, expect } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { joinPath, parentDirectory } from '../../../../../node/path'
import { loadLayouts } from './layouts'
import { writeFile, makeDirectory } from '../../../../../node/fs'

describe('loadLayouts', () => {
  test('loads layouts named _layout.* in any subdirectory', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const settingsLayoutPath = joinPath(tmpDir, 'settings/_layout.jsx')
      const homeLayout = joinPath(tmpDir, '_layout.jsx')
      await makeDirectory(parentDirectory(settingsLayoutPath))
      await makeDirectory(parentDirectory(homeLayout))
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
