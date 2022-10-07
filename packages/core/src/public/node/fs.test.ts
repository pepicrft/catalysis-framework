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
      const filePath = tmpDir.appending('file.txt')
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
      const fromPath = tmpDir.appending('from')
      const toPath = tmpDir.appending('to')
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
      const fromPath = tmpDir.appending('from')
      const fromPathFilePath = fromPath.appending('file')
      await makeDirectory(fromPath)
      await writeFile(fromPathFilePath, 'content')
      await makeDirectory(fromPath)
      const toPath = tmpDir.appending('to')
      const toPathFilePath = toPath.appending('file')

      // When
      await moveFileOrDirectory(fromPath, toPath)

      // Then
      const content = await readFile(toPathFilePath)
      expect(content).toEqual('content')
    })
  })
})
