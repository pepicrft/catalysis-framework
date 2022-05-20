import { describe, test, expect } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { joinPath, dirname } from '../../../../../node/path.public'
import { loadLayouts } from './layouts'
import { writeFile, makeDirectory } from '../../../../../shared/fs'

describe('loadLayouts', () => {
  test('loads layouts named _layout.* in any subdirectory', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const settingsLayoutPath = joinPath(tmpDir, 'settings/_layout.jsx')
      const homeLayout = joinPath(tmpDir, '_layout.jsx')
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
