import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '@gestaltjs/testing/node/temporary'
import { joinPath, parentDirectory } from '../../../../path'
import { loadLayouts } from './layouts'
import { writeFile, makeDirectory } from '../../../../fs'

describe('loadLayouts', () => {
  test('loads layouts named _layout.* in any subdirectory', async () => {
    await inTemporarydirectory(async (tmpDir) => {
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
