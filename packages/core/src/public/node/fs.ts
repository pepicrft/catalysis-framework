import fs from 'fs-extra'
import { temporaryDirectoryTask } from 'tempy'

import { findUp, Options as FindUpOptions } from 'find-up'
import { absolutePath, AbsolutePath } from 'typed-file-system-path'

/**
 * It traverses the directory hiearchy up appending the given pattern
 * and checking for the presence of the obtained absolute path. If the
 * path exists, it returns it.
 * @param pattern {string | string[]} Pattern to match against.
 * @param options {FindPathUpOptions} Options to configure the find up.
 * @returns {Promise<string | undefined>} A promise that resolves with the
 *          path if it can find it, or undefined otherwise.
 */
export async function findPathUp(
  pattern: string | string[],
  options: { cwd: string; type?: 'file' | 'directory' }
): Promise<string | undefined> {
  return await findUp(pattern, options as FindUpOptions)
}
/**
 * Reads a file and decodes it using utf-8.
 * @param path {AbsolutePath} Path to the file.
 * @returns {Promise<string>} A promise that resolves with the content of the file.
 */
export async function readFile(path: AbsolutePath): Promise<string> {
  return fs.readFile(path.pathString, 'utf-8')
}

/**
 * Writes a string to a file. If the file already exists, it overwrites its content.
 * @param path {AbsolutePath} Path to the content will be written to.
 * @param content {string} The content to be written.
 * @returns {Promise<void>} A promise that resolves when the write completes.
 */
export async function writeFile(
  path: AbsolutePath,
  content: string
): Promise<void> {
  return fs.writeFile(path.pathString, content, { encoding: 'utf-8' })
}

/**
 * Returns whether a directory or file exists in the filesystem.
 * @param path {AbsolutePath} Path to file or directory to check if it exists.
 * @returns {Promise<boolean>} A promise that resolves with true if the file or directory exists.
 */
export async function pathExists(path: AbsolutePath): Promise<boolean> {
  return fs.pathExists(path.pathString)
}

/**
 * It creates a new directory in the system.
 * @param path {AbsolutePath} Path where the directory should be created.
 * @returns {Promise<void>} A promise that resolves successfully if the directory gets created.
 */
export async function makeDirectory(path: AbsolutePath): Promise<void> {
  await fs.promises.mkdir(path.pathString, { recursive: true })
}

/**
 * It removes the directory at the given location.
 * @param path {AbsolutePath} Path to the directory that will get removed.
 * @returns {Promise<void>} A promise that resolves if the directory gets removed successfully.
 */
export async function removeDirectory(path: AbsolutePath): Promise<void> {
  return fs.promises.rmdir(path.pathString, { recursive: true })
}

/**
 * It moves a file or a directory from one location to another.
 *
 * @param from {AbsolutePath} Path from where the file or directory will be moved.
 * @param to {AbsolutePath} Path to where the file or directory will be moved.
 * @returns {Promise<void>} A promise that resolves when the move is complete.
 */
export async function moveFileOrDirectory(
  from: AbsolutePath,
  to: AbsolutePath
): Promise<void> {
  return fs.move(from.pathString, to.pathString)
}

/**
 * Copies a file from a source to a target location.
 * @param sourcePath {AbsolutePath} Path to the source file that will be copied.
 * @param targetPath {AbsolutePath} Path to the target location.
 * @returns {Promise<void>} A promise that resolves if the file is copied successfully.
 */
export async function copyFile(
  sourcePath: AbsolutePath,
  targetPath: AbsolutePath
): Promise<void> {
  return fs.promises.copyFile(sourcePath.pathString, targetPath.pathString)
}

/**
 * Creates a temporary directory and ties its lifecycle to the lifecycle of the callback.
 * @param callback - Callback whose lifecycle is tied to the lifecycle of the temporary directory.
 */
export async function inTemporarydirectory<T>(
  callback: (temporaryDirectory: AbsolutePath) => T | Promise<T>
) {
  return temporaryDirectoryTask(async (tmpDir) => {
    await callback(absolutePath(tmpDir))
  })
}
