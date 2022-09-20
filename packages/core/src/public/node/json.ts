import { Abort } from '../common/error.js'
import { pathExists, readFile } from './fs.js'
import { content, coreLogger, pathToken } from './logger.js'
import parseJson from 'parse-json'
import safeStringify from 'fast-safe-stringify'

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
export const JSONFileDecodeError = (path: string, error: Error | undefined) => {
  if (error?.message) {
    return new Abort(content`We couldn't decode the content of the JSON file ${pathToken(
      path
    )} due to the following error:
    ${error.message}`)
  } else {
    return new Abort(
      content`We couldn't decode the content of the JSON file ${pathToken(
        path
      )}`
    )
  }
}

/**
 * A function that returns an Abort error that represents that
 * the JSON is invalid.
 * @param error {Error | undefined} The parsing error.
 * @returns {Abort} An Abort instance.
 */
export const JSONDecodeError = (error: Error | undefined) => {
  if (error?.message) {
    return new Abort(content`We couldn't decode the content of the JSON due to the following error:
    ${error.message}`)
  } else {
    return new Abort(content`We couldn't decode the content of the JSON`)
  }
}

/**
 * A function that returns an Abort error that represents that the
 * encoding of a JSON has failed.
 * @param error {Error} The error thrown by the 'fast-safe-stringify' package.
 * @returns {Abort} An Abort instance.
 */
export const JSONEncodeError = (error: Error) => {
  return new Abort(content`We couldn't encode into JSON due to:
  ${error.message}
`)
}

/**
 * It reads and parses a JSON file returning its content as a Javascript object.
 * @param path {string} The absolute path to the JSON file to read.
 * @returns {Promise<any>} A promise that resolves with a Javascript object representing the JSON content.
 */
export async function decodeJsonFile(path: string): Promise<any> {
  coreLogger().debug(content`Reading JSON file from path ${pathToken(path)}`)
  const fileExists = await pathExists(path)
  if (!fileExists) {
    throw JSONFileNotFoundError(path)
  }
  const jsonContent = await readFile(path)
  try {
    return parseJson(jsonContent)
  } catch (error: any | undefined) {
    throw JSONFileDecodeError(path, error)
  }
}

/**
 * Parses a JSON string and returns it as a Javascript object.
 * @param content {string} The JSON content to be parsed.
 * @returns {Promise<any>} A promise that resolves with the Javascript object
 * or
 */
export function decodeJson(content: string): any {
  try {
    return parseJson(content)
  } catch (error: any | undefined) {
    throw JSONDecodeError(error)
  }
}

/**
 * A version of JSON.stringify that's faster and more stable.
 * @param value {any} The value to convert to a JSON string.
 * @param replacer {(key: string, value: any) => any}
A function that alters the behavior of the stringification process, or an array of strings or numbers naming properties of value that should be included in the output.
 * @param space {string | number} A string or number that's used to insert white space (including indentation, line break characters, etc.) into the output JSON string for readability purposes.
 * @param options {{ depthLimit: number | undefined; edgesLimit: number | undefined }} Options
 * @returns
 */
export function encodeJson(
  value: any,
  replacer?: (key: string, value: any) => any | undefined,
  space?: string | number | undefined,
  options?:
    | { depthLimit: number | undefined; edgesLimit: number | undefined }
    | undefined
): string {
  try {
    return safeStringify(value, replacer, space, options)
  } catch (error: any) {
    throw JSONEncodeError(error)
  }
}
