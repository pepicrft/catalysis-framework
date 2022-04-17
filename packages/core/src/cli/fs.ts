import fs from 'fs-extra'

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

export async function writeDirectory(path: string): Promise<void> {
  return fs.mkdir(path)
}

export async function emptyDir(path: string): Promise<void> {
  return fs.emptyDir(path)
}

export async function copyFile(
  sourceFile: string,
  targetFile: string
): Promise<void> {
  return fs.promises.copyFile(sourceFile, targetFile)
}

export async function mkDir(directoryPath: string): Promise<void> {
  await fs.promises.mkdir(directoryPath, { recursive: true })
}

export async function rmDir(path: string): Promise<void> {
  return fs.promises.rmdir(path, { recursive: true })
}
