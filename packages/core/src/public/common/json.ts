import { Abort } from '../common/error.js'
import parseJson from 'parse-json'
import safeStringify from 'fast-safe-stringify'

/**
 * An abort error that's thrown when a JSON cannot be decoded
 * possibly due to an invalid JSON.
 */
export class DecodeJSONError extends Abort {
  constructor(error: Error) {
    if (error?.message) {
      super(`We couldn't decode the content of the JSON due to the following error:
      ${error.message}`)
    } else {
      super(`We couldn't decode the content of the JSON`)
    }
  }
}
/**
 * Parses a JSON string and returns it as a Javascript object.
 * @param content {string} The JSON content to be parsed.
 * @returns {Promise<any>} A promise that resolves with the Javascript object
 * or
 */
export function decodeJSON(content: string): any {
  try {
    return parseJson(content)
  } catch (error: any | undefined) {
    throw new DecodeJSONError(error)
  }
}

export class EncodeJSONError extends Abort {
  constructor(error: Error) {
    super(`We couldn't encode into JSON due to: ${error.message}`)
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
export function encodeJSON(
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
    throw new EncodeJSONError(error)
  }
}
