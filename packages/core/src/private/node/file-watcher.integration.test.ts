import { inTemporaryDeletableDirectory } from '../../internal/node/testing/temporary.js'
import { describe, test, afterEach, expect } from 'vitest'
import { FileWatcher, FileWatcherEvent, watchFiles } from './file-watcher.js'
import { AbsolutePath } from 'typed-file-system-path'
import { writeFile } from '../../public/node/fs.js'

let fileWatcher: FileWatcher | undefined

afterEach(async () => {
  await fileWatcher?.close()
})

describe('watchFiles', () => {
  test('notifies when a new file gets added', async () => {
    await inTemporaryDeletableDirectory(async (tmpDir) => {
      // Given
      const filePath = tmpDir.pathAppendingComponent('test.ts')

      // When
      const [event, path] = await new Promise<[FileWatcherEvent, AbsolutePath]>(
        (resolve, reject) => {
          const fileWriting = writeFile(filePath, "const test = 'test'")
          fileWatcher = watchFiles({
            patterns: tmpDir.pathAppendingComponent('**/*').pathString,
            on: (event, path) => {
              resolve([event, path])
            },
          })
          fileWriting.catch((error) => reject)
        }
      )
      // Then
      expect(event).toEqual('add')
      expect(path).toEqual(filePath)
    })
  })
})
