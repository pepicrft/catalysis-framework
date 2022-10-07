import {
  makeDirectory,
  moveFileOrDirectory,
  readFile,
  writeFile,
} from './fs.js'
import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../../internal/node/testing/temporary.js'

describe('readFile', () => {
  test('reads the file', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const filePath = tmpDir.pathAppendingComponent('file.txt')
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
      const fromPath = tmpDir.pathAppendingComponent('from')
      const toPath = tmpDir.pathAppendingComponent('to')
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
      const fromPath = tmpDir.pathAppendingComponent('from')
      const fromPathFilePath = fromPath.pathAppendingComponent('file')
      await makeDirectory(fromPath)
      await writeFile(fromPathFilePath, 'content')
      await makeDirectory(fromPath)
      const toPath = tmpDir.pathAppendingComponent('to')
      const toPathFilePath = toPath.pathAppendingComponent('file')

      // When
      await moveFileOrDirectory(fromPath, toPath)

      // Then
      const content = await readFile(toPathFilePath)
      expect(content).toEqual('content')
    })
  })
})
