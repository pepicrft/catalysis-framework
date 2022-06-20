import { readFile, writeFile } from './fs'
import { joinPath } from '../node/path'

import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '@gestaltjs/testing/node/temporary'

describe('readFile', () => {
  test('reads the file', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const filePath = joinPath(tmpDir, 'file.txt')
      const content = 'content'
      await writeFile(filePath, content)

      // When
      const got = await readFile(filePath)

      // Then
      expect(got).toEqual(content)
    })
  })
})
