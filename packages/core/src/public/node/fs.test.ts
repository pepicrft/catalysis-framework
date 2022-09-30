import {
  makeDirectory,
  moveFileOrDirectory,
  readFile,
  writeFile,
} from './fs.js'
import { joinPath } from '../node/path.js'
import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../../internal/node/testing/temporary.js'

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

describe('moveFileOrDirectory', () => {
  test('moves a file', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const fromPath = joinPath(tmpDir, 'from')
      const toPath = joinPath(tmpDir, 'to')
      await writeFile(fromPath, 'content')

      // When
      await moveFileOrDirectory(fromPath, toPath)

      // Then
      const content = await readFile(toPath)
      expect(content).toEqual('content')
    })
  })

  test('moves a directory', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const fromPath = joinPath(tmpDir, 'from')
      const fromPathFilePath = joinPath(fromPath, 'file')
      await makeDirectory(fromPath)
      await writeFile(fromPathFilePath, 'content')
      await makeDirectory(fromPath)
      const toPath = joinPath(tmpDir, 'to')
      const toPathFilePath = joinPath(toPath, 'file')

      // When
      await moveFileOrDirectory(fromPath, toPath)

      // Then
      const content = await readFile(toPathFilePath)
      expect(content).toEqual('content')
    })
  })
})
