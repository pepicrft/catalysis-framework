import { Abort } from '../common/error.js'
import { findPathUp } from './fs.js'
import { moduleDirname } from './path.js'

/**
 * Returns an error to be thrown when the gestalt package directory can't be found.
 * @returns {Abort} An abort error.
 */
export const GestaltDirectoryNotFoundError = () => {
  return new Abort("Couldn't find the directory of the 'gestalt' package")
}

/**
 * This function returns the directory containing the gestalt package.
 * NOTE: The function is intended for development and testing purposes
 * and should not be used in production workflows by no circumstances.
 * @returns {Promise<string>} A promise that resolves with the directory.
 * @throws {GestaltDirectoryNotFoundError} When the directory can't be found.
 */
export async function gestaltjsPackageDirectory(): Promise<string> {
  const directory = await findPathUp('packages/gestaltjs', {
    type: 'directory',
    cwd: moduleDirname(import.meta.url),
  })
  if (!directory) {
    throw GestaltDirectoryNotFoundError()
  }
  return directory
}
