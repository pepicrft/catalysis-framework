import { readFile, writeFile } from './fs'
import { join as pathJoin } from './path'

import { describe, it, expect } from 'vitest'
import { temporary } from '@gestaltjs/testing'

describe('readFile', () => {
  it('reads the file', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const filePath = pathJoin(tmpDir, 'file.txt')
      const content = 'content'
      await writeFile(filePath, content)

      // When
      const got = await readFile(filePath)

      // Then
      expect(got).toEqual(content)
    })
  })
})
