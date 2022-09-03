import { Abort } from '../common/error.js'
import { pathExists, readFile } from './fs.js'
import { content, coreLogger, pathToken } from './logger.js'
import externalParseJson from 'parse-json'

/**
 * A function that returns an Abort error that represents that
 * a JSON file couldn't be opened because it doesn't exist in the
 * file system.
 * @param path {string} The absolute path to the JSON file.
 * @returns {Abort} An Abort instance.
 */
export const JSONFileNotFoundError = (path: string) => {
  return new Abort(
    content`We couldn't read the JSON file at ${pathToken(
      path
    )} because it doesn't exist.`
  )
}

/**
 * A function that returns an Abort error that represents that
 * the JSON is invalid.
 * @param path {string} The absolute path to the JSON file.
 * @param error {Error | undefined} The parsing error.
 * @returns {Abort} An Abort instance.
 */
export const JSONFileParseError = (path: string, error: Error | undefined) => {
  if (error?.message) {
    return new Abort(content`We couldn't parse the content of the JSON file ${pathToken(
      path
    )} due to the following error:
    ${error.message}`)
  } else {
    return new Abort(
      content`We couldn't parse the content of the JSON file ${pathToken(path)}`
    )
  }
}

/**
 * A function that returns an Abort error that represents that
 * the JSON is invalid.
 * @param error {Error | undefined} The parsing error.
 * @returns {Abort} An Abort instance.
 */
export const JSONParseError = (error: Error | undefined) => {
  if (error?.message) {
    return new Abort(content`We couldn't parse the content of the JSON due to the following error:
    ${error.message}`)
  } else {
    return new Abort(content`We couldn't parse the content of the JSON`)
  }
}

/**
 * It reads and parses a JSON file returning its content as a Javascript object.
 * @param path {string} The absolute path to the JSON file to read.
 * @returns {Promise<any>} A promise that resolves with a Javascript object representing the JSON content.
 */
export async function parseJsonFile(path: string): Promise<any> {
  coreLogger().debug(content`Reading JSON file from path ${pathToken(path)}`)
  const fileExists = await pathExists(path)
  if (!fileExists) {
    throw JSONFileNotFoundError(path)
  }
  const jsonContent = await readFile(path)
  try {
    return externalParseJson(jsonContent)
  } catch (error: any | undefined) {
    throw JSONFileParseError(path, error)
  }
}

/**
 * Parses a JSON string and returns it as a Javascript object.
 * @param content {string} The JSON content to be parsed.
 * @returns {Promise<any>} A promise that resolves with the Javascript object
 * or
 */
export async function parseJson(content: string): Promise<any> {
  try {
    return externalParseJson(content)
  } catch (error: any | undefined) {
    throw JSONParseError(error)
  }
}
