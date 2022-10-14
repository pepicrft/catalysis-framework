import { Abort } from '../common/error.js'
import { pathExists, readFile } from './fs.js'
import { content, coreLogger, pathToken } from './logger.js'
import parseJson from 'parse-json'
import { AbsolutePath } from 'typed-file-system-path'

export class JSONFileNotFoundError extends Abort {
  constructor(path: AbsolutePath) {
    super(
      content`We couldn't read the JSON file at ${pathToken(
        path
      )} because it doesn't exist.`
    )
  }
}

export class JSONFileDecodeError extends Abort {
  constructor(path: AbsolutePath, error: Error) {
    if (error?.message) {
      super(content`We couldn't decode the content of the JSON file ${pathToken(
        path
      )} due to the following error:
      ${error.message}`)
    } else {
      super(
        content`We couldn't decode the content of the JSON file ${pathToken(
          path
        )}`
      )
    }
  }
}

/**
 * It reads and parses a JSON file returning its content as a Javascript object.
 * @param path {string} The absolute path to the JSON file to read.
 * @returns {Promise<any>} A promise that resolves with a Javascript object representing the JSON content.
 */
export async function decodeJSONFile(path: AbsolutePath): Promise<any> {
  coreLogger().debug(content`Reading JSON file from path ${pathToken(path)}`)
  const fileExists = await pathExists(path)
  if (!fileExists) {
    throw new JSONFileNotFoundError(path)
  }
  const jsonContent = await readFile(path)
  try {
    return parseJson(jsonContent)
  } catch (error: any | undefined) {
    throw new JSONFileDecodeError(path, error)
  }
}
