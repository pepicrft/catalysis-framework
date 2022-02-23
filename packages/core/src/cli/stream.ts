import { readableNoopStream } from 'noop-stream'

/**
 * It returns a cross-platform noop stream.
 * @returns {NodeJS.ReadableStream} The stream
 */
export function noop(): NodeJS.ReadableStream {
  return readableNoopStream()
}
