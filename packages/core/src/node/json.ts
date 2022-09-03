import { Abort } from '../common/error.js'
import { pathExists, readFile } from './fs.js'
import { content, coreLogger, pathToken } from './logger.js'
import parseJson from 'parse-json'

/**
 * A function that returns an Abort error that represents that
 * a JSON file couldn't be opened because it doesn't exist in the
 * file system.
 * @param path {string} The absolute path to the JSON file.
 * @returns {Abort} A new instance of abort.
 */
export const JSONFileNotFoundError = (path: string) => {
  return new Abort(
    content`We couldn't read the JSON file at ${pathToken(
      path
    )} because it doesn't exist.`
  )
}

export const JSONFileParseError = (path: string, error: any | undefined) => {
  if (error?.codeFrame) {
    return new Abort(content`We couldn't parse the content of the JSON file ${pathToken(
      path
    )} due to the following error:
    ${error.codeFrame}`)
  } else {
    return new Abort(
      content`We couldn't parse the content of the JSON file ${pathToken(path)}`
    )
  }
}

/**
 * It reads and parses a JSON file returning its content as a Javascript object.
 * @param path {string} The absolute path to the JSON file to read.
 * @returns {Promise<any>} A promise that resolves with a Javascript object representing the JSON content.
 */
export async function readJsonFile(path: string): Promise<any> {
  coreLogger().debug(content`Reading JSON file from path ${pathToken(path)}`)
  const fileExists = await pathExists(path)
  if (!fileExists) {
    throw JSONFileNotFoundError(path)
  }
  const jsonContent = await readFile(path)
  try {
    return parseJson(jsonContent)
  } catch (error: any | undefined) {
    throw JSONFileParseError(path, error)
  }
}
