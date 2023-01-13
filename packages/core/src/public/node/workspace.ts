import { Abort } from '../common/error.js'
import { findPathUp } from './fs.js'
import { moduleDirname } from './path.js'

/**
 * Returns an error to be thrown when the catalysis package directory can't be found.
 * @returns {Abort} An abort error.
 */
export const CatalysisDirectoryNotFoundError = () => {
  return new Abort("Couldn't find the directory of the 'catalysis' package")
}

/**
 * This function returns the directory containing the catalysis package.
 * NOTE: The function is intended for development and testing purposes
 * and should not be used in production workflows by no circumstances.
 * @returns {Promise<string>} A promise that resolves with the directory.
 * @throws {CatalysisDirectoryNotFoundError} When the directory can't be found.
 */
export async function catalysisdevPackageDirectory(): Promise<string> {
  const directory = await findPathUp('packages/catalysisdev', {
    type: 'directory',
    cwd: moduleDirname(import.meta.url),
  })
  if (!directory) {
    throw CatalysisDirectoryNotFoundError()
  }
  return directory
}
