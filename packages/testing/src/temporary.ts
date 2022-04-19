import {temporaryDirectoryTask, temporaryDirectory} from 'tempy'
import rimraf from 'rimraf'

/**
 * Creates a temporary directory and ties its lifecycle to the lifecycle of the callback.
 * @param callback - Callback whose lifecycle is tied to the lifecycle of the temporary directory.
 */
export async function directory<T>(
  callback: (temporaryDirectory: string) => T
) {
  return temporaryDirectoryTask(callback)
}

/**
 * Creates a temporary directory and ties its lifecycle to the lifecycle of the callback.
 * @param callback - Callback whose lifecycle is tied to the lifecycle of the temporary directory.
 */
export async function deletableDirectory<T>(
  callback: (temporaryDirectory: string, deleteDir: () => Promise<void>) => T
) {
  const directory = temporaryDirectory()
  const value = callback(directory, async () => {
    await new Promise((resolve, reject) => {
      rimraf(directory, {}, resolve)
    })
  })
  return value
}
