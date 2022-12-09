import { temporaryDirectoryTask, temporaryDirectory } from 'tempy'
import rimraf from 'rimraf'
import { absolutePath, AbsolutePath } from 'typed-file-system-path'

/**
 * Creates a temporary directory and ties its lifecycle to the lifecycle of the callback.
 * @param callback - Callback whose lifecycle is tied to the lifecycle of the temporary directory.
 */
export async function inTemporarydirectory<T>(
  callback: (temporaryDirectory: AbsolutePath) => T
) {
  return temporaryDirectoryTask((tmpDir) => {
    return callback(absolutePath(tmpDir))
  })
}

/**
 * Creates a temporary directory and ties its lifecycle to the lifecycle of the callback.
 * @param callback - Callback whose lifecycle is tied to the lifecycle of the temporary directory.
 */
export async function inTemporaryDeletableDirectory<T>(
  callback: (
    temporaryDirectory: AbsolutePath,
    deleteDir: () => Promise<void>
  ) => T
) {
  const directory = temporaryDirectory()
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const value = await callback(absolutePath(directory), async () => {
    await new Promise((resolve, reject) => {
      rimraf(directory, {}, resolve)
    })
  })
  return value
}
