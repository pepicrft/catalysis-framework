import fs from 'fs-extra'
import { temporaryDirectoryTask } from 'tempy'

import { findUp, Options as FindUpOptions } from 'find-up'

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
 * @param path {string} Path to the file.
 * @returns {Promise<string>} A promise that resolves with the content of the file.
 */
export async function readFile(path: string): Promise<string> {
  return fs.readFile(path, 'utf-8')
}

/**
 * Writes a string to a file. If the file already exists, it overwrites its content.
 * @param path {string} Path to the content will be written to.
 * @param content {string} The content to be written.
 * @returns {Promise<void>} A promise that resolves when the write completes.
 */
export async function writeFile(path: string, content: string): Promise<void> {
  return fs.writeFile(path, content, { encoding: 'utf-8' })
}

/**
 * Returns whether a directory or file exists in the filesystem.
 * @param path {string} Path to file or directory to check if it exists.
 * @returns {Promise<boolean>} A promise that resolves with true if the file or directory exists.
 */
export async function pathExists(path: string): Promise<boolean> {
  return fs.pathExists(path)
}

/**
 * It creates a new directory in the system.
 * @param path {string} Path where the directory should be created.
 * @returns {Promise<void>} A promise that resolves successfully if the directory gets created.
 */
export async function makeDirectory(path: string): Promise<void> {
  await fs.promises.mkdir(path, { recursive: true })
}

/**
 * It removes the directory at the given location.
 * @param path {string} Path to the directory that will get removed.
 * @returns {Promise<void>} A promise that resolves if the directory gets removed successfully.
 */
export async function removeDirectory(path: string): Promise<void> {
  return fs.promises.rmdir(path, { recursive: true })
}

/**
 * It moves a file or a directory from one location to another.
 *
 * @param from {string} Path from where the file or directory will be moved.
 * @param to {string} Path to where the file or directory will be moved.
 * @returns {Promise<void>} A promise that resolves when the move is complete.
 */
export async function moveFileOrDirectory(
  from: string,
  to: string
): Promise<void> {
  return fs.move(from, to)
}

/**
 * Copies a file from a source to a target location.
 * @param sourcePath {string} Path to the source file that will be copied.
 * @param targetPath {string} Path to the target location.
 * @returns {Promise<void>} A promise that resolves if the file is copied successfully.
 */
export async function copyFile(
  sourcePath: string,
  targetPath: string
): Promise<void> {
  return fs.promises.copyFile(sourcePath, targetPath)
}

/**
 * Creates a temporary directory and ties its lifecycle to the lifecycle of the callback.
 * @param callback - Callback whose lifecycle is tied to the lifecycle of the temporary directory.
 */
export async function inTemporarydirectory<T>(
  callback: (temporaryDirectory: string) => T | Promise<T>
) {
  return temporaryDirectoryTask(callback)
}
